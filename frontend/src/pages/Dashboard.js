import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PollIcon from '@mui/icons-material/Poll';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Link as RouterLink } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledIcon = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: '12px', // Softer square shape
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main, // Darker icon color for contrast
  '& svg': {
    fontSize: '2rem',
  },
}));

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL)
    ? process.env.REACT_APP_API_URL
    : (!window.location.port ? `${window.location.protocol}//${window.location.hostname}:5000` : '');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/dashboard`);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        
        
        // Map string icon names back to components
        const mappedData = data.map(item => ({
          ...item,
          icon: getIconComponent(item.icon)
        }));
        
        setStats(mappedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
        // Fallback to initial empty state or mock if needed
      }
    };

    fetchStats();
  }, [API_BASE]);

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'PeopleIcon': return <PeopleIcon />;
      case 'EventIcon': return <EventIcon />;
      case 'PollIcon': return <PollIcon />;
      case 'AnnouncementIcon': return <AnnouncementIcon />;
      default: return <PeopleIcon />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome to your community overview
          </Typography>
        </Box>
        <Button variant="contained" component={RouterLink} to="/events" color="primary">
          Create Event
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Item elevation={1} sx={{ borderLeft: 6, borderColor: 'primary.main' }}>
              <StyledIcon sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                {stat.icon}
              </StyledIcon>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                {stat.value}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                {stat.title}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, mb: 3, textAlign: 'center', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              There is no recent activity to display yet.
            </Typography>
            <Button variant="outlined" component={RouterLink} to="/analytics">
              View Analytics
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
           <Paper sx={{ p: 4, mb: 3, textAlign: 'center', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
              <Button variant="text" fullWidth component={RouterLink} to="/members">Manage Members</Button>
              <Button variant="text" fullWidth component={RouterLink} to="/resources">Upload Resources</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
