import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="default" sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
          <Button color="inherit" component={RouterLink} to="/" sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'primary.main' }}>
            Joystik
          </Button>
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button color="inherit" component={RouterLink} to="/dashboard" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'primary.light' } }}>Dashboard</Button>
          <Button color="inherit" component={RouterLink} to="/members" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'primary.light' } }}>Members</Button>
          <Button color="inherit" component={RouterLink} to="/events" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'primary.light' } }}>Events</Button>
          <Button color="inherit" component={RouterLink} to="/analytics" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'primary.light' } }}>Analytics</Button>
          <Button color="inherit" component={RouterLink} to="/resources" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'primary.light' } }}>Resources</Button>
          
          {currentUser ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={handleLogout}
                sx={{ ml: 1, mr: 1 }}
              >
                Logout
              </Button>
              <IconButton color="primary">
                <Avatar 
                  alt={currentUser.name} 
                  src={currentUser.avatar} 
                  sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
                />
              </IconButton>
            </Box>
          ) : (
            <Button variant="contained" color="primary" component={RouterLink} to="/login" sx={{ ml: 2 }}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
