import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Container,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import axios from "./axios";

const EMRDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://172.16.26.0:3001/get-emr") // replace with your actual endpoint
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching EMR data:", err));
  }, []);

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   axios.get('/check-auth')
  //     .then(res => {
  //       setUser(res.data.user); // user is from decoded JWT
  //     })
  //     .catch(err => {
  //       console.log("User not logged in", err.response?.data);
  //       setUser(null);
  //     });
  // }, []);



  if (!data) return <Typography sx={{ p: 4 }}>Loading EMR...</Typography>;

  const { patient, prescriptions, vitals, attachments } = data;

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#14532d" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit"><MenuIcon /></IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Hospital Name</Typography>
          <Typography sx={{ mx: 2 }}>Billing</Typography>
          <Typography sx={{ mx: 2, fontWeight: "bold" }}>EMR</Typography>
          <Typography sx={{ mx: 2 }}>Appointment</Typography>
          <Typography sx={{ mx: 2 }}>Patient</Typography>
          <IconButton color="inherit"><NotificationsIcon /></IconButton>
          <IconButton color="inherit"><PersonIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ backgroundColor: "#14532d", minHeight: "100vh", py: 4 , display: "flex", justifyContent: "space-evenly"}}>
        <Container maxWidth="xl" >
          <Grid container spacing={2}>
            <Grid item xs={12} md={2.5} sx={{width: "15%"}}>
              <Paper sx={{ p: 2, height: "100%", borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Tags</Typography>
                <List>
                  {["Allergies", "Follow-Up", "Diagnostic"].map(tag => (
                    <ListItem key={tag} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, mb: 1, px: 2 }}>
                      <ListItemText primary={tag} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6.5}>
              <Paper sx={{ p: 3, height: "100%", borderRadius: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography><strong>Name:</strong> {patient.name}</Typography>
                    <Typography><strong>Age:</strong> {patient.age}</Typography>
                    <Typography><strong>Gender:</strong> {patient.gender}</Typography>
                    <Typography><strong>Blood Group:</strong> {patient.bloodGroup}</Typography>
                    <Typography><strong>Contact:</strong> {patient.contact}</Typography>
                    <Typography><strong>Allergies:</strong> {patient.allergies}</Typography>
                    <Typography><strong>Chronic Conditions:</strong> {patient.conditions}</Typography>
                    <Typography><strong>Last Visit:</strong> {patient.lastVisit}</Typography>
                    <Typography><strong>Next Visit:</strong> {patient.nextVisit}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>Prescriptions</strong></Typography>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Medicine</TableCell>
                          <TableCell>Dosage</TableCell>
                          <TableCell>Frequency</TableCell>
                          <TableCell>Duration</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {prescriptions.map((presc, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{presc.medicine}</TableCell>
                            <TableCell>{presc.dosage}</TableCell>
                            <TableCell>{presc.frequency}</TableCell>
                            <TableCell>{presc.duration}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>

                <Box mt={3}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>Vitals History</strong></Typography>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>BP</TableCell>
                        <TableCell>Sugar</TableCell>
                        <TableCell>Pulse</TableCell>
                        <TableCell>Weight</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vitals.map((v, i) => (
                        <TableRow key={i}>
                          <TableCell>{v.date}</TableCell>
                          <TableCell>{v.bp}</TableCell>
                          <TableCell>{v.sugar}</TableCell>
                          <TableCell>{v.pulse}</TableCell>
                          <TableCell>{v.weight}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>

                <Box mt={3}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>Attachments</strong></Typography>
                  <List dense>
                    {attachments.map((file, i) => (
                      <ListItem key={i}>
                        <ListItemText primary={`✓ ${file}`} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={14} md={3}>
              <Paper sx={{ p: 3, height: "100%", borderRadius: 3, textAlign: "center" }}>
                <Avatar sx={{ width: 80, height: 80, margin: "auto", bgcolor: "#90a4ae" }} />
                <Typography variant="h6" mt={1}>{patient.name}</Typography>
                <Typography variant="body2" color="text.secondary">ID: #{patient.id}</Typography>
                <Box mt={2}>
                  <Typography>Date of Birth</Typography>
                  <Typography>{patient.dob}</Typography>
                  <Typography mt={1}>Sex</Typography>
                  <Typography>{patient.gender}</Typography>
                  <Typography mt={1}>Phone</Typography>
                  <Typography>{patient.phone}</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default EMRDashboard;
