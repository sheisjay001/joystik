import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Avatar, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import BarChartIcon from '@mui/icons-material/BarChart';
import FolderIcon from '@mui/icons-material/Folder';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Members', path: '/members', icon: <PeopleIcon /> },
    { text: 'Events', path: '/events', icon: <EventIcon /> },
    { text: 'Analytics', path: '/analytics', icon: <BarChartIcon /> },
    { text: 'Resources', path: '/resources', icon: <FolderIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          Joystik
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path} 
              onClick={handleDrawerToggle}
            >
              <Box sx={{ mr: 2, color: 'text.secondary', display: 'flex' }}>
                {item.icon}
              </Box>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {currentUser ? (
          <>
            <ListItem>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
                <Avatar 
                  alt={currentUser.name} 
                  src={currentUser.avatar} 
                  sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}
                />
                <Typography variant="subtitle1">{currentUser.name}</Typography>
               </Box>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <Box sx={{ mr: 2, color: 'text.secondary', display: 'flex' }}>
                  <LogoutIcon />
                </Box>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/login" onClick={handleDrawerToggle}>
              <Box sx={{ mr: 2, color: 'text.secondary', display: 'flex' }}>
                <LoginIcon />
              </Box>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="default" sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
            <Button color="inherit" component={RouterLink} to="/" sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'primary.main' }}>
              Joystik
            </Button>
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {menuItems.map((item) => (
                <Button 
                  key={item.text}
                  color="inherit" 
                  component={RouterLink} 
                  to={item.path} 
                  sx={{ color: 'text.primary', '&:hover': { color: 'primary.main', bgcolor: 'primary.light' } }}
                >
                  {item.text}
                </Button>
              ))}
              
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
              ) : null}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
