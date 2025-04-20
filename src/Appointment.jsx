import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Avatar,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import TodayIcon from "@mui/icons-material/Today";

const doctor = {
  name: "Dr. M. Sharma",
};

const appointments = [
  {
    patientName: "Rajesh Patel",
    date: "2025-04-19",
    time: "10:00 AM",
    reason: "Routine Check-up",
  },
  {
    patientName: "Anita Rao",
    date: "2025-04-19",
    time: "11:00 AM",
    reason: "Follow-up",
  },
  {
    patientName: "Ravi Mehta",
    date: "2025-04-19",
    time: "01:00 PM",
    reason: "Fever and cough",
  },
];

const AppointmentDashboard = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#14532d" }}>
      {/* Left Sidebar - Doctor Info and Appointment List */}
      <Box
        sx={{
          width: "25%",
          minWidth: 260,
          backgroundColor: "#ffffff",
          p: 3,
          borderRight: "1px solid #ccc",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} color="#10b981">
          Async Hospital
        </Typography>

        <Typography variant="h6" gutterBottom>
          <MedicalServicesIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Doctor
        </Typography>
        <ListItem
          sx={{
            borderRadius: 2,
            backgroundColor: "#e0f7fa",
            mb: 2,
          }}
        >
          <Avatar sx={{ mr: 2, bgcolor: "#10b981" }}>
            <PersonIcon />
          </Avatar>
          <ListItemText primary={doctor.name} />
        </ListItem>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          <TodayIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          Today’s Appointments
        </Typography>
        <List dense>
          {appointments.map((appt, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={appt.patientName} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Side - Appointment Details */}
      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
          Appointments for {doctor.name}
        </Typography>

        {appointments.map((appt, idx) => (
          <Paper
            key={idx}
            elevation={3}
            sx={{
              p: 3,
              borderLeft: "6px solid #34d399",
              backgroundColor: "#ecfdf5",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" color="primary">
              {appt.patientName}
            </Typography>
            <Typography variant="body2">
              <EventIcon fontSize="small" sx={{ mr: 1 }} />
              Date: {appt.date}
            </Typography>
            <Typography variant="body2">
              <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
              Time: {appt.time}
            </Typography>
            <Typography variant="body2">
              <MedicalServicesIcon fontSize="small" sx={{ mr: 1 }} />
              Reason: {appt.reason}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default AppointmentDashboard;
