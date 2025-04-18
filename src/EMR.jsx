import React from "react";
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

const EMRDashboard = () => {
  return (
    <>
      {/* Top App Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hospital Name
          </Typography>
          <Typography sx={{ mx: 2 }}>Billing</Typography>
          <Typography sx={{ mx: 2, fontWeight: "bold" }}>EMR</Typography>
          <Typography sx={{ mx: 2 }}>Appointment</Typography>
          <Typography sx={{ mx: 2 }}>Patient</Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ backgroundColor: "#004d40", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} alignItems="stretch">
            {/* Left Sidebar */}
            <Grid item xs={12} md={2.5}>
              <Paper
                sx={{
                  p: 2,
                  height: "100%",
                  minHeight: "100%",
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Tags
                </Typography>
                <List>
                  {["Allergies", "Follow-Up", "Diagnostic"].map((tag) => (
                    <ListItem
                      key={tag}
                      sx={{
                        backgroundColor: "#f5f5f5",
                        borderRadius: 2,
                        mb: 1,
                        px: 2,
                      }}
                    >
                      <ListItemText primary={tag} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Center Content */}
            <Grid item xs={12} md={6.5}>
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  minHeight: "100%",
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                }}
              >
                {/* Patient Info */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Name:</strong> Rairi Sharma
                    </Typography>
                    <Typography>
                      <strong>Age:</strong> 45
                    </Typography>
                    <Typography>
                      <strong>Gender:</strong> Male
                    </Typography>
                    <Typography>
                      <strong>Blood Group:</strong> B+
                    </Typography>
                    <Typography>
                      <strong>Contact:</strong> +91-9876543210
                    </Typography>
                    <Typography>
                      <strong>Allergies:</strong> Penicillin
                    </Typography>
                    <Typography>
                      <strong>Chronic Conditions:</strong> Type 2 Diabetes,
                      Hypertension
                    </Typography>
                    <Typography>
                      <strong>Last Visit:</strong> 02-Apr-2025
                    </Typography>
                    <Typography>
                      <strong>Next Visit:</strong> 16-Apr-2025
                    </Typography>
                  </Grid>

                  {/* Prescriptions Table */}
                  <Grid item xs={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      <strong>Prescriptions</strong>
                    </Typography>
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
                        <TableRow>
                          <TableCell>Metformin 500mg</TableCell>
                          <TableCell>1 tablet</TableCell>
                          <TableCell>Twice a day</TableCell>
                          <TableCell>30 days</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Amlodipine 5mg</TableCell>
                          <TableCell>1 tablet</TableCell>
                          <TableCell>Once a day</TableCell>
                          <TableCell>30 days</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Myospaz</TableCell>
                          <TableCell>1 tablet</TableCell>
                          <TableCell>When needed</TableCell>
                          <TableCell>5 days</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Refresh Tears</TableCell>
                          <TableCell>1 drop</TableCell>
                          <TableCell>Every 4 hrs</TableCell>
                          <TableCell>10 days</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>

                {/* Vitals Table */}
                <Box mt={3}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    <strong>Vitals History</strong>
                  </Typography>
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
                      <TableRow>
                        <TableCell>02-Apr-2025</TableCell>
                        <TableCell>138/92</TableCell>
                        <TableCell>130 mg/dL</TableCell>
                        <TableCell>78 bpm</TableCell>
                        <TableCell>72 kg</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>15-Mar-2025</TableCell>
                        <TableCell>135/90</TableCell>
                        <TableCell>125 mg/dL</TableCell>
                        <TableCell>76 bpm</TableCell>
                        <TableCell>73 kg</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>26-Feb-2025</TableCell>
                        <TableCell>140/94</TableCell>
                        <TableCell>145 mg/dL</TableCell>
                        <TableCell>80 bpm</TableCell>
                        <TableCell>74 kg</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>

                {/* Attachments */}
                <Box mt={3}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    <strong>Attachments</strong>
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="✓ Latest Lab Report - Apr. 2025 (PDF)" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="✓ Eye Scan Image (PNG)" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="✓ Prescription PDF (Auto-guterated)" />
                    </ListItem>
                  </List>
                </Box>
              </Paper>
            </Grid>

            {/* Right Sidebar */}
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 3,
                  height: "100%",
                  minHeight: "100%",
                  borderRadius: 3,
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                }}
              >
                <Avatar
                  sx={{ width: 80, height: 80, margin: "auto", bgcolor: "#90a4ae" }}
                />
                <Typography variant="h6" mt={1}>
                  John Smith
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: #123456
                </Typography>
                <Box mt={2}>
                  <Typography>Date of Birth</Typography>
                  <Typography>01/01/1380</Typography>
                  <Typography mt={1}>Sex</Typography>
                  <Typography>Male</Typography>
                  <Typography mt={1}>Phone</Typography>
                  <Typography>(123) 456-7890</Typography>
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
