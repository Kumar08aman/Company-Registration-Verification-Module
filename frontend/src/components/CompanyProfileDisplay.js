import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, CardMedia, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query'; // Import query client

function CompanyProfileDisplay({ profile }) {
  const [isEditing, setIsEditing] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient(); // Get the query client

  // Set up the form, pre-filling it with existing profile data
  const { register, handleSubmit } = useForm({
    defaultValues: {
      company_name: profile.company_name,
      industry_type: profile.industry_type,
    },
  });

  // Handle the form submission
  const onEditSubmit = async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      // Call our new PUT endpoint
      const response = await axios.put(
        'http://localhost:5000/api/company/profile',
        data,
        config
      );
      
      toast.success(response.data.message);
      setIsEditing(false); // Close the edit form
      
      // IMPORTANT: This tells React Query to refetch the profile data
      // so the user sees their changes immediately.
      queryClient.invalidateQueries({ queryKey: ['companyProfile'] });

    } catch (error) {
      console.error('Update failed', error.response?.data);
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  // Show the EDIT FORM
  if (isEditing) {
    return (
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5">Edit Profile</Typography>
          <Box component="form" onSubmit={handleSubmit(onEditSubmit)} sx={{ mt: 2 }}>
            <TextField
              label="Company Name"
              fullWidth
              margin="normal"
              {...register('company_name', { required: true })}
            />
            <TextField
              label="Industry Type"
              fullWidth
              margin="normal"
              {...register('industry_type', { required: true })}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2, mr: 1 }}>
              Save Changes
            </Button>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Show the PROFILE DISPLAY
  return (
    <Card sx={{ mt: 4 }}>
      {profile.company_logo_url && (
        <CardMedia
          component="img"
          height="140"
          image={profile.company_logo_url}
          alt="Company Logo"
        />
      )}
      <CardContent>
        <Typography variant="h4" component="h2">
          {profile.company_name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Industry: {profile.industry_type}
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
}

export default CompanyProfileDisplay;
