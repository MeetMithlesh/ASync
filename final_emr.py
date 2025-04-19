import autogen
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from autogen import AssistantAgent, UserProxyAgent

# MongoDB config
uri = "mongodb+srv://admin:Harharbhole222@async0.itilspc.mongodb.net/?appName=Async0"
DB_NAME = "test"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[DB_NAME]
patients_collection = db["pats"]

try:
    client.admin.command('ping')
    print("Connected to MongoDB!")
except Exception as e:
    print(e)

# LLM config
config_list = [
    {
        "model": "meta-llama/llama-3-70b-instruct",
        "api_key": "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",
        "base_url": "https://openrouter.ai/api/v1"
    }
]
llm_config = {
    "config_list": config_list,
    "timeout": 120
}

# Agents
assistant = AssistantAgent(
    name="data_assistant",
    system_message="You are a medical assistant who adds or updates patient data in MongoDB.",
    is_termination_msg=lambda x: x.get("content", "").strip().endswith("TERMINATE"),
    llm_config=llm_config,
)

scheduler = UserProxyAgent(
    name="scheduler",
    is_termination_msg=lambda x: x.get("content", "").strip().endswith("TERMINATE"),
    human_input_mode="NEVER",
    max_consecutive_auto_reply=5,
    code_execution_config=False,
)

@scheduler.register_for_execution()
@assistant.register_for_llm(description="Add a new patient or update an existing patient with a new visit.")
def add_or_update_patient(_id: int, name: str, date: str, diagnosis: str, procedures: list, medications: list, lab_tests: list,status: str):
    visit = {
        "date": date,
        "diagnosis": diagnosis,
        "procedures": procedures,
        "medications": medications,
        "lab_tests": lab_tests,
        "status":status
    }

    existing = patients_collection.find_one({"_id": _id})
    if existing:
        result = patients_collection.update_one(
            {"_id": _id},
            {"$push": {"visits": visit}}
        )
        return f"Updated visit for {name}. TERMINATE" if result.modified_count else f"Failed to update visit for {name}. TERMINATE"
    else:
        new_doc = {
            "_id": _id,
            "name": name,
            "visits": [visit]
        }
        patients_collection.insert_one(new_doc)
        return f"Inserted new patient {name} with ID {_id}. TERMINATE"

@scheduler.register_for_execution()
@assistant.register_for_llm(description="Fetch patient data by name.")
def get_patient(name: str):
    patient = patients_collection.find_one({"name": name})
    if patient:
        return patient
    return f"No patient found with name {name}. TERMINATE"

# Group chat setup
group_chat = autogen.GroupChat(agents=[scheduler, assistant], messages=[], max_round=12)
manager = autogen.GroupChatManager(groupchat=group_chat, llm_config=llm_config)

# Trigger
scheduler.initiate_chats(
    [
        {
            "recipient": assistant,
            "message": "add a entry for id 1001 name harsh sharma date 25 april having diagnosis corona having procedures blood pressure medications Paracetron and Azithomax ,lab test blood test have paid bill",
            
            "clear_history": True,
            "summary_method": "last_msg"
        }

        # "message": "(_id=1003, name='rishabh', date='2025-04-18', diagnosis='jaundice', procedures=['Blood Pressure'], medications=['vitamin u'], lab_tests=['Blood Test3'])",
    ]
)