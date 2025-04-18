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
import { PersonAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CreatePatientPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    phone: "",
    aadhaar: "",
    address: "",
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

    const { fullName, gender, age, phone, aadhaar, address } = formData;

    if (!fullName || !gender || !age || !phone || !aadhaar || !address) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields.",
        severity: "error",
      });
      return;
    }

    if (aadhaar.length !== 12 || isNaN(aadhaar)) {
      setSnackbar({
        open: true,
        message: "Aadhaar number must be a 12-digit number.",
        severity: "error",
      });
      return;
    }

    setTimeout(() => {
      setSnackbar({
        open: true,
        message: "Patient ID created successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/appointments");
      }, 1500);
    }, 500);
  };

  return (
    <Box
      sx={{
        bgcolor: "#f0f4f8",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card elevation={6} sx={{ maxWidth: 600, width: "100%", borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <PersonAdd color="primary" sx={{ mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">
              Create Patient ID
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              name="fullName"
              label="Full Name"
              value={formData.fullName}
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

            <TextField
              name="password"
              label="Password"
              value={formData.aadhaar}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 12 }}
            />

          

            <Button variant="contained" color="success" type="submit" fullWidth sx={{ py: 1.5 }}>
              Submit
            </Button>

            <Typography variant="body2" align="center" mt={1}>
              Already have an ID?{" "}
              <Link href="/signin" underline="hover">
                Back to Sign In
              </Link>
            </Typography>
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
