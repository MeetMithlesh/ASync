import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./assets/image/logoo.png";
import axios from "axios";

export default function BillingUI() {
  const [patientId, setPatientId] = useState("12345");
  const [billItems, setBillItems] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const total = billItems.reduce(
    (acc, item) => acc + item.qty * item.unitCost + item.tax,
    0
  );

  const fetchBillingData = async () => {
    if (!patientId) return;

    setLoading(true);
    try {
      // Replace with your actual backend endpoint
      const response = await axios.get(
        `http://localhost:5000/api/billing/${patientId}`
      );

      // Assuming the response looks like { billItems: [...], history: [...] }
      setBillItems(response.data.billItems || []);
      setBillingHistory(response.data.history || []);
    } catch (error) {
      console.error("Failed to fetch billing data:", error);
      setBillItems([]);
      setBillingHistory([]);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ backgroundColor: "#14532d", minHeight: "100vh", px: 4, py: 3 }}>
      {/* Header Line */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          mb: 2,
        }}
      >
        <Box sx={{ position: "absolute", left: 0 }}>
          <Box component="img" src={logo} alt="Logo" sx={{ width: 100, height: 100 }} />
        </Box>
        <Typography variant="h5" fontWeight="bold" color="white">
          Hospital Name
        </Typography>
      </Box>

      {/* Navigation */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: 2,
          borderRadius: 2,
          mb: 3,
        }}
      >
        <IconButton sx={{ color: "black", mr: 2 }}>
          <MenuIcon />
        </IconButton>
        {["Billing", "EMR", "Appointment", "Patient"].map((text) => (
          <Typography
            key={text}
            variant="subtitle1"
            fontWeight="bold"
            color="black"
            sx={{ mx: 2 }}
          >
            {text}
          </Typography>
        ))}
      </Paper>

      {/* Cards Grid */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        justifyContent="space-between"
      >
        {/* Bill Search */}
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bill Search
            </Typography>
            <TextField
              fullWidth
              label="Patient ID"
              margin="normal"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={fetchBillingData}
              disabled={loading}
            >
              {loading ? "Loading..." : "Search"}
            </Button>
          </CardContent>
        </Card>

        {/* Bill Generation */}
        <Card sx={{ flex: 2, borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bill
            </Typography>
            <TextField
              fullWidth
              label="Patient ID"
              margin="normal"
              value={patientId}
              disabled
            />
            <Table size="small" sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Unit Cost</TableCell>
                  <TableCell>Tax</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billItems.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                    <TableCell>{item.unitCost}</TableCell>
                    <TableCell>{item.tax}</TableCell>
                    <TableCell>{item.qty * item.unitCost + item.tax}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography align="right" sx={{ mt: 2, fontWeight: "bold" }}>
              Total: ₹{total}
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
            >
              Proceed Payment
            </Button>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Patient Billing History
            </Typography>
            <List>
              {billingHistory.map((bill) => (
                <ListItem key={bill.id} divider>
                  <ListItemText
                    primary={`Bill #${bill.id}`}
                    secondary={bill.date}
                  />
                  <Chip
                    label={bill.status}
                    color={bill.status === "Paid" ? "default" : "warning"}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
