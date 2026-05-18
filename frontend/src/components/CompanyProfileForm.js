import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'; // To get the token

// Import Material UI components
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function CompanyProfileForm() {
  const { register, handleSubmit } = useForm();
  const token = useSelector((state) => state.auth.token); // Get token from Redux

  const onSubmit = async (data) => {
    try {
      // Send the token in the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send data to the backend
      // Note: The fields match your backend (company_name, industry_type)
      const response = await axios.post(
        'http://localhost:5000/api/company/register',
        data,
        config
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error('Profile creation failed', error.response.data);
      toast.error(error.response.data.message || 'Profile creation failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Create Company Profile
        </Typography>
        <TextField
          label="Company Name"
          fullWidth
          margin="normal"
          {...register('company_name', { required: true })}
        />
        <TextField
          label="Industry Type (e.g., Technology)"
          fullWidth
          margin="normal"
          {...register('industry_type', { required: true })}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Save Profile
        </Button>
      </Box>
    </Container>
  );
}

export default CompanyProfileForm;