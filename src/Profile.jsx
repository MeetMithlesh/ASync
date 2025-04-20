// import React, { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   Box,
//   Avatar,
//   Divider,
//   Grid,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const roleOptions = [
//   {
//     label: "Continue as Patient",
//     role: "patient",
//     path: "/login/patient",
//     color: "primary",
//   },
//   {
//     label: "Continue as Doctor",
//     role: "doctor",
//     path: "/login/doctor",
//     color: "success",
//   },
//   {
//     label: "Continue as Receptionist",
//     role: "receptionist",
//     path: "/login/reception",
//     color: "warning",
//   },
// ];

// const Profile = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const handleRoleSelect = (path) => {
//     navigate(path);
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/api/user/profile", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to fetch user profile", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) return <Typography sx={{ p: 4 }}>Loading profile...</Typography>;

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", p: 2 }}>
//       <Card sx={{ maxWidth: 500, width: "100%", p: 3, borderRadius: 3, boxShadow: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//           <Avatar sx={{ width: 64, height: 64 }}>
//             {user?.name?.[0] || "U"}
//           </Avatar>
//           <Box>
//             <Typography variant="h5">{user?.name || "User Name"}</Typography>
//             <Typography variant="body2" color="text.secondary">
//               {user?.email || "user@example.com"}
//             </Typography>
//           </Box>
//         </Box>
//         <Divider sx={{ mb: 2 }} />
//         <Typography variant="body1"><strong>Phone:</strong> {user?.phone || "Not provided"}</Typography>
//         <Typography variant="body1"><strong>Joined:</strong> {user?.joinedDate || "N/A"}</Typography>

//         <Divider sx={{ my: 3 }} />
//         <Typography variant="subtitle1" gutterBottom>
//           Continue as:
//         </Typography>

//         <Grid container spacing={2}>
//           {roleOptions.map((role, idx) => (
//             <Grid item xs={12} sm={4} key={idx}>
//               <Button
//                 variant="contained"
//                 fullWidth
//                 color={role.color}
//                 onClick={() => handleRoleSelect(role.path)}
//               >
//                 {role.label}
//               </Button>
//             </Grid>
//           ))}
//         </Grid>

//         <Button
//           variant="outlined"
//           color="error"
//           sx={{ mt: 4 }}
//           onClick={handleLogout}
//         >
//           Logout
//         </Button>
//       </Card>
//     </Box>
//   );
// };

// export default Profile;
