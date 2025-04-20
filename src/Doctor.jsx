import React from 'react';
import {
  Box, Typography, AppBar, Toolbar, IconButton, Badge, Avatar,
  Paper, Table, TableBody, TableCell, TableHead, TableRow, List, ListItem, ListItemText, Divider
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

const appointments = [
  { name: 'John Doe', time: '10:00 AM', reason: 'Fever', type: 'Consultation', status: 'Completed' },
  { name: 'Jane Smith', time: '11:30 AM', reason: 'Check-up', type: 'Follow-up', status: 'Pending' },
  { name: 'Mark Wilson', time: '1:00 PM', reason: 'Diabetes', type: 'Consultation', status: 'Pending' },
];

const tasks = ['Review test reports', 'Complete prescription for Mr. X', 'Surgery at 4 PM'];

const alerts = ['Lab result pending for Jane Smith', 'Follow-up due for Mark Wilson'];

const DoctorDashboard = () => {
  return (
    <Box sx={{ height: '100vh', bgcolor: '#14532d', p: 2 }}>
      {/* Top Bar */}
      <AppBar position="static" sx={{ bgcolor: '#ffffff', color: '#000000', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2 }}>Doctor Dashboard</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2 }}>Dr. Smith</Typography>
            <Badge badgeContent=" " color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
            <Avatar sx={{ ml: 2, bgcolor: 'black' }} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ display: 'flex', mt: 3, height: 'calc(100% - 80px)' }}>
        {/* Left Sidebar */}
        <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Upcoming Tasks</Typography>
            <List>
              {tasks.map((task, i) => (
                <ListItem key={i}>
                  <ListItemText primary={task} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">Patients Corner</Typography>
            <Typography>New: 2</Typography>
            <Typography>Follow-ups: 1</Typography>
          </Paper>
        </Box>

        {/* Center Section */}
        <Box sx={{ flex: 7, mx: 2 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>Today’s Appointments</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appt, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{appt.name}</TableCell>
                    <TableCell>{appt.time}</TableCell>
                    <TableCell>{appt.reason}</TableCell>
                    <TableCell>{appt.type}</TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: appt.status === 'Completed' ? 'green' : 'orange',
                          fontWeight: 500,
                        }}
                      >
                        {appt.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">EMR Quick Preview</Typography>
            <Typography variant="body2" color="textSecondary">
              Select a patient from the appointments list to view records.
            </Typography>
          </Paper>
        </Box>

        {/* Right Section */}
        <Box sx={{ flex: 3 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Alerts & Reminders</Typography>
            <List>
              {alerts.map((alert, i) => (
                <React.Fragment key={i}>
                  <ListItem>
                    <ListItemText primary={alert} />
                  </ListItem>
                  {i < alerts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
