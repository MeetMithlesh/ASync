import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
  IconButton,
  Paper,
  Alert,
} from '@mui/material';
import { MedicalServices, AddCircle, RemoveCircle } from '@mui/icons-material';

const PatientVisitForm = () => {
  const patientList = [
    { patientId: 'P001', name: 'Anita Sharma' },
    { patientId: 'P002', name: 'Rahul Verma' },
    { patientId: 'P003', name: 'Sneha Patel' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentPatient = patientList[currentIndex];

  const [formData, setFormData] = useState({
    diagnosis: '',
    symptoms: '',
    medicines: [{ name: '', dosage: '', duration: '' }],
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...formData.medicines];
    updated[index][field] = value;
    setFormData({ ...formData, medicines: updated });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: '', dosage: '', duration: '' }],
    });
  };

  const removeMedicine = (index) => {
    const updated = formData.medicines.filter((_, i) => i !== index);
    setFormData({ ...formData, medicines: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { diagnosis, symptoms } = formData;

    if (!diagnosis || !symptoms) {
      setSnackbar({ open: true, message: 'Please fill all required fields.', severity: 'error' });
      return;
    }

    setSnackbar({ open: true, message: 'Visit saved!', severity: 'success' });

    setTimeout(() => {
      if (currentIndex < patientList.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setFormData({
          diagnosis: '',
          symptoms: '',
          medicines: [{ name: '', dosage: '', duration: '' }],
        });
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        {!finished ? (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
              <MedicalServices sx={{ mr: 1 }} fontSize="large" />
              Patient Visit
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              {currentPatient.name} (ID: {currentPatient.patientId})
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Diagnosis"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>

                <Grid item>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Prescribed Medicines
                  </Typography>
                </Grid>

                {formData.medicines.map((med, index) => (
                  <React.Fragment key={index}>
                    <Grid item>
                      <TextField
                        fullWidth
                        label="Medicine Name"
                        value={med.name}
                        onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        label="Dosage"
                        value={med.dosage}
                        onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        label="Duration"
                        value={med.duration}
                        onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                      />
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton onClick={() => removeMedicine(index)} aria-label="remove medicine">
                        <RemoveCircle color="error" />
                      </IconButton>
                    </Grid>
                  </React.Fragment>
                ))}

                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircle />}
                    onClick={addMedicine}
                  >
                    Add Medicine
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                  >
                    {currentIndex < patientList.length - 1 ? 'Submit & Next Patient' : 'Finish'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              All Visits Completed 🎉
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3 }}>
              All patient visit details have been successfully recorded.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert('You can now review data or return to dashboard.')}
            >
              Done
            </Button>
          </Paper>
        )}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default PatientVisitForm;
