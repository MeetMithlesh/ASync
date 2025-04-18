// src/LabPage.jsx
import React, { useState } from "react";
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
} from "@mui/material";

const LabPage = () => {
  const [patientId, setPatientId] = useState("");
  const [department, setDepartment] = useState("");
  const [patientType, setPatientType] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const labTests = [
    "Blood Test",
    "Urine Test",
    "X-Ray",
    "MRI",
    "CT Scan",
    "ECG",
    "Liver Function Test",
    "Thyroid Panel",
  ];

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

  const toggleTest = (test) => {
    setSelectedTests((prev) =>
      prev.includes(test) ? prev.filter((t) => t !== test) : [...prev, test]
    );
  };

  const handleSubmit = () => {
    if (patientId && department && selectedTests.length) {
      console.log({
        patientId,
        department,
        selectedTests,
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" align="center" color="primary" gutterBottom>
            Book Lab Tests
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
                  <MenuItem value="pathology">Pathology</MenuItem>
                  <MenuItem value="radiology">Radiology</MenuItem>
                  <MenuItem value="biochemistry">Biochemistry</MenuItem>
                </Select>
              </FormControl>

              {/* Lab Test Buttons */}
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Select Lab Tests
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={2}>
                  {labTests.map((test) => {
                    const isSelected = selectedTests.includes(test);
                    return (
                      <Button
                        key={test}
                        variant={isSelected ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => toggleTest(test)}
                      >
                        {test}
                      </Button>
                    );
                  })}
                </Box>
              </Box>

              <Button
                variant="contained"
                color="primary"
                disabled={!patientId || !department || selectedTests.length === 0}
                onClick={handleSubmit}
              >
                Book Lab Tests
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default LabPage;
