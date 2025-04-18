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
 
config_list = autogen.config_list_from_json(
    env_or_file = "/Users/rishabh/Desktop/Async/agents/OAI_CONFIG_LIST.json",
    filter_dict={
        "model": ["gpt-3.5-turbo"]
    },
)

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
    return db.pats.insert_one(bill_data).inserted_id



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

def generate_bill(_id: int, date: str):
    patient = get_patient_by_id(_id)
    if not patient:
        return {"error": "Visit not found  TERMINATE"}
    # print(patient)

    visits = patient.get("visits", [])
    visit = next((v for v in visits if v.get("date", "").lower() == date.lower()), None)
    if not visit:
        return {"error": "Visit not found for given date TERMINATE"}
    print("hereeeeeee")
    print(visit)

    prices = fetch_prices_from_db()
    name = patient.get("name", [])
    bill = {
        "name": name,
        "_id": _id,
        "visit_date": date,
        "total_amount": 0,
        "status": visit.get("status", "unpaid"),
        "Procedures": [],
        "Medications": [],
        "LabTests": [],
        "GrandTotal": 0
    }

    for section, key in [("Procedures", "procedures"), ("Medications", "medications"), ("LabTests", "lab_tests")]:
        for item in visit.get(key, []):
            cost = prices.get(item, 0)
            bill[section].append({
                "Description":   item,
                "UnitCost": cost,
                "TotalCost": cost
            })
            bill["GrandTotal"] += cost
    return f"{bill} TERMINATE"

# bill will be accessed by this variable names as bill 
    



group_chat = autogen.GroupChat(agents=[scheduler , assistant],messages = [], max_round=12)
manager = autogen.GroupChatManager(groupchat=group_chat, llm_config= llm_config)

scheduler.initiate_chats(
    [
        {
            "recipient" : assistant,
            "message" : "give me bill of 1001 of date 25  april",
            "clear_history": True,
            "summary_method":"last_msg",
        }
    ]
)   