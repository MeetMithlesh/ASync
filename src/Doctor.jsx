import React from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Badge, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = () => {
  return (
    <Box sx={{ height: '100vh', bgcolor: '#1b4d2e', p: 2 }}>
      {/* Top Bar */}
      <AppBar position="static" sx={{ bgcolor: '#ffffff', color: '#000000', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2 }}>Search</Typography>
            <Typography variant="h6" sx={{ ml: 4 }}>Appointments</Typography>
            <Typography variant="h6" sx={{ ml: 4 }}>Quick Actions</Typography>
            <Typography variant="h6" sx={{ ml: 4 }}>Alerts</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge badgeContent=" " color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
            <Avatar sx={{ ml: 2, bgcolor: 'black' }} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ display: 'flex', mt: 3, height: 'calc(100% - 80px)' }}>
        {/* Left Column */}
        <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['Appointments', 'Upcoming Tasks', 'Patients Corner'].map((label) => (
            <Box
              key={label}
              sx={{
                height: 150,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                p: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                align="center"
                sx={{ bgcolor: '#dcdcdc', p: 1, borderRadius: 1 }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Middle + Right Columns Wrapper */}
        <Box sx={{ display: 'flex', flexGrow: 1, gap: 2, ml: 2 }}>
          {/* Middle Column */}
          <Box
            sx={{
              flex: 7,
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: 3,
              height: '100%',
            }}
          />

          {/* Right Column */}
          <Box
            sx={{
              flex: 3,
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: 3,
              height: '100%',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
