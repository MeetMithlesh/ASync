import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Avatar
} from "@mui/material";
import { Link } from "react-router-dom";
import RobotIcon from "@mui/icons-material/SmartToy";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import bg from "./assets/image/bg.png";
import dr from "./assets/image/dr.png";
import logo from "./assets/image/logoo.png";

const FeatureCard = ({ icon, title, points }) => (
  <Paper
    elevation={6}
    sx={{
      p: 4,
      borderRadius: 6,
      backgroundColor: "#ffffff",
      textAlign: "center",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      border: "1px solid #e0e0e0",
      ":hover": {
        transform: "translateY(-8px)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
      },
    }}
  >
    <Box sx={{ fontSize: 70, display: "flex", justifyContent: "center", mb: 1, color: "#2e7d32" }}>
      {icon}
    </Box>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Box textAlign="left" sx={{ fontSize: 16, color: "#424242", mt: "auto" }}>
      {points.map((point, i) => (
        <Box key={i} sx={{ mb: 1 }}>• {point}</Box>
      ))}
    </Box>
  </Paper>
);

const Typewriter = ({ texts, speed = 70, delay = 2000 }) => {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayed(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
        setDisplayed("");
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, textIndex, texts, speed, delay]);

  return (
    <Typography
      variant="h4"
      sx={{
        fontFamily: "monospace",
        mt: 2,
        color: "#1e1e1e",
        fontSize: "2rem",
        fontWeight: "bold",
      }}
    >
      {displayed}
      <Box component="span" sx={{ animation: "blink 1s step-end infinite" }}>|</Box>
      <style>
        {`
          @keyframes blink {
            from, to { opacity: 0 }
            50% { opacity: 1 }
          }
        `}
      </style>
    </Typography>
  );
};

const Navbar = () => (
  <AppBar
    position="fixed"
    sx={{
      backgroundColor: "#ffffffcc",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      backdropFilter: "blur(10px)",
      zIndex: 1300,
    }}
  >
    <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
      {[
        { name: "Billing", route: "/billing" },
        { name: "Appointment", route: "/appointment" },
        { name: "EMR", route: "/emr" },
        { name: "Lab Test", route: "/labtest" },
        { name: "Pharmacy", route: "/pharmacy" },
        { name: "Book Appointment", route: "/bookappointment" },
      ].map(({ name, route }, index) => (
        <Button
          key={index}
          component={Link}
          to={route}
          sx={{
            color: "#333",
            fontWeight: 600,
            fontSize: "1rem",
            px: 2,
            transition: "0.3s",
            borderRadius: 2,
            ":hover": {
              backgroundColor: "#e8f5e9",
              color: "#2e7d32",
            },
          }}
        >
          {name}
        </Button>
      ))}
    </Toolbar>
  </AppBar>
);

const StepBox = ({ number, title }) => (
  <Paper elevation={3} sx={{ p: 3, borderRadius: 3, width: 250, textAlign: "center" }}>
    <Avatar sx={{ bgcolor: "#2e7d32", mx: "auto", mb: 1 }}>{number}</Avatar>
    <Typography variant="h6">{title}</Typography>
  </Paper>
);

const Footer = () => (
  <Box
    sx={{
      backgroundColor: "#2e7d32",
      color: "#fff",
      textAlign: "center",
      py: 3,
      mt: 6,
    }}
  >
    <Typography variant="body1">© 2025 Async Hospital Portal. All rights reserved.</Typography>
  </Box>
);

export default function HomePage() {
  return (
    <Box sx={{ fontFamily: "Roboto, sans-serif", backgroundColor: "#fafafa" }}>
      <Navbar />

      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box component="img" src={logo} alt="Async logo" sx={{ width: 350, height: 350, mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#fff", fontSize: { xs: "1.8rem", md: "2.2rem" } }} gutterBottom>
          Prescribe. Process. Perform.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/bookappointment"
          sx={{
            backgroundColor: "#2e7d32",
            color: "white",
            fontWeight: 600,
            fontSize: "1rem",
            px: 4,
            py: 1.5,
            mt: 2,
            borderRadius: 3,
            ":hover": { backgroundColor: "#1b5e20" },
          }}
        >
          Get started
        </Button>
      </Box>

      <Container sx={{ py: 10 }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 4,
            backgroundColor: "#2e7d32",
            color: "#fff",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Box component="img" src={dr} alt="Doctor illustration" sx={{ width: { xs: "100%", md: "50%" }, maxWidth: 420, height: "auto" }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome to Async
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Your all-in-one solution for streamlined hospital operations. Empower your
              healthcare team with real-time coordination, context-aware tools, and
              paperless workflows. From patient check-in to discharge, Async makes
              hospital management faster, safer, and smarter. Designed for efficiency and
              accuracy, Async empowers your medical staff to focus on what truly
              matters—delivering quality care. Go paperless, eliminate delays, and bring
              your hospital into the future with one unified platform.
            </Typography>
          </Box>
        </Paper>
      </Container>

      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {[{ icon: <RobotIcon fontSize="xlarge" />, title: "EMR AGENT", points: ["Fast, context-aware record search", "Auto-updates across departments"] }, { icon: <CreditCardIcon fontSize="xlarge" />, title: "BILLING AGENT", points: ["Intelligent cost breakdowns", "Insurance-ready invoicing", "Real-time payment tracking"] }, { icon: <CalendarIcon fontSize="xlarge" />, title: "SCHEDULING AGENT", points: ["Smart resource allocation", "Conflict-free appointment setting", "Adaptive team coordination"] }].map((card, idx) => (
            <Grid item xs={12} md={4} key={idx} sx={{ display: "flex" }}>
              <FeatureCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box textAlign="center" sx={{ backgroundColor: "#f9f9f9", py: 8 }}>
        <Typewriter texts={["AI-powered agents for seamless healthcare workflows.", "Faster patient care with intelligent coordination.", "Paperless, smart, and secure hospital operations."]} />
      </Box>

      <Typography variant="h5" textAlign="center" fontWeight="bold" sx={{ mt: 8, mb: 3, fontSize: "2rem" }}>
        Ready to transform your hospital operations with AI?
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="center" gap={3} mb={4}>
        <StepBox number={1} title="Choose Role & Login" />
        <ArrowForwardIcon fontSize="large" sx={{ color: "#2e7d32" }} />
        <StepBox number={2} title="AI Agents Guide Workflow" />
        <ArrowForwardIcon fontSize="large" sx={{ color: "#2e7d32" }} />
        <StepBox number={3} title="Get Insights & Alerts Instantly" />
      </Box>

      <Box display="flex" justifyContent="center" mb={6}>
        <Button
          variant="contained"
          color="success"
          size="large"
          component={Link}
          to="/bookappointment"
          sx={{ px: 5, py: 1.5, fontSize: "1rem", fontWeight: "bold", borderRadius: 3 }}
        >
          Get Started
        </Button>
      </Box>

      <Container sx={{ py: 6 }}>
        <Typography variant="h5" textAlign="center" fontWeight="bold" sx={{ mb: 3, fontSize: "2rem" }}>
          Tech Stack
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {["React", "Material-UI", "Node.js", "Express", "MongoDB", "JWT Auth"].map((tech, i) => (
            <Grid item key={i}>
              <Paper elevation={2} sx={{ px: 4, py: 2, borderRadius: 3, fontWeight: "bold", color: "#2e7d32", border: "1px solid #c8e6c9" }}>
                {tech}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box textAlign="center" mb={4}>
        <Typography variant="body2">
          Built with <span style={{ color: "red" }}>❤️</span> using React & Material UI
        </Typography>
      </Box>

      <Footer />
    </Box>
  );
}
