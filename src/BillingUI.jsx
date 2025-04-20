// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Box,
//   IconButton,
//   Stack,
//   Paper,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import logo from "./assets/image/logoo.png";
// import axios from "axios";

// export default function BillingUI() {
//   const [patientId, setPatientId] = useState("12345");
//   const [billItems, setBillItems] = useState([]);
//   const [billingHistory, setBillingHistory] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const total = billItems.reduce(
//     (acc, item) => acc + item.qty * item.unitCost + item.tax,
//     0
//   );

//   const fetchBillingData = async () => {
//     if (!patientId) return;

//     setLoading(true);
//     try {
//       // Replace with your actual backend endpoint
//       const response = await axios.get(
//         `http://localhost:5000/api/billing/${patientId}`
//       );

//       // Assuming the response looks like { billItems: [...], history: [...] }
//       setBillItems(response.data.billItems || []);
//       setBillingHistory(response.data.history || []);
//     } catch (error) {
//       console.error("Failed to fetch billing data:", error);
//       setBillItems([]);
//       setBillingHistory([]);
//     }
//     setLoading(false);
//   };

//   return (
//     <Box sx={{ backgroundColor: "#14532d", minHeight: "100vh", px: 4, py: 3 }}>
//       {/* Header Line */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           position: "relative",
//           mb: 2,
//         }}
//       >
//         <Box sx={{ position: "absolute", left: 0 }}>
//           <Box component="img" src={logo} alt="Logo" sx={{ width: 100, height: 100 }} />
//         </Box>
//         <Typography variant="h5" fontWeight="bold" color="white">
//           Hospital Name
//         </Typography>
//       </Box>

//       {/* Navigation */}
//       <Paper
//         elevation={3}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           backgroundColor: "white",
//           padding: 2,
//           borderRadius: 2,
//           mb: 3,
//         }}
//       >
//         <IconButton sx={{ color: "black", mr: 2 }}>
//           <MenuIcon />
//         </IconButton>
//         {["Billing", "EMR", "Appointment", "Patient"].map((text) => (
//           <Typography
//             key={text}
//             variant="subtitle1"
//             fontWeight="bold"
//             color="black"
//             sx={{ mx: 2 }}
//           >
//             {text}
//           </Typography>
//         ))}
//       </Paper>

//       {/* Cards Grid */}
//       <Stack
//         direction={{ xs: "column", md: "row" }}
//         spacing={3}
//         justifyContent="space-between"
//       >
//         {/* Bill Search */}
//         <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 4 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Bill Search
//             </Typography>
//             <TextField
//               fullWidth
//               label="Patient ID"
//               margin="normal"
//               value={patientId}
//               onChange={(e) => setPatientId(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               sx={{ mt: 2 }}
//               onClick={fetchBillingData}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Search"}
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Bill Generation */}
//         <Card sx={{ flex: 2, borderRadius: 3, boxShadow: 4 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Bill
//             </Typography>
//             <TextField
//               fullWidth
//               label="Patient ID"
//               margin="normal"
//               value={patientId}
//               disabled
//             />
//             <Table size="small" sx={{ mt: 2 }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Description</TableCell>
//                   <TableCell>Qty</TableCell>
//                   <TableCell>Unit Cost</TableCell>
//                   <TableCell>Tax</TableCell>
//                   <TableCell>Total</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {billItems.map((item, i) => (
//                   <TableRow key={i}>
//                     <TableCell>{item.description}</TableCell>
//                     <TableCell>{item.qty}</TableCell>
//                     <TableCell>{item.unitCost}</TableCell>
//                     <TableCell>{item.tax}</TableCell>
//                     <TableCell>{item.qty * item.unitCost + item.tax}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <Typography align="right" sx={{ mt: 2, fontWeight: "bold" }}>
//               Total: ₹{total}
//             </Typography>
//             <Button
//               variant="contained"
//               color="success"
//               fullWidth
//               sx={{ mt: 2 }}
//             >
//               Proceed Payment
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Billing History */}
//         <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 4 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Patient Billing History
//             </Typography>
//             <List>
//               {billingHistory.map((bill) => (
//                 <ListItem key={bill.id} divider>
//                   <ListItemText
//                     primary={`Bill #${bill.id}`}
//                     secondary={bill.date}
//                   />
//                   <Chip
//                     label={bill.status}
//                     color={bill.status === "Paid" ? "default" : "warning"}
//                     size="small"
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </CardContent>
//         </Card>
//       </Stack>
//     </Box>
//   );
// }


// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Stack,
//   Divider,
// } from "@mui/material";
// import axios from "axios";

// export default function BillingUI() {
//   const [patientId, setPatientId] = useState("");
//   const [patientData, setPatientData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchBillingData = async () => {
//     if (!patientId) return;

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/bills/${patientId}`
//       );
//       if (response.data && response.data.length > 0) {
//         setPatientData(response.data[0]); // Only one patient entry
//       } else {
//         setPatientData(null);
//         setError("No data found for the provided Patient ID.");
//       }
//     } catch (err) {
//       console.error("Failed to fetch billing data:", err);
//       setError("An error occurred while fetching data.");
//       setPatientData(null);
//     }
//     setLoading(false);
//   };

//   const renderServiceTable = (title, items) => (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//         {title}
//       </Typography>
//       {items && items.length > 0 ? (
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Description</TableCell>
//               <TableCell>Unit Cost</TableCell>
//               <TableCell>Total Cost</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {items.map((item, idx) => (
//               <TableRow key={idx}>
//                 <TableCell>{item.Description}</TableCell>
//                 <TableCell>₹{item.UnitCost}</TableCell>
//                 <TableCell>₹{item.TotalCost}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       ) : (
//         <Typography variant="body2" color="textSecondary">
//           No {title.toLowerCase()} available.
//         </Typography>
//       )}
//     </Box>
//   );

//   return (
//     <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Hospital Billing System
//       </Typography>

//       <Card sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Search Patient Billing Information
//           </Typography>
//           <Stack direction="row" spacing={2}>
//             <TextField
//               label="Patient ID"
//               variant="outlined"
//               fullWidth
//               value={patientId}
//               onChange={(e) => setPatientId(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={fetchBillingData}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Search"}
//             </Button>
//           </Stack>
//           {error && (
//             <Typography color="error" sx={{ mt: 2 }}>
//               {error}
//             </Typography>
//           )}
//         </CardContent>
//       </Card>

//       {patientData && (
//         <Card sx={{ maxWidth: 1000, mx: "auto" }}>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>
//               Patient Name: {patientData.name}
//             </Typography>
//             {patientData.bill_rec.map((bill, index) => (
//               <Box key={index} sx={{ mb: 4 }}>
//                 <Divider sx={{ mb: 2 }} />
//                 <Typography variant="h6" gutterBottom>
//                   Bill ID: {bill.bill_id}
//                 </Typography>
//                 <Typography variant="body1">
//                   Visit Date: {bill.visit_date}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1 }}>
//                   Status:{" "}
//                   <Chip
//                     label={bill.status}
//                     color={bill.status === "paid" ? "success" : "warning"}
//                     size="small"
//                   />
//                 </Typography>

//                 {renderServiceTable("Procedures", bill.Procedures)}
//                 {renderServiceTable("Medications", bill.Medications)}
//                 {renderServiceTable("Lab Tests", bill.LabTests)}

//                 <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
//                   Grand Total: ₹{bill.GrandTotal}
//                 </Typography>
//               </Box>
//             ))}
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// }


import React, { useState } from "react";
import {
  Box,
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
  Chip,
  Stack,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

export default function BillingUI() {
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchBillingData = async () => {
    if (!patientId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3001/bills/${patientId}`
      );
      if (response.data && response.data.length > 0) {
        setPatientData(response.data[0]);
      } else {
        setPatientData(null);
        setError("No data found for the provided Patient ID.");
      }
    } catch (err) {
      console.error("Failed to fetch billing data:", err);
      setError("An error occurred while fetching data.");
      setPatientData(null);
    }
    setLoading(false);
  };

  const handlePayment = async (billId, amount) => {
    try {
      const res = await axios.post("http://localhost:3001/bills/pay", {
        bill_id: billId,
        amount,
      });
      if (res.data.success) {
        fetchBillingData(); // Refresh data after payment
      }
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  const renderServiceTable = (title, items) => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      {items && items.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Unit Cost</TableCell>
              <TableCell>Total Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.Description}</TableCell>
                <TableCell>₹{item.UnitCost}</TableCell>
                <TableCell>₹{item.TotalCost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No {title.toLowerCase()} available.
        </Typography>
      )}
    </Box>
  );

  const filteredBills = patientData?.bill_rec?.filter((bill) => {
    if (filter === "all") return true;
    return bill.status === filter;
  });

  return (
    <Box sx={{ backgroundColor: "#266134", minHeight: "100vh", p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Hospital Billing System
      </Typography>

      <Card sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Search Patient Billing Information
          </Typography>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Patient ID"
              variant="outlined"
              fullWidth
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={fetchBillingData}
              disabled={loading}
            >
              {loading ? "Loading..." : "Search"}
            </Button>
          </Stack>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>

      {patientData && (
        <Box sx={{ maxWidth: 1000, mx: "auto", bgcolor: "#ffff" }}>
          <CardContent>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={filter}
                label="Status Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="h5" gutterBottom>
              Patient Name: {patientData.name}
            </Typography>


            {filteredBills?.map((bill, index) => (
              <Card key={index} sx={{ mb: 4 }}>
                <CardContent>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Bill ID: {bill.bill_id}
                  </Typography>
                  <Typography variant="body1">
                    Visit Date: {bill.visit_date}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Status: <Chip label={bill.status} color={bill.status === "paid" ? "success" : "warning"} size="small" />
                  </Typography>

                  {renderServiceTable("Procedures", bill.Procedures)}
                  {renderServiceTable("Medications", bill.Medications)}
                  {renderServiceTable("Lab Tests", bill.LabTests)}

                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                    Grand Total: ₹{bill.GrandTotal}
                  </Typography>

                  {bill.status === "unpaid" && (
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mt: 2 }}
                      onClick={() => handlePayment(bill.bill_id, bill.GrandTotal)}
                    >
                      Pay Now
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Box>
      )}
    </Box>
  );
}