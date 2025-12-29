import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Members from './pages/Members';
import Events from './pages/Events';
import Analytics from './pages/Analytics';
import Resources from './pages/Resources';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';

import PrivateRoute from './components/routing/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D32F2F', // Professional Red
      dark: '#C62828',
      light: '#FFCDD2',
    },
    secondary: {
      main: '#424242', // Dark Grey for balance
      dark: '#212121',
      light: '#616161',
    },
    background: {
      default: '#FAFAFA', // Very light grey, almost white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.01562em',
      color: '#D32F2F',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      letterSpacing: '-0.00833em',
      color: '#424242',
    },
    h4: {
      fontWeight: 600,
      color: '#D32F2F',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // More professional than all-caps
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // Slightly softer corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 22px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 10px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Container maxWidth="xl" sx={{ py: 4 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/members" 
                    element={
                      <PrivateRoute>
                        <Members />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/events" 
                    element={
                      <PrivateRoute>
                        <Events />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/analytics" 
                    element={
                      <PrivateRoute roles={['Admin']}>
                        <Analytics />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/resources" 
                    element={
                      <PrivateRoute>
                        <Resources />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/settings" 
                    element={
                      <PrivateRoute>
                        <Settings />
                      </PrivateRoute>
                    } 
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </Container>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
