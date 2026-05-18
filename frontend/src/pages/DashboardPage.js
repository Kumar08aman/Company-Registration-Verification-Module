import React from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { useSelector } from 'react-redux'; // Import to get the token
import axios from 'axios';

// Import your components
import CompanyProfileForm from '../components/CompanyProfileForm';
import CompanyProfileDisplay from '../components/CompanyProfileDisplay';

// This function will fetch the data
const fetchCompanyProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.get(
    'http://localhost:5000/api/company/profile',
    config
  );
  return data.data; // Return the profile data
};

function DashboardPage() {
  const token = useSelector((state) => state.auth.token); // Get token from Redux

  // 1. Use React Query to fetch the profile
  const { data, isLoading, error } = useQuery({
    queryKey: ['companyProfile'], // A unique key for this query
    queryFn: () => fetchCompanyProfile(token),
    retry: false, // Don't retry if it fails (e.g., 404)
  });

  // 2. Decide what to render
  const renderContent = () => {
    if (isLoading) {
      // Show a loading spinner while fetching
      return <CircularProgress sx={{ mt: 4 }} />;
    }

    if (error) {
      // If the error is 404 (Not Found), show the create form
      if (error.response && error.response.status === 404) {
        return <CompanyProfileForm />;
      }
      // Otherwise, show a generic error
      return <Alert severity="error">Error fetching profile.</Alert>;
    }

    if (data) {
      // If we have data, show the display component
      return <CompanyProfileDisplay profile={data} />;
    }
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" sx={{ mt: 4, mb: 2 }}>
        Dashboard
      </Typography>
      {renderContent()}
    </Container>
  );
}

export default DashboardPage;