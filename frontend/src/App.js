import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material'; // For nice padding

// Import your pages
import HomePage from './pages/HomePage'; // <-- Import new Home Page
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

// Import Components
import Header from './components/Header'; // <-- Import new Header
import ProtectedRoute from './components/ProtectedRoute';

// Import react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} />
      
      {/* Our new Header will show on every page */}
      <Header />

      {/* Add a Container to add padding to all pages */}
      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} /> {/* <-- New Home Route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
