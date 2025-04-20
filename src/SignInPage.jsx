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
        background: ' #14532d ',
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
          elevation={8}
          sx={{
            borderRadius: 6,
            padding: theme.spacing(5),
            maxWidth: 420,
            width: '100%',
            textAlign: 'center',
            backgroundColor: '#ffffffee',
            backdropFilter: 'blur(10px)',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <LocalHospitalIcon sx={{ color: '#2e7d32', fontSize: 40 }} />
              <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold', color: '#2e7d32' }}>
                Async 
              </Typography>
            </Box>
          </motion.div>

          <Typography variant="subtitle1" sx={{ mb: 4, color: '#4f4f4f' }}>
            Access your health records securely
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
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSignIn}
            sx={{
              mb: 2,
              backgroundColor: '#2e7d32',
              '&:hover': {
                backgroundColor: '#1b5e20',
              },
              color: '#fff',
              fontWeight: 'bold',
              py: 1.5,
              borderRadius: 3,
            }}
          >
            Sign In
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleCreateId}
            sx={{
              color: '#2e7d32',
              borderColor: '#2e7d32',
              fontWeight: 'bold',
              py: 1.5,
              borderRadius: 3,
              '&:hover': {
                backgroundColor: '#e8f5e9',
              },
            }}
          >
            Create New ID
          </Button>

          <Typography variant="body2" sx={{ mt: 3, color: '#555' }}>
            <Link href="#" underline="hover" color="primary">
              Having trouble signing in? Contact support.
            </Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default SignInPage;
