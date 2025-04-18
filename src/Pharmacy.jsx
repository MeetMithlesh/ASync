import React from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

const inventoryData = [
  { name: 'Paracetamol', quantity: 120, expiry: '2025-12-01', batch: 'P123', manufacturer: 'MediCare' },
  { name: 'Ibuprofen', quantity: 60, expiry: '2024-08-15', batch: 'I456', manufacturer: 'PharmaPlus' },
  { name: 'Amoxicillin', quantity: 30, expiry: '2024-06-20', batch: 'A789', manufacturer: 'HealthCo' },
];

const prescriptions = [
  { patient: 'John Doe', medication: 'Paracetamol', status: 'Pending' },
  { patient: 'Jane Smith', medication: 'Ibuprofen', status: 'Dispensed' },
  { patient: 'Alice Brown', medication: 'Amoxicillin', status: 'Pending' },
];

const Pharmacy = () => {
  return (
    <Box sx={{ height: '100vh', bgcolor: '#1b4d2e', p: 2 }}>
      <AppBar position="static" sx={{ bgcolor: '#ffffff', color: '#000000', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2 }}>Pharmacy</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="notifications">
              <Badge badgeContent=" " color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ ml: 2, bgcolor: 'black' }} />
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', mt: 3, height: 'calc(100% - 80px)', gap: 2 }}>
        {/* Left: Medication Inventory */}
        <Box sx={{ flex: 6, bgcolor: 'white', borderRadius: 2, boxShadow: 3, p: 2, overflowY: 'auto' }}>
          <Typography variant="h6" gutterBottom>Medication Inventory</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Batch</TableCell>
                <TableCell>Manufacturer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryData.map((med) => (
                <TableRow key={med.batch}>
                  <TableCell>{med.name}</TableCell>
                  <TableCell>{med.quantity}</TableCell>
                  <TableCell>{med.expiry}</TableCell>
                  <TableCell>{med.batch}</TableCell>
                  <TableCell>{med.manufacturer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Right: Recent Prescriptions */}
        <Box sx={{ flex: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom>Recent Prescriptions</Typography>
          <List>
            {prescriptions.map((prescription, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #eee' }}>
                <ListItemText
                  primary={`${prescription.patient} - ${prescription.medication}`}
                  secondary={`Status: ${prescription.status}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Pharmacy;
