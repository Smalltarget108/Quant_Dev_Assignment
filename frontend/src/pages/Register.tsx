import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import Alert from '@mui/material/Alert';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (event: any) => {
    const value = event.target.value;
    setEmail(value);

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    setEmailError(!emailRegex.test(value));
  };

  const handleRegister = async () => {
    try {
      await register(username, email, password);
      navigate('/login');
    } catch (error: any) {
      console.error('Registration failed', error);
      setError(error.response?.data.detail || 'Registration failed. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} className="p-4 bg-white shadow-md rounded-md">
        <Typography variant="h4" component="h1" gutterBottom className="text-center">
          Register
        </Typography>
        <TextField
          required
          label="Username"
          fullWidth
          margin="normal"
          className="mt-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          label="Email"
          type="Email"
          fullWidth
          margin="normal"
          className="mt-4"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          helperText={emailError ? "Invalid email format" : ""}
        />
        <TextField
          required
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          className="mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" onClick={handleRegister} fullWidth className="mt-6">
          Register
        </Button>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Register;
