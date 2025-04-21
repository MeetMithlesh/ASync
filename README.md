# ASync by Ciphernauts
This repository uses multiple branches to manage different features and modules of the Async project.

Links to all the repository branches 
1. <a href="https://github.com/MeetMithlesh/ASync/tree/backend">Backend Branch<a/>
1. <a href="https://github.com/MeetMithlesh/ASync/tree/frontend">Frontend Branch<a/>
1. <a href="https://github.com/MeetMithlesh/ASync/tree/fastapi">FastAPI Branch<a/>
1. <a href="https://github.com/MeetMithlesh/ASync/tree/agents">Agents Branch<a/>
DOCUMENTATION
KRIYETA 4.0
Healthcare Innovation
CIPHERNAUTS | 2025
<h3>App Demo</h3>
<p>This is a multi-agent AI system built using Microsoft AutoGen, where 3 autonomous agents collaborate to automate hospital workflows. The solution is composed of the following core components:
🧠 Agents Involved:
1.	AssistantAgent – Performs main coordination and logic handling for hospital tasks
2.	UserProxyAgent – Interfaces between users and the system; interprets requests
3.	Custom MongoAgent – Connects and interacts with a MongoDB database to store and retrieve patient/EMR/billing data</p>
<h3>Home Page</h3>


https://github.com/user-attachments/assets/78f22ecc-2992-4685-b612-0f3e7c2ec9ca

<h3>Billing Page</h3>
https://github.com/user-attachments/assets/e450f531-dcc1-46be-ad89-b0bc2633256e
<h3>EMR page</h3>
![Screenshot 2025-04-19 184855](https://github.com/user-attachments/assets/6e7873a7-f5be-4b57-bc5e-2c08366c67fe)

<h3>Appointments</h3>
![Screenshot 2025-04-21 190838](https://github.com/user-attachments/assets/c1437727-df02-454e-88d7-8576201b0f2d)

<h3>Lab Test</h3>
![Screenshot 2025-04-21 191028](https://github.com/user-attachments/assets/06e6ec46-e097-4e53-8faf-4a4a3593df27)

<h3>Pharmacy</h3>
![Screenshot 2025-04-21 191045](https://github.com/user-attachments/assets/d05a2d0b-dcbf-4d5f-a83a-d87f42d2356b)
PROBLEM STATEMENT
Domain : Healthcare Innovation: Agentic AI Framework for Hospital Workflow Automation
Problem Statement: 
Design a multi-agent AI system using Microsoft AutoGen to simulate an Agentic AI workforce for hospital workflows such as appointment scheduling, EMR data retrieval, and billing validation. 
•  📅 Appointment Scheduling
•  🏥 EMR (Electronic Medical Record) Retrieval
•  💳 Billing Information Validation
Agents should be autonomous, communicate with each other, and collectively complete a task.
Expected Outcome: End-to-end working demo with 2–3 agents automating tasks like patient appointment + EMR fetch + billing info.

🔍 What real-world problem are you solving?
Hospitals and clinics rely heavily on manual workflows for managing patient appointments, electronic medical records (EMR), and billing. These processes are often fragmented, error-prone, and inefficient—requiring significant administrative effort and delaying patient care.

❗ Why is this problem important?
•	Healthcare is time-sensitive. Delays in scheduling, data retrieval, or billing can directly impact patient outcomes.
•	Administrative overhead in hospitals reduces efficiency and drains human resources that could be better utilized in clinical roles.
•	The current systems lack the interconnectivity and autonomy needed to streamline routine yet critical tasks.
•	Agentic AI systems present a scalable, intelligent solution to tackle these inefficiencies.

💡 Proposed Solution
We propose a multi-agent AI system built using Microsoft AutoGen, where 3 autonomous agents collaborate to automate hospital workflows. The solution is composed of the following core components:
🧠 Agents Involved:
1.	AssistantAgent – Performs main coordination and logic handling for hospital tasks
2.	UserProxyAgent – Interfaces between users and the system; interprets requests
3.	Custom MongoAgent – Connects and interacts with a MongoDB database to store and retrieve patient/EMR/billing data
⚙️ Tech Stack:
•	AutoGen + OpenRouter: To orchestrate multi-agent LLM interaction using OpenRouter as the LLM gateway
•	LLM Integration: LLMs are used to reason, interpret tasks, and respond intelligently
•	FastAPI: Handles backend API integration between agents and services
•	MongoDB: NoSQL database to persist patient, appointment, billing, and EMR data
•	ReactJS: Frontend interface to interact with the system
•	Node.js: Used alongside FastAPI for backend logic and modularity (e.g., microservices handling)


________________________________________
🚀 How does your solution solve the problem better or differently?
1.	Autonomous AI Workforce:
Instead of traditional rule-based automation, we use LLM-powered agents capable of intelligent decision-making, reasoning, and conversation.
2.	End-to-End Automation:
The entire workflow — from appointment booking to billing — is seamlessly handled by the agents without human intervention.
3.	Modular and Scalable Architecture:
Each agent is independently deployable and replaceable, supporting future use-case expansion (e.g., lab test booking, insurance validation).
4.	Natural Language Interaction:
Patients and admins can interact using natural language via the frontend, powered by the LLM backend.
5.	Live Database Integration:
Real-time read/write operations from MongoDB ensure data consistency, enabling accurate billing and EMR retrieval.
6.	OpenRouter-powered LLM flexibility:
Our solution can easily swap LLMs (e.g., GPT-4, Claude, etc.) using OpenRouter, allowing flexibility in cost-performance trade-offs.
🔑 Key Features
✅ 1. Auto-Fetch Patient Data
Automatically retrieve Electronic Medical Records (EMRs) using a patient ID via a FastAPI endpoint       connected to a MongoDB backend.
✅ 2. Bill Generation with Cost Breakdown
Generates a comprehensive bill from structured treatment data, including per-service costs and totals.
✅ 3. MongoDB + JSON Support
Full support for JSON-structured EMRs and patient documents using Json for serialization.
✅ 4. Swagger UI Integration for APIs
FastAPI automatically generates interactive API documentation.


🧠 AutoGen Agent Integration
Each feature is designed to be agent-compatible. AutoGen agents can call these endpoints as tools in their workflow definition.
Next Steps –
•	Add secure authentication for all endpoints
•	Use AutoGen agents to orchestrate multi-step workflows

________________________________________
🧭 System Flow (Step-by-Step Architecture)
🧑‍⚕️ Step 1: User Interaction
Users include doctors, receptionists, or patients, who interact with the React.js frontend.
•	They perform actions like:
o	Booking appointments
o	Viewing EMR summaries
o	Requesting billing details
________________________________________
🌐 Step 2: Frontend React.js
The UI handles:
•	User inputs and dashboard controls
•	Displays:
o	✅ Appointment status
o	📄 EMR summaries
o	💸 Billing breakdown
o	🤖 AutoGen Agent logs + interaction trails
________________________________________
🧠 Step 3: Backend Orchestration (Node.js)
•	Receives requests from frontend
•	Validates and structures payload
•	Routes requests to appropriate FastAPI microservices
o	/appointment/schedule
o	/emr/fetch
o	/billing/generate
________________________________________
⚙️ Step 4: Agentic FastAPI Microservices
FastAPI provides lightweight and fast endpoints for:
•	Receiving orchestrated requests
•	Processing structured medical workflows
•	Interfacing directly with MongoDB
Each FastAPI service is mapped to one of the following agents:
1.	📅 Appointment Agent
2.	🏥 EMR Agent
3.	💳 Billing Agent
________________________________________
🤖 Step 5: Microsoft AutoGen Agents
Each agent is designed using AutoGen GroupChat APIs:
•	Appointment Agent: Books slots, validates patient availability
•	EMR Agent: Fetches patient records from MongoDB and summarizes it
•	Billing Agent: Generates bill breakdown from treatment info
These agents:
•	Work independently and collaboratively
•	Execute logic via tool calls (e.g., hit FastAPI endpoints)
•	Return decisions and summaries in natural language and JSON
________________________________________
🧩 Step 6: Agent-to-Agent Communication
AutoGen GroupChat API handles:
•	Sequential or parallel task execution between agents
•	Real-time collaboration on complex workflows
•	Message-passing and tool execution management
Example: Billing Agent waits for EMR Agent output → Calculates costs → Responds back to frontend.
________________________________________
💾 Step 7: MongoDB (Database Layer)
Collections used:
•	appointments: Schedule & availability
•	emrs: Medical histories and test reports
•	billings: Cost breakdown, insurance summaries
MongoDB stores and serves structured JSON data directly to FastAPI agents or for logging purposes.
________________________________________
🔁 Step 8: Data Exchange in JSON
All communications use clean JSON:
•	API input/output
•	Agent memory & message content
•	Frontend bindings and logs
Ensures smooth parsing between agents and external services.
________________________________________
🧑‍💻 Developer Tools Used
•	Postman: API testing
•	VS Code: IDE for development
•	GitHub: Source control and collaboration
________________________________________
📍 Visual Summary 
1.	👩‍⚕️ User interacts via React UI
2.	🌐 Request goes to Node.js backend
3.	⚙️ Backend routes request to FastAPI services
4.	🤖 FastAPI calls AutoGen Agents
5.	🧠 Agents fetch/update MongoDB and generate output
6.	🔄 Output flows back via Node.js to React UI
7.	📈 UI displays real-time logs, decisions & summaries
✅ Conclusion
The AI-powered hospital workflow automation system brings together the best of modern technologies—Microsoft AutoGen, FastAPI microservices, MongoDB, and a responsive React.js frontend—to transform how hospitals manage patient data, appointments, EMRs, and billing.
Through the use of intelligent agents that communicate in real time, the system enables seamless task execution with minimal manual intervention, ensuring faster operations, greater accuracy, and improved patient experience. With scalable architecture and modular deployment using Docker, this solution is built for reliability, adaptability, and future integration with more advanced hospital workflows or AI capabilities.
This documentation serves as a blueprint for developers, hospital IT teams, and stakeholders to understand, implement, and evolve the system with confidence.
⚡ Empowering healthcare, one automated decision at a time.
 
