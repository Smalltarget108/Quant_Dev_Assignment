import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { login } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      authLogin(response.data.access_token)
      // console.log('Login successful:', response);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login failed', error);
      setError(error.response?.data.detail || 'Login failed. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} className="p-4 bg-white shadow-md rounded-md">
        <Typography variant="h4" component="h1" gutterBottom className="text-center">
          Login
        </Typography>
        <TextField
          required
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
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

export default Login;
