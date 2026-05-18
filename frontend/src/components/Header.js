import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../store/authSlice';
import { toast } from 'react-toastify';

function Header() {
  // Get authentication status from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the clearToken action
    dispatch(clearToken());
    toast.success('You have been logged out.');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* App Title */}
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
        >
          Bluestock
        </Typography>

        {/* This Box will hold our conditional buttons */}
        <Box>
          {isAuthenticated ? (
            // --- User is LOGGED IN ---
            <>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/dashboard"
              >
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            // --- User is LOGGED OUT ---
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
