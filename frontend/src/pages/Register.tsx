import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} className="p-4 bg-white shadow-md rounded-md">
        <Typography variant="h4" component="h1" gutterBottom className="text-center">
          Register
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          className="mt-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          className="mt-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          className="mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleRegister} fullWidth className="mt-6">
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;