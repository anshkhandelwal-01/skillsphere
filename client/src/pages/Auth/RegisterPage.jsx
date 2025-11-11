import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  InputAdornment
} from '@mui/material';
import { Person, Email, Lock } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { register } from '../../api/auth.api';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  async function handleRegister() {
    try {
      const data = await register(email, password, name);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      enqueueSnackbar('Registered successfully 🎉', { variant: 'success' });
      window.location.href = '/';
    } catch {
      enqueueSnackbar('Registration failed. Please try again.', { variant: 'error' });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center relative overflow-hidden px-4">
      {/* Floating visuals */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-pink-200 rounded-full opacity-30 animate-pulse blur-xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-200 rounded-full opacity-30 animate-pulse blur-xl" />

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-half max-w-md"
      >
        <Paper elevation={5} className="p-8 rounded-xl shadow-xl space-y-6">
          <Typography variant="h4" className="text-purple-700 font-bold text-center">
            Create Your Account ✨
          </Typography>

          <Typography variant="body2" className="text-center text-gray-600">
            Join SkillSphere and start celebrating your learning journey
          </Typography>

          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              )
            }}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            onClick={handleRegister}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Register
          </Button>

          <Typography variant="body2" className="text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 hover:underline font-medium">
              Login
            </a>
          </Typography>
        </Paper>
      </motion.div>
    </div>
  );
}