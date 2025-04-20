"""from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from pymongo import MongoClient
from pymongo.server_api import ServerApi

# Setup MongoDB
uri = "mongodb+srv://admin:Harharbhole222@async0.itilspc.mongodb.net/?appName=Async0"
DB_NAME = "test"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[DB_NAME]

# FastAPI App
app = FastAPI()

# ------------------ Models ------------------
class Visit(BaseModel):
    date: str
    diagnosis: str
    procedures: List[str]
    medications: List[str]
    lab_tests: List[str]
    status: str

class Patient(BaseModel):
    _id: int = Field(..., alias="_id")
    name: str
    visit: Visit

    class Config:
        allow_population_by_field_name = True
class BillingRequest(BaseModel):
    _id: int
    date: str

class AppointmentRequest(BaseModel):
    time: str
    pathology: str
    doctor_name: str

# ------------------ EMR Endpoints ------------------
@app.post("/emr/add_or_update")
def add_or_update_emr(patient: Patient):
    try:
        pats = db.pats
        visit_dict = patient.visit.dict()
        existing = pats.find_one({"_id": patient.id})
        if existing:
            pats.update_one({"_id": patient.id}, {"$push": {"visits": visit_dict}})
            return {"message": f"Visit added for patient {patient.name}"}
        else:
            new_doc = {"_id": patient.id, "name": patient.name, "visits": [visit_dict]}
            pats.insert_one(new_doc)
            return {"message": f"New patient {patient.name} added with first visit"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/emr/{name}")
def get_patient_emr(name: str):
    patient = db.pats.find_one({"name": name})
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

# ------------------ Appointment Endpoints ------------------
@app.post("/appointments/book")
def book_appointment(req: AppointmentRequest):
    try:
        doc = db.appointment.find_one({"name": req.pathology})
        if not doc:
            return {"message": "Department not found"}
        for doctor in doc.get("doctors", []):
            if doctor.get("name", "").lower() == req.doctor_name.lower() and req.time in doctor.get("availableSlots", []):
                # Remove the booked time
                # doctor["availableSlots"].remove(time)
                db.appointment.update_one({"_id": doc["_id"]}, {"$set": {"doctors": doc["doctors"]}})
                return {"message": f"Booked {req.time} with {doctor['name']} in {doc['name']} department"}
        return {"message": "Slot not available"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ------------------ Billing Endpoints ------------------
@app.post("/billing/generate")
def generate_billing(req: BillingRequest):
    try:
        patient = db.pats.find_one({"_id": req.id})
        if not patient:
            return {"error": "Patient not found"}

        visit = next((v for v in patient.get("visits", []) if v.get("date", "").lower() == req.date.lower()), None)
        if not visit:
            return {"error": "Visit not found for given date"}

        prices = {}
        for doc in db.pharmacies.find():
            prices[doc.get("Medicine")] = doc.get("Price")

        counter = db.counters.find_one_and_update(
          {"_id": "billId"},
          {"$inc": {"sequence_value": 1}},
          upsert=True,
          return_document=True
        )
        sequence_number = str(counter["sequence_value"]).zfill(4)
        bill_id = f"{req.id}{sequence_number}"

        new_bill = {
            "bill_id": bill_id,
            "visit_date": req.date,
            "status": visit.get("status", "unpaid"),
            "Procedures": [],
            "Medications": [],
            "LabTests": [],
            "GrandTotal": 0
        }

        for section, key in [("Procedures", "procedures"), ("Medications", "medications"), ("LabTests", "lab_tests")]:
            for item in visit.get(key, []):
                cost = prices.get(item, 0)
                new_bill[section].append({"Description": item, "UnitCost": cost, "TotalCost": cost})
                new_bill["GrandTotal"] += cost

        existing = db.bills.find_one({"_id": req.id})
        if existing:
            db.bills.update_one({"_id": req.id}, {"$push": {"bill_rec": new_bill}})
            return {"message": f"Bill updated for patient {req.id} with Bill ID {bill_id}"}
        else:
            db.bills.insert_one({"_id": req.id, "name": patient.get("name"), "bill_rec": [new_bill]})
            return {"message": f"New bill inserted for patient {req._id} with Bill ID {bill_id}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from pymongo import MongoClient
from pymongo.server_api import ServerApi

# Setup MongoDB
uri = "mongodb+srv://admin:Harharbhole222@async0.itilspc.mongodb.net/?appName=Async0"
DB_NAME = "test"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[DB_NAME]

# FastAPI App
app = FastAPI()

# ------------------ Models ------------------
class Visit(BaseModel):
    #id: int
    date: str
    diagnosis: str
    procedures: List[str]
    medications: List[str]
    lab_tests: List[str]
    status: str

class Patient(BaseModel):
    id: int #changed_id to id
    name: str
    visit: Visit

class BillingRequest(BaseModel):
    id: int
    date: str

class AppointmentRequest(BaseModel):
    time: str
    pathology: str
    doctor_name: str
#sequenceee

def get_next_sequence(name: str) -> int:
    #print("heyyyyyyyy")
    counter = db.counters.find_one_and_update(
        {"id": name},
        {"$inc": {"sequence_value": 2000}},
        upsert=True,
        return_document=True
    )
    return counter["sequence_value"]
#sequenceee
# ------------------ EMR Endpoints ------------------
"""@app.post("/emr/add_or_update")
def add_or_update_emr(patient: Patient):
    
    try:
        pats = db.pats
        visit_dict = patient.visit.dict()
        existing = pats.find_one({"_id": patient._id})
        if existing:
            pats.update_one({"_id": patient._id}, {"$push": {"visits": visit_dict}})
            return {"message": f"Visit added for patient {patient.name}"}
        else:
            new_doc = {"_id": patient._id, "name": patient.name, "visits": [visit_dict]}
            pats.insert_one(new_doc)
            return {"message": f"New patient {patient.name} added with first visit"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
"""
@app.post("/emr/add_or_update")
def add_or_update_emr(patient: Patient):
    try:
        pats = db.pats
        visit_dict = patient.visit.dict()

        # Always assign a new visit ID
      #  visit_dict["id"] = get_next_sequence("visitId")

        existing = pats.find_one({"_id": patient.id})
        if existing:
            pats.update_one({"_id": patient.id}, {"$push": {"visits": visit_dict}})
            return {"message": f"Visit added for patient {patient.name}"}
        else:
            # If patient is new, assign a patient ID
            patient_id = get_next_sequence("patientId")
            new_doc = {"_id": patient_id, "name": patient.name, "visits": [visit_dict]}
            pats.insert_one(new_doc)
            return {"message": f"New patient {patient.name} added with ID {patient_id} and first visit"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/emr/{patient_id}")
def get_patient_emr(patient_id: str):
    patient = db.pats.find_one({"_id": int(patient_id)})# CHANGED NAME TO ID
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

# ------------------ Appointment Endpoints ------------------
@app.post("/appointments/book")
def book_appointment(req: AppointmentRequest):
    try:
        doc = db.appointment.find_one({"name": req.pathology})
        if not doc:
            return {"message": "Department not found"}
        for doctor in doc.get("doctors", []):
            if doctor.get("name", "").lower() == req.doctor_name.lower() and req.time in doctor.get("availableSlots", []):
                #doctor["availableSlots"].remove(req.time)
                db.appointment.update_one({"_id": doc["_id"]}, {"$set": {"doctors": doc["doctors"]}})
                return {"message": f"Booked {req.time} with {doctor['name']} in {doc['name']} department"}
        return {"message": "Slot not available"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ------------------ Billing Endpoints ------------------

@app.post("/billing/generate")
def generate_billing(req: BillingRequest):
    try:
        patient = db.pats.find_one({"_id": req.id})
        if not patient:
            return {"error": "Patient not found"}

        visit = next((v for v in patient.get("visits", []) if v.get("date", "").lower() == req.date.lower()), None)
        if not visit:
            return {"error": "Visit not found for given date"}
        print("here1")
        prices = {}
        for doc in db.pharmacies.find():
            prices[doc.get("Medicine")] = doc.get("Price")

        # counter = db.counters.find_one_and_update(
        #   {"_id": "billId"},
        #   {"$inc": {"sequence_value": 1}},
        #   upsert=True,
        #   return_document=True
        # )
        # sequence_number = str(counter["sequence_value"]).zfill(4)
        # bill_id = f"{req._id}{sequence_number}"
        print("here2")
        # counter = db.counters.find_one_and_update(
        # {"_id": "billId"},
        # {"$inc": {"sequence_value": 1}},
        # upsert=True,
        # return_document=True
        #         )
        # number = str(counter["sequence_value"]).zfill(4)
        # bill_id = f"{BillingRequest.id}{number}"
        # number = str(counter["sequence_value"]).zfill(4)
        # return f"{pat_id}{number}"
        print("here3")
        new_bill = {
            # "bill_id": bill_id,
            "visit_date": req.date,
            "status": visit.get("status", "unpaid"),
            "Procedures": [],
            "Medications": [],
            "LabTests": [],
            "GrandTotal": 0
        }
        print("here4")
        for section, key in [("Procedures", "procedures"), ("Medications", "medications"), ("LabTests", "lab_tests")]:
            for item in visit.get(key, []):
                cost = prices.get(item, 0)
                new_bill[section].append({"Description": item, "UnitCost": cost, "TotalCost": cost})
                new_bill["GrandTotal"] += cost
        print("here5")
        existing = db.bills.find_one({"_id": req.id})
        print("here6")
        if existing:
            db.bills.update_one({"_id": req.id}, {"$push": {"bill_rec": new_bill}})
            return {"message": f"Bill updated for patient {req.id} "}
        else:
            db.bills.insert_one({"_id": req.id, "name": patient.get("name"), "bill_rec": [new_bill]})
            return {"message": f"New bill inserted for patient {req.id} "}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))  


#from fastapi import FastAPI, HTTPException
#from pymongo import MongoClient

#app = FastAPI()

# Use your MongoDB Atlas URI here
uri = "mongodb+srv://admin:Harharbhole222@async0.itilspc.mongodb.net/?appName=Async0"

# Connect to MongoDB Atlas
import logging

logger = logging.getLogger("uvicorn")
client = MongoClient(uri)
#logger.info("db apppeared")
#print("DbDBBDBDBD")
"""
# Select the database and collections
db = client["test"]
collection = db["pats"]
bill_collection = db["bills"]
#logger"""

# logger
# @app.get("/billing/{id}/{date}")
# def get_billing_info(billreq : BillingRequest):
#     #logger.info("This will definitely show up")
#     #print("route hit ho gaya hai")
#     #print(_id)
#     #print("hii")
#     try:
#         logger.info("This will definitely show up")
#         # Check if patient exists
#         print("hhhhhhhhh")
#         patient = collection.find_one({"id": int(billreq.id)})
#         #print(patient)
#         #print(type(_id))
#         if not patient:
#             raise HTTPException(status_code=404, detail="Patient not founddd")

#         # Fetch billing info
#         billing_record = bill_collection.find_one({"id": int(billreq.id)})
#         #print(billing_record)
#         #if not billing_record:
#          #   raise HTTPException(status_code=404, detail="Billing record not found")

#         #return billing_record
    

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# db = client["test"]
# collection = db["pats"]
# bill_collection = db["bills"]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Simulated billing agent function
#def billing_agent(id: int, date: str):
    # Example query logic; update as needed
    #return bill_collection.find_one({"id": id, "date": date})

# @app.get("/billing/{patient_id}/{date}")
# def get_billing_by_date(patient_id: int, date: str):
#     add_or_update_bill(patient_id , date)
#     try:
#         bill = db.bills.find_one({"_id": patient_id})
#         if not bill:
#             raise HTTPException(status_code=404, detail="No billing record found for this patient")

#         # Filter bill_rec by matching date
#         for record in bill.get("bill_rec", []):
#             if record.get("visit_date", "").lower() == date.lower():
#                 return record

#         raise HTTPException(status_code=404, detail="No billing record found for this date")

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
