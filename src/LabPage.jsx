// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Badge,
//   Avatar,
//   List,
//   Divider,
//   Button,
// } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import MenuIcon from '@mui/icons-material/Menu';

// const Lab = () => {
//   const [labTests, setLabTests] = useState([]);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [completedOrders, setCompletedOrders] = useState({});

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const [testsRes, ordersRes] = await Promise.all([
//           axios.get('http://172.16.26.0:3001/lab-tests'),
//           axios.get('http://172.16.26.0:3001/recent-orders'),
//         ]);
//         setLabTests(testsRes.data);
//         setRecentOrders(ordersRes.data);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   const getTestDetails = (testName) => {
//     return labTests.find((t) => t.name === testName);
//   };

//   const handleMarkComplete = (uniqueId) => {
//     setCompletedOrders((prev) => ({
//       ...prev,
//       [uniqueId]: true,
//     }));
//   };

//   return (
//     <Box sx={{ height: '100vh', bgcolor: '#1b4d2e', p: 2 }}>
//       <AppBar position="static" sx={{ bgcolor: '#ffffff', color: '#000000', boxShadow: 1 }}>
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton edge="start" color="inherit" aria-label="menu">
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" sx={{ ml: 2 }}>Lab</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton aria-label="notifications">
//               <Badge badgeContent=" " color="error" variant="dot">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//             <Avatar sx={{ ml: 2, bgcolor: 'black' }} />
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ mt: 3, bgcolor: 'white', borderRadius: 2, boxShadow: 3, p: 3, height: 'calc(100% - 80px)', overflowY: 'auto' }}>
//         <Typography variant="h6" gutterBottom>Patient Lab Test History</Typography>

//         {loading ? (
//           <Typography>Loading data...</Typography>
//         ) : (
//           <List>
//             {[...new Set(recentOrders.map(order => order.patient))].map((patientName, i) => (
//               <Box key={i} sx={{ mb: 3 }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom>{patientName}</Typography>
//                 {recentOrders
//                   .filter(order => order.patient === patientName)
//                   .map((order, index) => {
//                     const testDetails = getTestDetails(order.test);
//                     const uniqueKey = `${order.patient}-${order.test}-${index}`; // ✅ Unique per entry
//                     const isCompleted = completedOrders[uniqueKey];

//                     return (
//                       <Box key={uniqueKey} sx={{ ml: 2, mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
//                         <Typography variant="body2">🧪 Test: {order.test}</Typography>
//                         <Typography variant="body2">💵 Cost: ₹{testDetails?.cost || 'N/A'}</Typography>
//                         <Typography variant="body2">⏱ Duration: {testDetails?.duration || 'N/A'}</Typography>
//                         <Typography variant="body2" sx={{ mt: 1 }}>
//                           📋 Status: {isCompleted ? 'Completed' : 'In Progress'}
//                         </Typography>
//                         <Button
//                           variant="contained"
//                           color={isCompleted ? 'success' : 'primary'}
//                           onClick={() => handleMarkComplete(uniqueKey)}
//                           disabled={isCompleted}
//                           sx={{ mt: 1 }}
//                         >
//                           {isCompleted ? 'Completed' : 'Mark Complete'}
//                         </Button>
//                       </Box>
//                     );
//                   })}
//                 <Divider sx={{ mt: 2 }} />
//               </Box>
//             ))}
//           </List>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Lab;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  List,
  Divider,
  Button,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

const Lab = () => {
  const [labData, setLabData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedOrders, setCompletedOrders] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/labTest');
        setLabData(response.data);
      } catch (error) {
        console.error("❌ Error fetching lab test data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMarkComplete = (uniqueKey) => {
    setCompletedOrders((prev) => ({
      ...prev,
      [uniqueKey]: true,
    }));
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: '#1b4d2e', p: 2 }}>
      {/* App Bar */}
      <AppBar position="static" sx={{ bgcolor: '#ffffff', color: '#000000', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2 }}>
              Lab Dashboard
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <Badge badgeContent=" " color="error" variant="dot">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ ml: 2, bgcolor: 'black' }} />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          mt: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          height: 'calc(100% - 80px)',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Patient Lab Test History
        </Typography>

        {loading ? (
          <Typography>Loading data...</Typography>
        ) : labData.length === 0 ? (
          <Typography>No lab tests found.</Typography>
        ) : (
          <List>
            {[...new Set(labData.map((entry) => entry.patient))].map((patient_name, i) => (
              <Box key={i} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {patient_name}
                </Typography>

                {labData
                  .filter((entry) => entry.patient === patient_name)
                  .map((entry, index) => {
                    const uniqueKey = `${entry.patient}-${entry.test}-${index}`;
                    const isCompleted = completedOrders[uniqueKey];

                    return (
                      <Box
                        key={uniqueKey}
                        sx={{
                          ml: 2,
                          mb: 2,
                          p: 2,
                          border: '1px solid #ddd',
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>🧪 Patient Name: {entry.patient_name}</Typography>
                        <Typography variant="body2">🧪 Test: {entry.test_name}</Typography>
                        <Typography variant="body2">💵 Cost: ₹{entry.cost || 'N/A'}</Typography>
                        <Typography variant="body2">⏱ Duration: {entry.duration || 'N/A'}</Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          📋 Status: {isCompleted ? 'Completed' : entry.status || 'In Progress'}
                        </Typography>
                        <Button
                          variant="contained"
                          color={isCompleted ? 'success' : 'primary'}
                          onClick={() => handleMarkComplete(uniqueKey)}
                          disabled={isCompleted}
                          sx={{ mt: 1 }}
                        >
                          {isCompleted ? 'Completed' : 'Mark Complete'}
                        </Button>
                      </Box>
                    );
                  })}
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Lab;
