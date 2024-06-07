import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      authLogin(response.data.access_token);
      navigate('/dashboard');
      window.location.reload();
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} className="p-4 bg-white shadow-md rounded-md">
        <Typography variant="h4" component="h1" gutterBottom className="text-center">
          Login
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
