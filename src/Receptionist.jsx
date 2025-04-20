import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Button,
  TextField,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ReceptionistDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [billingAlerts, setBillingAlerts] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    doctorName: '',
    time: '',
    status: 'Scheduled',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apptRes = await axios.get('/api/appointments');
        const patientRes = await axios.get('/api/patients');
        const billingRes = await axios.get('/api/billing/alerts');

        setAppointments(apptRes.data);
        setPatients(patientRes.data);
        setBillingAlerts(billingRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddAppointment = async () => {
    try {
      const res = await axios.post('/api/appointments', newAppointment);
      setAppointments((prev) => [...prev, res.data]);
      setNewAppointment({ patientName: '', doctorName: '', time: '', status: 'Scheduled' });
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Receptionist Dashboard</Typography>

      {/* Dashboard cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Today's Appointments</Typography>
            <Typography>{appointments.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Pending Payments</Typography>
            <Typography>{billingAlerts.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6">Total Patients</Typography>
            <Typography>{patients.length}</Typography>
          </CardContent>
        </Card>
      </Box>

      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Appointments" />
        <Tab label="Patients" />
        <Tab label="Billing" />
      </Tabs>

      {/* Appointments tab */}
      {tabIndex === 0 && (
        <>
          <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
            <TextField
              label="Patient Name"
              value={newAppointment.patientName}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, patientName: e.target.value })
              }
            />
            <TextField
              label="Doctor Name"
              value={newAppointment.doctorName}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, doctorName: e.target.value })
              }
            />
            <TextField
              label="Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={newAppointment.time}
              onChange={(e) =>
                setNewAppointment({ ...newAppointment, time: e.target.value })
              }
            />
            <Button variant="contained" onClick={handleAddAppointment}>
              Add
            </Button>
          </Box>

          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt, index) => (
                <TableRow key={index}>
                  <TableCell>{appt.patientName}</TableCell>
                  <TableCell>{appt.doctorName}</TableCell>
                  <TableCell>{appt.time}</TableCell>
                  <TableCell>{appt.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {/* Patients tab */}
      {tabIndex === 1 && (
        <Box sx={{ mt: 2 }}>
          <TextField
            placeholder="Search patient..."
            variant="outlined"
            size="small"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Last Visit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow key={index}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}

      {/* Billing tab */}
      {tabIndex === 2 && (
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billingAlerts.map((bill, index) => (
              <TableRow key={index}>
                <TableCell>{bill.patientName}</TableCell>
                <TableCell>${bill.amount}</TableCell>
                <TableCell>{bill.status}</TableCell>
                <TableCell>{bill.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default ReceptionistDashboard;