import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  CircularProgress,
} from "@mui/material";

const LoginPage = () => {
  const [patientId, setPatientId] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("");
  const [department, setDepartment] = useState("");
  const [patientType, setPatientType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allSlots, setAllSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const handlePatientTypeChange = (_, newType) => {
    if (newType) {
      setPatientType(newType);
      if (newType === "new") {
        const newId = "PID" + Math.floor(Math.random() * 1000000);
        setPatientId(newId);
        setShowForm(true);
      } else {
        setShowForm(true);
        setPatientId("");
      }
    }
  };

  const handleSubmit = () => {
    if (patientId && preferredSlot && department) {
      console.log({
        patientId,
        preferredSlot,
        department,
      });
      alert("Appointment booked successfully!");
    }
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(Number(hour), Number(minute));
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Simulate fetching slots from API
  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        // Simulated API call (replace with real one)
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              allSlots: ["09:00", "10:30", "13:00", "15:30", "11:00", "14:00"],
              bookedSlots: ["09:00", "13:00", "11:00"],
            });
          }, 1000)
        );

        setAllSlots(response.allSlots);
        setBookedSlots(response.bookedSlots);
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    };

    if (showForm) {
      fetchSlots();
    }
  }, [showForm]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center" color="primary">
            Book Your Appointment
          </Typography>

          <Box textAlign="center" mt={2} mb={4}>
            <ToggleButtonGroup
              value={patientType}
              exclusive
              onChange={handlePatientTypeChange}
              aria-label="patient type"
              color="primary"
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
                <InputLabel>Select Department</InputLabel>
                <Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  label="Select Department"
                >
                  <MenuItem value="cardiology">Cardiology</MenuItem>
                  <MenuItem value="neurology">Neurology</MenuItem>
                  <MenuItem value="orthopedics">Orthopedics</MenuItem>
                  <MenuItem value="pediatrics">Pediatrics</MenuItem>
                  <MenuItem value="general">General Medicine</MenuItem>
                </Select>
              </FormControl>

              {/* Time Slot Buttons */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Select a Time Slot
                </Typography>

                {loading ? (
                  <Box display="flex" justifyContent="center" mt={2}>
                    <CircularProgress size={24} />
                  </Box>
                ) : (
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {allSlots.map((slot) => {
                      const isBooked = bookedSlots.includes(slot);
                      const isSelected = preferredSlot === slot;
                      return (
                        <Button
                          key={slot}
                          variant={isSelected ? "contained" : "outlined"}
                          color={isBooked ? "secondary" : "primary"}
                          disabled={isBooked}
                          onClick={() => setPreferredSlot(slot)}
                        >
                          {formatTime(slot)}
                        </Button>
                      );
                    })}
                  </Box>
                )}
              </Box>

              <Button
                variant="contained"
                color="primary"
                disabled={!patientId || !preferredSlot || !department}
                onClick={handleSubmit}
              >
                Book Appointment
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
