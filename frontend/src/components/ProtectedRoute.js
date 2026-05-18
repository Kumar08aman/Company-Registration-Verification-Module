import React from 'react';
import { useSelector } from 'react-redux'; // Imports hook to read from Redux
import { Navigate } from 'react-router-dom'; // Imports redirect component

// This component will wrap our protected pages
function ProtectedRoute({ children }) {
  // 1. Get the 'isAuthenticated' state from your authSlice
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    // 2. If user is logged in, show the page they asked for
    return children;
  }

  // 3. If user is not logged in, send them to the /login page
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;