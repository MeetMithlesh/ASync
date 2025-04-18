import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import RobotIcon from "@mui/icons-material/SmartToy";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import bg from "./assets/image/bg.png";
import dr from "./assets/image/dr.png";
import road from "./assets/image/road.png";

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
    <Box sx={{ fontSize: 60, display: "flex", justifyContent: "center", mb: 1 }}>
      {icon}
    </Box>
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
      variant="h6"
      sx={{ fontFamily: "monospace", mt: 2, color: "#000" }}
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

export default function Home() {
  return (
    <Box sx={{ fontFamily: "sans-serif", backgroundColor: "#f5f5f5" }}>
      {/* Hero section */}
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
          color: "white",
          textAlign: "center",
          px: 2,
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
          sx={{
            backgroundColor: "#a7f3d0",
            color: "#065f46",
            fontWeight: "bold",
            mt: 2,
          }}
        >
          Get started
        </Button>
      </Box>

      {/* Welcome Section - image left, text right side by side */}
      <Container sx={{ py: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          {/* Image on the left */}
          <Box
            component="img"
            src={dr}
            alt="Doctor illustration"
            sx={{
              width: { xs: "100%", md: "50%" },
              maxWidth: 400,
              height: "auto",
            }}
          />

          {/* Text on the right */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome to Async
            </Typography>
            <Typography variant="body1">
              Your all-in-one solution for streamlined hospital operations. Empower your
              healthcare team with real-time coordination, context-aware tools, and
              paperless workflows. From patient check-in to discharge, Async makes
              hospital management faster, safer, and smarter.
            </Typography>
          </Box>
        </Box>
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

      {/* Typewriter Section */}
      <Box textAlign="center" sx={{ backgroundColor: "#f5f5f5", py: 3 }}>
        <Typewriter
          texts={[
            "AI-powered agents for seamless healthcare workflows.",
            "Faster patient care with intelligent coordination.",
            "Paperless, smart, and secure hospital operations.",
          ]}
        />
      </Box>

      {/* Roadmap Image */}
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          RISHABH BOOKS A DOCTOR VISIT
        </Typography>
        <img
          src={road}
          alt="Visual roadmap of patient booking flow"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
}
