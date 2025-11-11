import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, InputAdornment } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { login } from '../../api/auth.api';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  async function handleLogin() {
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      enqueueSnackbar('Logged in successfully 🎉', { variant: 'success' });
      window.location.href = '/';
    } catch {
      enqueueSnackbar('Login failed. Please check your credentials.', { variant: 'error' });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-half max-w-md"
      >
        <Paper elevation={5} className="p-8 rounded-xl shadow-xl space-y-6">
          <Typography variant="h4" className="text-indigo-700 font-bold text-center">
            Welcome Back 👋
          </Typography>

          <Typography variant="body2" className="text-center text-gray-600">
            Log in to continue your learning journey
          </Typography>

          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            sx={{ mt: 2 }} // Adds spacing between fields
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
            onClick={handleLogin}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Login
          </Button>

          <Typography variant="body2" className="text-center text-gray-600">
            Don’t have an account?{' '}
            <a href="/register" className="text-indigo-600 hover:underline font-medium">
              Register
            </a>
          </Typography>
        </Paper>
      </motion.div>
    </div>
  );
}