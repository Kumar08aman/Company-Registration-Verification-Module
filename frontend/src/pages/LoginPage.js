import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// 1. Import Redux tools
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice'; // Import your action

// Import Material UI components
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // 2. Get the dispatch function

  const onSubmit = async (data) => {
    try {
      // Make the POST request to your backend login endpoint
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        data // 'data' already contains { email, password }
      );

      // 3. Dispatch the setToken action to save the token
      const token = response.data.token;
      dispatch(setToken(token));

      // Show a success pop-up
      toast.success(response.data.message);

      // 4. Go to the dashboard
      navigate('/dashboard');

    } catch (error) {
      // Show an error pop-up
      console.error('Login failed', error.response.data);
      toast.error(error.response.data.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          {...register('email', { required: true })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register('password', { required: true })}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;