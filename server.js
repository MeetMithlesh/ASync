// Import dependencies
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./token');



// Import routes
const {insertCPTData} = require('./routes/pharmacy'); 
const pharmacy = require('./routes/pharmacy');
const register = require('./routes/register');
const login = require('./routes/login');
const timeSlots = require('./routes/timeSlots');
const database = require('./routes/database');
const patientform = require('./routes/patientform');
const Bill = require('./routes/bills');
const appointment = require('./routes/appointment');
const patient = require('./routes/patient');
const doctoroute = require("./routes/doctoroute");
const billRoute = require("./routes/billRoute");
const labRoute = require("./routes/lab");
// const {PharmacyRequest} = require('./schema');
// const dropCollection = require('./db_drop');

const app = express();  
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', // Replace with your frontend URLs for production
      methods: ['GET', 'POST'],
      credentials: true,
    }
  });

app.use(express.json());
app.use(cors());
app.use(cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true
  }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", pharmacy);
app.use("/", register);
app.use("/patient", login);
app.use("/timeSlots", timeSlots);
app.use("/", database);
app.use("/appointment",patientform);
app.use("/bills", Bill);
app.use("/", appointment);
app.use("/", patient);
app.use("/api/doctor", doctoroute);
app.use("/api/bills", billRoute);
app.use("/", labRoute);

io.on('connection', (socket) => {
    console.log('🟢 A user connected:', socket.id);
    socket.on('joinRoom', (room) => {
        socket.join(room);
      });
    
      // Doctor assigns medicine
      socket.on('assignPharmacy', async (data) => {
        const newRequest = new PharmacyRequest(data);
        await newRequest.save();
    
        io.to('pharmacy').emit('pharmacyNotification', newRequest);
      });
    // Example: doctor assigns a lab test
    socket.on('assignLabTest', (data) => {
      console.log('📨 Lab Test Assigned:', data);
      io.emit('labTestNotification', data); // broadcast to all clients
    });
  
    // You can add more events:
    socket.on('prescribeMedicine', (data) => {
      io.emit('pharmacyNotification', data);
    });
  
    socket.on('disconnect', () => {
      console.log('🔴 A user disconnected:', socket.id);
    });
  });

app.get('/', (req, res) => {
    res.send('Hello World!');  
    insertPatientData();
});

app.get("/lab-tests",(req,res)  =>{
    console.log("Lab tests requested");
    req.body = {}
    const labTests = [
        {
            "name": "Blood "
          },
        {
            
        }
    ];
    res.json(labTests);
});
app.get("/recent-orders",(req,res)  =>{
    console.log("Recent orders requested");
    req.body = {}
    const recentOrders = [
        {
            "patient": "Ravi Kumar",
            "test": "Urine Test",
            "code": "BT001",
            "department": "Hematology",
            "cost": "$20",
            "duration": "2 hrs",
            "status": "In Progress"
          },    
        {
            "patient": "Ravi Kumar",
            "test": "Urine Test",
            "code": "BT001",
            "department": "Hematology",
            "cost": "$20",
            "duration": "2 hrs",
            "status": "In Progress"
        }
        
    ];
    res.json(recentOrders);
});

app.get('/get-emr', (req, res) => {
    console.log('🔍 req.body:', req.body);
    const emr = {
        "patient": {
          "name": "Rishabh Sharma",
          "age": 45,
          "gender": "Female",
          "bloodGroup": "B+",
          "contact": "+91-9876543210",
          "allergies": "Penicillin",
          "conditions": "Type 2 Diabetes, Hypertension",
          "lastVisit": "2025-04-02",
          "nextVisit": "2025-04-16",
          "id": "123456",
          "dob": "1980-01-01",
          "phone": "(123) 456-7890"
        },
        "prescriptions": [
          {
            "medicine": "Metformin 500mg",
            "dosage": "1 tablet",
            "frequency": "Twice a day",
            "duration": "30 days"
          },
          {
            "medicine": "Metformin 500mg",
            "dosage": "1 tablet",
            "frequency": "Twice a day",
            "duration": "30 days"
          },
          {
            "medicine": "Metformin 500mg",
            "dosage": "1 tablet",
            "frequency": "Twice a day",
            "duration": "30 days"
          }
        ],
        "vitals": [
          {
            "date": "2025-04-02",
            "bp": "138/92",
            "sugar": "130 mg/dL",
            "pulse": "78 bpm",
            "weight": "72 kg"
          }
        ],
        "attachments": [
          "Latest Lab Report - Apr. 2025 (PDF)",
          "Eye Scan Image (PNG)",
          "Prescription PDF (Auto-generated)"
        ]
      };
    res.json(emr);
});

app.post('/insertCPTData', (req, res) => {
    insertCPTData();
    // res.send('CPT data inserted successfully');
});

app.post('/test-body', (req, res) => {
    console.log('🔍 req.body:', req.body);
    res.send('Check your terminal for body!');
  });
  

app.post('/patient', (req, res) => {
    console.log('🔍 req.body:', req.body);
    console.log("Here is the patient ");
});

app.get('/emr', (req, res) => {
    // console.log('🔍 HEHEHEHE');
    const token = req.cookies.token || req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log('🔍 Decoded token:', decoded);
        res.json({ decoded});
    });
    
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});

