import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";

import axios from "axios";
const LabTestForm = ({ onTestAssigned }) => {
  const [formData, setFormData] = useState({
    patient_name: "",
    test_name: "",
    department: "",
    cost: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/add-lab-test", formData);
      console.log(response);

      if (response.status === 201) {
        const result = await response.json();
        onTestAssigned(result);
        setFormData({
          patient_name: "",
          test_name: "",
          department: "",
          cost: "",
          duration: "",
          
        });
      } else {
        console.error("❌ Failed to assign lab test");
      }
    } catch (err) {
      console.error("⚠️ Error assigning lab test:", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Assign Lab Test
      </Typography>

      <Box sx={{ mt: 2 }} >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "row" }}>
          {Object.keys(formData).map((field) => (
            <Grid container item spacing={1} alignItems="center" key={field}>
              <Grid item xs={4}>
                {/* <Typography sx={{ textAlign: "right", textTransform: "capitalize" }}>
                  {field}
                </Typography> */}
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  size="small"
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
            </Box>

        <Box sx={{ display: "flex", flexDirection: "row",justifyContent: "flex-end", mt: 3, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() =>
              setFormData({
                patient: "",
                test: "",
                department: "",
                cost: "",
                duration: "",
                status: "",
              })
            }
          >
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#16a34a", color: "white" }}
            onClick={handleSubmit}
          >
            Assign
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default LabTestForm;
