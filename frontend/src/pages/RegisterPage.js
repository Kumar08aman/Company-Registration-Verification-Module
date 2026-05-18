import React from 'react';
import { useForm } from 'react-hook-form'; // Imports the form library
import axios from 'axios'; // Imports axios for API calls
import { toast } from 'react-toastify'; // Imports the notification library
import { useNavigate } from 'react-router-dom';

// Import Material UI components
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  // This function will run when the form is submitted
  const onSubmit = async (data) => {
    try {
      // This is the same data your backend expects
      // We force 'gender' to uppercase 'M' or 'F' to match the database
      const formData = {
        email: data.email,
        password: data.password,
        full_name: data.fullName,
        gender: data.gender.toUpperCase(), // 'm' -> 'M'
        mobile_no: data.mobile,
      };

      // Make the POST request to your backend
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData
      );

      // Show a success pop-up
      toast.success(response.data.message);
      
      // Go to the login page after successful registration
      navigate('/login');

    } catch (error) {
      // Show an error pop-up
      console.error('Registration failed', error.response.data);
      toast.error(error.response.data.message || 'Registration failed');
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
          Register
        </Typography>
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          {...register('fullName', { required: true })}
        />
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
        <TextField
          label="Mobile No (e.g., +919876543210)"
          fullWidth
          margin="normal"
          {...register('mobile', { required: true })}
        />
        <TextField
          label="Gender (M or F)"
          fullWidth
          margin="normal"
          {...register('gender', { required: true })}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default RegisterPage;