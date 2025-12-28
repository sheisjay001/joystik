import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{ 
                  color: 'primary.main', 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Welcome to Joystik
              </Typography>
              <Typography 
                variant="h5" 
                color="text.secondary" 
                paragraph
                sx={{ mb: 4, fontWeight: 400 }}
              >
                The professional platform for managing your community, events, and memberships with ease. 
                Streamline your operations and engage your audience effectively.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                justifyContent: { xs: 'center', md: 'flex-start' } 
              }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate('/login')}
                  sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                >
                  Login
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  size="large"
                  startIcon={<PersonAddIcon />}
                  onClick={() => navigate('/register')}
                  sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderWidth: 2 }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
              alt="Community Collaboration"
              sx={{
                width: '100%',
                maxWidth: 600,
                height: 'auto',
                borderRadius: 4,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
