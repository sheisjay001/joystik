import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PollIcon from '@mui/icons-material/Poll';
import AnnouncementIcon from '@mui/icons-material/Announcement';

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
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  '& svg': {
    fontSize: '2rem',
  },
}));

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Members',
      value: '1,234',
      icon: <PeopleIcon />,
      color: 'primary',
    },
    {
      title: 'Upcoming Events',
      value: '5',
      icon: <EventIcon />,
      color: 'secondary',
    },
    {
      title: 'Active Polls',
      value: '3',
      icon: <PollIcon />,
      color: 'success',
    },
    {
      title: 'New Announcements',
      value: '2',
      icon: <AnnouncementIcon />,
      color: 'warning',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Item elevation={2}>
              <StyledIcon sx={{ bgcolor: `${stat.color}.light` }}>
                {stat.icon}
              </StyledIcon>
              <Typography variant="h5" component="div" gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography color="text.secondary">
              No recent activity to display. Check back later!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                <Typography variant="subtitle2">Create New Poll</Typography>
                <Typography variant="body2" color="text.secondary">Engage your community with a quick poll</Typography>
              </Box>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                <Typography variant="subtitle2">Schedule Event</Typography>
                <Typography variant="body2" color="text.secondary">Plan your next community gathering</Typography>
              </Box>
              <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                <Typography variant="subtitle2">Post Announcement</Typography>
                <Typography variant="body2" color="text.secondary">Share important updates with members</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
