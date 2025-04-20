// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Alert from '@mui/material/Alert';
// import SearchBox from './SearchBox';
// import InfoBox from './InfoBox';
// import WeatherApp from './WeatherApp';
// import UI from "./UI";
// import UI2 from "./UI2";
import {Routes , Route, Link} from "react-router-dom"
import BillingUI from "./BillingUI";
import Appointment from "./Appointment";
import EMR from "./EMR";
// import Home from  "./Home";
import Doctor from "./Doctor";
import HomePage from "./HomePage";
import BookAppointment from "./BookAppointment";
import Pharmacy from "./Pharmacy";
import Lab from "./Lab";
import LabPage from "./LabPage";
// import LoginApi from "./LoginApi";
import Patient from "./SignInPage";
import SignInPage from "./SignInPage";
import CreatePatientPage from "./CreatePatientPage";
import PatientForm from "./PatientForm";
 import Receptionist from "./Receptionist";
//  import Profile from "./Profile";





function App() {
  let handleClick=()=>{
    console.log("button was clicked");
  };

  return (
    <>
      {/* <h1>Material UI</h1>
      <Button variant="contained" onClick={handleClick} startIcon={<DeleteIcon />}>Delete me</Button>
      <Button variant="outlined" onClick={handleClick}>Click me</Button>
      <Button variant="outlined" onClick={handleClick} color='error' size='small'>Click me</Button>
      <Button variant="contained" onClick={handleClick} disabled>Click me</Button>
      <Alert severity="error">Delete option is given!</Alert> */}
     <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/bookappointment" element={<BookAppointment/>}></Route>
      <Route path="/billing" element={<BillingUI/>}></Route>
      <Route path="/emr" element={<EMR/>}></Route>
      <Route path="/appointment" element={<Appointment/>}></Route>
      <Route path="/doctor/dashboard" element={<Doctor/>}></Route>
      <Route path="/lab" element={<LabPage/>}></Route>
      <Route path="/pharmacy" element={<Pharmacy/>}></Route>
      <Route path="/patient" element={<SignInPage/>}></Route>
      <Route path="/patientc" element={<CreatePatientPage/>}></Route>
      <Route path="/patientform" element={<PatientForm/>}></Route>
      <Route path="/receptionist" element={<Receptionist/>}></Route>
      {/* <Route path="/profile" element={<Profile/>}></Route> */}
     </Routes>



   
    </>
  );
}

export default App
