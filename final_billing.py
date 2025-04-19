import autogen 
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
import sys
import os
from autogen import AssistantAgent, UserProxyAgent
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, "..", ".."))
if project_root not in sys.path:
    sys.path.insert(0, project_root)


uri = "mongodb+srv://admin:Harharbhole222@async0.itilspc.mongodb.net/?appName=Async0"
DB_NAME = "test"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[DB_NAME]

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
 
config_list = [
    {
        "model": "meta-llama/llama-3-70b-instruct",
        "api_key": "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",
        "base_url": "https://openrouter.ai/api/v1"
    }
]

llm_config = {
    "config_list" : config_list,
    "timeout" : 120
}


assistant = autogen.AssistantAgent(
    name="assistant",
    system_message="you are a biling agent helping in generating bill by function generate_bill",
    is_termination_msg = lambda x: x.get("content","") and x.get("content","").strip().endswith("TERMINATE"),
    llm_config=llm_config,
)

scheduler = autogen.UserProxyAgent(
    name="scheduler",
    is_termination_msg = lambda x: x.get("content","") and x.get("content","").strip().endswith("TERMINATE"),
    human_input_mode="NEVER",
    max_consecutive_auto_reply=5,
    code_execution_config=False
)


def get_patient_by_id(patient_id):
    return db.pats.find_one({"_id": patient_id})

def store_bill(bill_data):
    return db.bills.insert_one(bill_data).inserted_id


@scheduler.register_for_execution()
@assistant.register_for_llm(description = "you will fetch price of medicies which are present in mongoDB")

def fetch_prices_from_db():
    pharmacy_collection = db["pharmacies"]
    price_dict = {}

    try:
        cursor = pharmacy_collection.find({})
        for doc in cursor:
            name = doc.get("Medicine")
            price = doc.get("Price")
            if name and price:
                price_dict[name] = price
    except Exception as e:
        print("❌ Error fetching prices from DB:", e)

    return price_dict







@scheduler.register_for_execution()
@assistant.register_for_llm(description = "you will generate bill by function generate_bill")


def add_or_update_bill(_id: int, date: str):
    patient = get_patient_by_id(_id)
    if not patient:
        return {"error": "Patient not found TERMINATE"}

    visits = patient.get("visits", [])
    visit = next((v for v in visits if v.get("date", "").lower() == date.lower()), None)
    if not visit:
        return {"error": "Visit not found for given date TERMINATE"}

    prices = fetch_prices_from_db()
    name = patient.get("name", [])
    new_bill_rec = {
        "visit_date": date,
        "status": visit.get("status", "unpaid"),
        "Procedures": [],
        "Medications": [],
        "LabTests": [],
        "GrandTotal": 0
    }

    for section, key in [("Procedures", "procedures"), ("Medications", "medications"), ("LabTests", "lab_tests")]:
        for item in visit.get(key, []):
            cost = prices.get(item, 0)
            new_bill_rec[section].append({
                "Description": item,
                "UnitCost": cost,
                "TotalCost": cost
            })
            new_bill_rec["GrandTotal"] += cost

    existing_bill = db.bills.find_one({"_id": _id})
    if existing_bill:
        db.bills.update_one(
            {"_id": _id},
            {"$push": {"bill_rec": new_bill_rec}}
        )
        return f"Bill updated for patient {_id} TERMINATE"
    else:
        new_bill = {
            "_id": _id,
            "name": name,
            "bill_rec": [new_bill_rec]
        }
        db.bills.insert_one(new_bill)
        return f"New bill inserted for patient {_id} TERMINATE"

# bill will be accessed by this variable names as bill 
    



group_chat = autogen.GroupChat(agents=[scheduler , assistant],messages = [], max_round=12)
manager = autogen.GroupChatManager(groupchat=group_chat, llm_config= llm_config)

scheduler.initiate_chats(
    [
        {
            "recipient" : assistant,
            "message" : "give me bill of 1012 of date 20 april",
            "clear_history": True,
            "summary_method":"last_msg",
        }
    ]
) 