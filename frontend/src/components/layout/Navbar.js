import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useAuth();

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
          <Button color="inherit" component={RouterLink} to="/members" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'primary.light' } }}>Members</Button>
          <Button color="inherit" component={RouterLink} to="/events" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'primary.light' } }}>Events</Button>
          <Button color="inherit" component={RouterLink} to="/analytics" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'primary.light' } }}>Analytics</Button>
          <Button color="inherit" component={RouterLink} to="/resources" sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'primary.light' } }}>Resources</Button>
          
          {currentUser ? (
            <IconButton color="primary" sx={{ ml: 1 }}>
              <Avatar 
                alt={currentUser.name} 
                src={currentUser.avatar} 
                sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
              />
            </IconButton>
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
