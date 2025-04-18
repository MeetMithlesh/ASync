import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const AppointmentDashboard = () => {
  return (
    <>
      {/* Top App Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Hospital Name
          </Typography>
          <Typography variant="body1" sx={{ mx: 2 }}>
            Billing
          </Typography>
          <Typography variant="body1" sx={{ mx: 2 }}>
            EMR
          </Typography>
          <Typography variant="body1" sx={{ mx: 2, fontWeight: "bold" }}>
            Appointment
          </Typography>
          <Typography variant="body1" sx={{ mx: 2 }}>
            Patient
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ backgroundColor: "#004d40", py: 4, minHeight: "100vh" }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} alignItems="stretch">
            {/* Left Sidebar */}
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, backgroundColor: "white", height: "100%" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Search"
                  sx={{ mb: 2 }}
                />
                <Typography variant="subtitle1" gutterBottom>
                  Doctors
                </Typography>
                <List dense>
                  {["Dr. M. Sharma", "Dr. S. Gupta", "Dr. R. Patel"].map(
                    (name) => (
                      <ListItem key={name}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: "#b2007f",
                            mr: 1,
                          }}
                        />
                        <ListItemText primary={name} />
                      </ListItem>
                    )
                  )}
                </List>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Today's Appointments
                </Typography>
                {["Rajesh Patel", "Anita Rao", "Vikram Singh"].map((name) => (
                  <ListItem key={name} dense>
                    <Checkbox defaultChecked size="small" />
                    <ListItemText primary={name} />
                  </ListItem>
                ))}
                <Button variant="text" size="small" sx={{ mt: 1 }}>
                  + Add New Patient
                </Button>
              </Paper>
            </Grid>

            {/* Center Calendar Area */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, backgroundColor: "white", height: "100%" }}>
                <Button variant="contained" sx={{ mb: 2 }}>
                  + New appointment
                </Button>
                <Box
                  sx={{
                    width: "100%",
                    height: "600px",
                    overflow: "hidden",
                    borderRadius: 2,
                    border: "1px solid #ccc",
                  }}
                >
                  <iframe
                    title="Google Calendar"
                    src="https://calendar.google.com/calendar/embed?src=abc123%40group.calendar.google.com&ctz=Asia%2FKolkata"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    style={{ border: 0 }}
                  ></iframe>
                </Box>
              </Paper>
            </Grid>

            {/* Right Appointment Detail */}
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, backgroundColor: "white", height: "100%" }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: "#607d8b", mr: 2 }}>RP</Avatar>
                  <Box>
                    <Typography variant="subtitle1">Rajesh Patel</Typography>
                    <Typography variant="caption">45</Typography>
                  </Box>
                </Box>
                <Typography variant="body2">Doctor: Dr. M. Sharma</Typography>
                <Typography variant="body2">Date: Apr 22, 2024</Typography>
                <Typography variant="body2">Time: 9:00 AM – 9:30 AM</Typography>
                <Typography variant="body2">Reason: Follow-up</Typography>

                <Box mt={2}>
                  <label>
                    <Checkbox size="small" /> Reschedule
                  </label>
                </Box>

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Cancel Appointment
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Chat Button (Floating) */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#00bcd4",
          borderRadius: "50%",
          width: 56,
          height: 56,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 3,
        }}
      >
        <ChatBubbleIcon sx={{ color: "white" }} />
      </Box>
    </>
  );
};

export default AppointmentDashboard;
