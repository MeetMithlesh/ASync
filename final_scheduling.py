import autogen
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# MongoDB config
uri = "mongodb+srv://admin:Harharbhole222@async0.itilspc.mongodb.net/?appName=Async0"
DB_NAME = "test"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[DB_NAME]

pathology = "Cardiology"  
# vriddhi will remove this pathology variable and the pathology and time will be provided by API

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# LLM config
config_list = autogen.config_list_from_json(
    env_or_file="/Users/rishabh/Desktop/Async/agents/OAI_CONFIG_LIST.json",
    filter_dict={"model": ["gpt-3.5-turbo"]}
)

llm_config = {
    "config_list": config_list,
    "timeout": 120
}

# Agents
assistant = autogen.AssistantAgent(
    name="assistant",
    system_message="You are a hospital appointment assistant. You will help check and book appointment slots." \
    "- pass the arguments like 2PM",
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
@assistant.register_for_llm(description="Check if a time slot is available with any doctor in the specified department.")
def check_availability(time: str, pathology: str):
    cursor = db.appointment.find({"name": pathology})
    available_doctors = []

    for doc in cursor:
        for doctor in doc.get("doctors", []):
            if time in doctor.get("availableSlots", []):
                available_doctors.append(f"{doctor['name']} in {doc['name']} department")

    if available_doctors:
        response = f"Slot {time} is available with: " + "; ".join(available_doctors)
        book_response = book_slot(time)
        return f"{response}\n{book_response}"
    return "Slot not available TERMINATE"


#    cursor = db.appointment.find()
#     for doc in cursor:
#         if "doctors" in doc:
#             for doctor in doc["doctors"]:
#                 if "availableSlots" in doctor and time in doctor["availableSlots"]:
#                     return f"Available in {doc['name']} with {doctor['name']} TERMINATE"
#     return "Not available TERMINATE"

# Function 2: Book slot
# @scheduler.register_for_execution()
# @assistant.register_for_llm(description="Book a specific time slot with a doctor.")
def book_slot(time: str):
    cursor = db.appointment.find()
    for doc in cursor:
        for doctor in doc.get("doctors", []):
            if time in doctor.get("availableSlots", []):
                # doctor["availableSlots"].remove(time)
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
            "message": f"check availability for 2PM in {pathology} department ",
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