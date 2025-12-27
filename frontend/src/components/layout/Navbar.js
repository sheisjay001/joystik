import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={RouterLink} to="/">
            CommunityHub
          </Button>
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/members">Members</Button>
          <Button color="inherit" component={RouterLink} to="/events">Events</Button>
          <Button color="inherit" component={RouterLink} to="/analytics">Analytics</Button>
          <Button color="inherit" component={RouterLink} to="/resources">Resources</Button>
          
          {currentUser ? (
            <IconButton color="inherit">
              <Avatar 
                alt={currentUser.name} 
                src={currentUser.avatar} 
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
