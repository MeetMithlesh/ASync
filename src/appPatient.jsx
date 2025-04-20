import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "./axios";

const AppointmentLookupForm = () => {
  const [patientId, setPatientId] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAppointment(null);
    setError("");

    try {
      const response = await axios.get(`http://localhost:3001/appointments/${patientId}`);
      setAppointment(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#266134",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 600, width: "100%", borderRadius: 3, p: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
            Lookup Patient Appointment
          </Typography>

          <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
            <TextField
              label="Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="success"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Get Appointment"}
            </Button>
          </form>

          {error && <Alert severity="error">{error}</Alert>}

          {appointment && (
            <>
              <Typography variant="body1" gutterBottom>
                <strong>Patient ID:</strong> {appointment.patientId}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Doctor:</strong> {appointment.doctorId}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Department:</strong> {appointment.department}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Time:</strong> {appointment.timeSlot}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Status:</strong> {appointment.status}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AppointmentLookupForm;
