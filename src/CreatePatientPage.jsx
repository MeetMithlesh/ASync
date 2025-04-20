import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from "@mui/material";
import { Password, PersonAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import regImg from "./assets/image/image.jpg";
import axios from "./axios";

const CreatePatientPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    age: "",
    role :""
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, gender, age, phone, email, password,role } = formData;
    
    if (!fullName || !gender || !age || !phone || !email || !password || !role) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields.",
        severity: "error",
      });
      return;
    }
    axios.post('/register',formData).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });

    setTimeout(() => {
      setSnackbar({
        open: true,
        message: "Patient ID created successfully!",
        severity: "success",
      });

      if (role === "Patient") {
        setTimeout(() => {
          navigate("/login/patient");
        }, 1500);
      } else if (role === "Doctor") {
        setTimeout(() => {
          navigate("/login/doctor");
        }, 1500);
      }
      else if (role === "Receptionist") {
        setTimeout(() => {
          navigate("/login/receptionist");
        }, 1500);
      }

      setTimeout(() => {
        navigate("/emr", { state: { patientId: formData.email } });
      }, 1500);
    }, 500);
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
      <Card elevation={6} sx={{ maxWidth: 800, width: "100%", borderRadius: 3, maxHeight: 650 }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
            {/* <PersonAdd color="primary" sx={{ mr: 1 }} /> */}
            <Typography variant="h5" fontWeight="bold">
              Register
            </Typography>
          </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box><img src={regImg} alt="" style={{ width: 400, height:500}} /></Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
          >
            <TextField
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="email"
              label="Email "
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="password"
              label="Password "
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />

            <FormControl fullWidth required>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="age"
              label="Age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ min: 0 }}
            />

            <TextField
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
            />

            <FormControl fullWidth required>
              <InputLabel id="gender-label">Select Role</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={formData.role}
                label="role"
                onChange={handleChange}
              >
                <MenuItem value="Patient">Patient</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Receptionist">Receiptionist</MenuItem>
                <MenuItem value="Lab Technician">Lab Technician </MenuItem>
                <MenuItem value="Pharmacy dispenser">Pharmacy dispenser </MenuItem>
              </Select>
            </FormControl>         

            <Button variant="contained" color="success" type="submit" fullWidth sx={{ py: 1.5 }}
            //  onClick={handleSubmit}
             >
              Submit
            </Button>

            <Typography variant="body2" align="center" mt={1}>
              Already have an ID?{" "}
              <Link href="/login" underline="hover">
                Back to Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CreatePatientPage;
