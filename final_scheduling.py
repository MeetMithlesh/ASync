import autogen
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# MongoDB config
uri = "mongodb+srv://admin:Harharbhole222@async0.itilspc.mongodb.net/?appName=Async0"
DB_NAME = "test"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[DB_NAME]

pathology = "Neurology"  
doctor = "Dr. pillai"
# vriddhi will remove this pathology and doctor variable and the pathology doctor and time will be provided by API

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
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
assistant = autogen.AssistantAgent(
    name="assistant",
    system_message="You are a hospital appointment assistant. You will help check and book appointment slots." \
    "- always pass the time in argument like 2PM",
    is_termination_msg=lambda x: x.get("content", "").strip().endswith("TERMINATE"),
    llm_config=llm_config,
)



scheduler = autogen.UserProxyAgent(
    name="scheduler",
    is_termination_msg=lambda x: x.get("content", "").strip().endswith("TERMINATE"),
    human_input_mode="NEVER",
    max_consecutive_auto_reply=5,
    code_execution_config=False,
)
@scheduler.register_for_execution()
# Function 1: Check availability
@assistant.register_for_llm(description="Check if a time slot is available with a specific doctor in the given department.")
def check_availability(time: str, pathology: str, doctor_name: str):
    cursor = db.appointment.find({"name": pathology})
    for doc in cursor:
        for doctor in doc.get("doctors", []):
            print("hereee")
            print(time in doctor.get("availableSlots", []))
            if doctor.get("name", "").lower() == doctor_name.lower() and time in doctor.get("availableSlots", []):
                response = f"Slot {time} is available with {doctor_name} in {doc['name']} department."
                book_response = book_slot(time, doctor_name)
                return f"{response}\n{book_response}"
    return "Slot not available TERMINATE"


#    cursor = db.appointment.find()
#     for doc in cursor:
#         if "doctors" in doc:
#             for doctor in doc["doctors"]:
#                 if "availableSlots" in doctor and time in doctor["availableSlots"]:
#                     return f"Available in {doc['name']} with {doctor['name']} TERMINATE"
#     return "Not available TERMINATE"

def book_slot(time: str, doctor_name: str):
    cursor = db.appointment.find()
    for doc in cursor:
        for doctor in doc.get("doctors", []):
            if doctor.get("name", "").lower() == doctor_name.lower() and time in doctor.get("availableSlots", []):
                db.appointment.update_one(
                    {"_id": doc["_id"]},
                    {"$set": {"doctors": doc["doctors"]}}
                )
                return f"Booked {time} with {doctor['name']} in {doc['name']} department. TERMINATE"
    return "Sorry, the slot is not available TERMINATE"

# Group Chat Setup
group_chat = autogen.GroupChat(agents=[scheduler, assistant], messages=[], max_round=12)
manager = autogen.GroupChatManager(groupchat=group_chat, llm_config=llm_config)

# Trigger the flow
scheduler.initiate_chats(
    [
        {
            "recipient": assistant,
            "message": f"check availability of doctor {doctor} at 5PM in {pathology} department with Dr. mishra",
            "clear_history": True,
            "summary_method": "last_msg",
        }
        # {
        #     "recipient": assistant,
        #     "message": "book slot for 1PM",
        #     "clear_history": False,
        #     "summary_method": "last_msg",
        # }
    ]
)