import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { motion } from 'framer-motion';

const SignInPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [patientId, setPatientId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ patientId: false, password: false });

  const handleSignIn = () => {
    const hasPatientIdError = !patientId.trim();
    const hasPasswordError = !password.trim();

    setErrors({ patientId: hasPatientIdError, password: hasPasswordError });

    if (hasPatientIdError || hasPasswordError) {
      return;
    }

    // TODO: Add API call to verify Patient ID and Password
    alert(`Signing in with ID: ${patientId} and Password: ${password}`);
  };

  const handleCreateId = () => {
    window.location.href = '/register';
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            padding: theme.spacing(4),
            maxWidth: 400,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <LocalHospitalIcon color="primary" fontSize="large" />
            <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold' }}>
              Async
            </Typography>
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Sign in to access your health records
          </Typography>

          <TextField
            label="Patient ID"
            fullWidth
            variant="outlined"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            error={errors.patientId}
            helperText={errors.patientId ? 'Patient ID is required' : ' '}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            helperText={errors.password ? 'Password is required' : ' '}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignIn}
            sx={{ mb: 1 }}
          >
            Sign In
          </Button>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleCreateId}
          >
            Create New ID
          </Button>

          <Typography variant="body2" sx={{ mt: 3 }}>
            <Link href="#" underline="hover">
              Having trouble signing in? Contact support.
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default SignInPage;
