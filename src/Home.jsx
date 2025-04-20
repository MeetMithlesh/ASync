import React from "react";
import { Box, Button, Container, Grid, Typography, Paper } from "@mui/material";
import RobotIcon from "@mui/icons-material/SmartToy";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
// import bg from "./constant"
// import { bg } from "./constant";
import bg from './assets/image/bg.png';

const FeatureCard = ({ icon, title, points }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      borderRadius: 3,
      backgroundColor: "#66ff99",
      textAlign: "center",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <Box fontSize={60}>{icon}</Box>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Box textAlign="left" sx={{ fontSize: 14, color: "#065f46" }}>
      {points.map((point, i) => (
        <Box key={i}>• {point}</Box>
      ))}
    </Box>
  </Paper>
);

export default function Home() {
  return (
    <Box sx={{ fontFamily: "sans-serif", backgroundColor: "#f5f5f5" }}>
     {/* Hero section */}
      <Box
        sx={{
          backgroundImage:{bg},

          backgroundSize: "cover",
          backgroundPosition: "center",
          py: 10,
          color: "white",
          textAlign: "center",
        }}
      >
        
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Async
        </Typography>
        <Typography variant="h6" gutterBottom>
          Prescribe. Process. Perform.
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#a7f3d0", color: "#065f46", fontWeight: "bold" }}
        >
          Get started
        </Button>
      </Box>

      {/* Welcome Section */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src="/images/Untitled_design_1-removebg-preview 1.png"
              alt="Doctor"
              style={{ width: "100%", maxWidth: 300 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Welcome to Async
            </Typography>
            <Typography variant="body1">
              Your all-in-one solution for streamlined hospital operations.
              Empower your healthcare team with real-time coordination, context-aware tools,
              and paperless workflows. From patient check-in to discharge,
              Async makes hospital management faster, safer, and smarter.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Agent Cards */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} display="flex">
            <FeatureCard
              icon={<RobotIcon fontSize="large" />}
              title="EMR AGENT"
              points={[
                "Fast, context-aware record search",
                "Auto-updates across departments",
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4} display="flex">
            <FeatureCard
              icon={<CreditCardIcon fontSize="large" />}
              title="BILLING AGENT"
              points={[
                "Intelligent cost breakdowns",
                "Insurance-ready invoicing",
                "Real-time payment tracking",
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4} display="flex">
            <FeatureCard
              icon={<CalendarIcon fontSize="large" />}
              title="SCHEDULING AGENT"
              points={[
                "Smart resource allocation",
                "Conflict-free appointment setting",
                "Adaptive team coordination",
              ]}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Roadmap Image */}
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          RISHABH BOOKS A DOCTOR VISIT
        </Typography>
        <img
          src="/images/KRIYETA 4.0-Photoroom 1.png"
          alt="Flow"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
}