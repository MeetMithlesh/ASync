import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";

const LoginPage = () => {
  const [patientId, setPatientId] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [patientType, setPatientType] = useState("");
  const [showForm, setShowForm] = useState(false);

  const bookedSlots = ["09:00", "13:00", "11:00"];
  const allSlots = ["09:00", "10:30", "13:00", "15:30", "11:00", "14:00"];

  const handlePatientTypeChange = (_, newType) => {
    if (newType) {
      setPatientType(newType);
      if (newType === "new") {
        const newId = "PID" + Math.floor(Math.random() * 1000000);
        setPatientId(newId);
        setShowForm(true);
      } else {
        setPatientId("");
        setShowForm(true);
      }
    }
  };

  const handleSubmit = () => {
    const data = {
      patientId,
      preferredSlot,
      department,
      doctor,
      patientType,
    };
    console.log(data);
    axios
      .post("http://172.16.26.0:3001/book-appointment", data)
      .then((response) => {
        console.log("Appointment booked successfully:", response.data);
        alert("Appointment booked successfully!");
        // Reset form
        setPreferredSlot("");
        setDepartment("");
        setDoctor("");
        setPatientType("");
        setPatientId("");
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(Number(hour), Number(minute));
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#1a7334",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          margin: 0,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Card elevation={4}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                sx={{ color: "#14532d" }}
              >
                Book Your Appointment
              </Typography>

              <Box textAlign="center" mt={2} mb={4}>
                <ToggleButtonGroup
                  value={patientType}
                  exclusive
                  onChange={handlePatientTypeChange}
                  aria-label="patient type"
                  sx={{
                    "& .MuiToggleButton-root": {
                      color: "#14532d",
                      borderColor: "#14532d",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#14532d",
                      color: "white",
                      borderColor: "#14532d",
                    },
                  }}
                >
                  <ToggleButton value="new">New Patient</ToggleButton>
                  <ToggleButton value="returning">Returning Patient</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {showForm && (
                <Box display="flex" flexDirection="column" gap={3}>
                  <TextField
                    label="Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    InputProps={{
                      readOnly: patientType === "new",
                    }}
                    fullWidth
                  />

                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "#14532d" }}>
                      Select Department
                    </InputLabel>
                    <Select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      label="Select Department"
                      sx={{ color: "#14532d" }}
                    >
                      <MenuItem value="cardiology">Cardiology</MenuItem>
                      <MenuItem value="neurology">Neurology</MenuItem>
                      <MenuItem value="orthopedics">Orthopedics</MenuItem>
                      <MenuItem value="pediatrics">Pediatrics</MenuItem>
                      <MenuItem value="general">General Medicine</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "#14532d" }}>
                      Select Doctor
                    </InputLabel>
                    <Select
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      label="Select Doctor"
                      sx={{ color: "#14532d" }}
                    >
                      <MenuItem value="Dr. Mehta">Dr. Mehta</MenuItem>
                      <MenuItem value="Dr. Jethalal">Dr. Jethalal</MenuItem>
                      <MenuItem value="Dr. Babita">Dr. Babita</MenuItem>
                      <MenuItem value="Dr. Haathi">Dr. Haathi</MenuItem>
                      <MenuItem value="Dr. Sodhi">Dr. Roshan Singh Sodhi</MenuItem>
                    </Select>
                  </FormControl>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#14532d" }}
                    >
                      Select a Time Slot
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={2}>
                      {allSlots.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = preferredSlot === slot;
                        return (
                          <Button
                            key={slot}
                            variant={isSelected ? "contained" : "outlined"}
                            style={{
                              color: isBooked ? "#fff" : "#14532d",
                              borderColor: "#14532d",
                              backgroundColor: isSelected ? "#14532d" : undefined,
                            }}
                            disabled={isBooked}
                            onClick={() => setPreferredSlot(slot)}
                          >
                            {formatTime(slot)}
                          </Button>
                        );
                      })}
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#14532d",
                      color: "white",
                    }}
                    disabled={
                      !patientId || !preferredSlot || !department || !doctor
                    }
                    onClick={handleSubmit}
                  >
                    Book Appointment
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
