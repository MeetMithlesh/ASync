const mongoose = require("mongoose");

// Patient/User Schema
const patientSchema = new mongoose.Schema({
  patient_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  diagnosis: String,
  procedures: [String],
  medications: [String],
  lab_tests: [String],
});

const billSchema = new mongoose.Schema({
  patient_id: { type: Number, required: true },
  name: { type: String, required: true },
    visit_date: String,
    status: String,
    Procedures: [
      {
        Description: String,
        UnitCost: Number,
        TotalCost: Number,
      },
    ],
    Medications: [
      {
        Description: String,
        UnitCost: Number,
        TotalCost: Number,
      },
    ],
    LabTests: [
      {
        Description: String,
        UnitCost: Number,
        TotalCost: Number,
      },
    ],
    GrandTotal: Number,
}
);

const pateintDataSchema = new mongoose.Schema({
  patient_id: { type: String, required: true, unique: true },
  paitent_name: { type: String, required: true },
  email : { type: String, required: true },
  phone : { type: String, required: true },
  password : { type: String, required: true },
  age : { type: Number },
  gender : { type: String },

});
// Doctor Schema
const doctorSchema = new mongoose.Schema({
  doctor_id: { type: Number, required: true, unique: true },
  dr_name: String,
  specialization: String,
  department: String,
  contact: String,
  availableSlots: {
    timeSlots: {
      "09:00": { status: String},
      "10:00": { status: String },
      "11:00": { status: String },
      "12:00": { status: String },
    }
  },

});

// Lab Schema
const labSchema = new mongoose.Schema({
  patient_name : String,
  test_name: String,
  cost: String,
  duration: String,
  status: {type:String, default: 'Pending'},
});

// Pharmacy Schema
const pharmacySchema = new mongoose.Schema({
  medicine_name:String,
  price:Number,
  dosage:String,
  IPT10_code:String,
  CPD_code:String,
});

// Receptionist Schema
const receptionistSchema = new mongoose.Schema({
  receptionist_id: { type: Number, required: true, unique: true },
  name: String,
  shift: String,
  contact: String,
});

const appointmentSchema = new mongoose.Schema({
  _id: String, // Use UUID string
  name: String,
  doctors: [doctorSchema],
});

const pharmacyRequestSchema = new mongoose.Schema({
  patientId: String,
  name: String,
  prescription: String,
  doctorId: String,
  time: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }
});

// Visit schema
const visitSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  procedures: {
    type: [String],
    default: []
  },
  medications: {
    type: [String],
    default: []
  },
  lab_tests: {
    type: [String],
    default: []
  }
});

// Patient schema
const patSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  visits: [visitSchema]
},{_id: false});

const bookedAppointmentSchema = new mongoose.Schema({
  patientId: {type:String},
  department: {type:String},
  doctorId: {type:String},
  time: { type: Date, default: Date.now },
  timeSlot: {type:String},
  status: { type: String }
});

const counterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: {
    type: Number,
    default: 0,
  },
});

const Pat = mongoose.model('Pat', patSchema);
const PharmacyRequest = mongoose.model('PharmacyRequest', pharmacyRequestSchema);
const Patient = mongoose.model("Patient", patientSchema);
const Doctor = mongoose.model("Doctor", doctorSchema);
const Lab = mongoose.model("Lab", labSchema);
const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
const Receptionist = mongoose.model("Receptionist", receptionistSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const PatientData = mongoose.model('PatientData', pateintDataSchema);
const BookedAppointment = mongoose.model('BookedAppointment', bookedAppointmentSchema);
const Counter = mongoose.model('Counter', counterSchema);
const Bill = mongoose.model('Bill', billSchema);

module.exports = {
  Patient,
  Doctor,
  Lab,
  Pharmacy,
  Receptionist,
  Appointment,
  PharmacyRequest,
  Pat,
  PatientData,
  BookedAppointment,
  Counter,
  Bill,
};
