import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  useMediaQuery,
  InputAdornment,
  CardMedia,
  Avatar,
  AvatarGroup,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const eventTypes = [
  { value: 'meetup', label: 'Meetup', color: 'primary' },
  { value: 'workshop', label: 'Workshop', color: 'secondary' },
  { value: 'webinar', label: 'Webinar', color: 'info' },
  { value: 'social', label: 'Social', color: 'warning' },
  { value: 'conference', label: 'Conference', color: 'error' },
];

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: 'Community Meet & Greet',
    type: 'meetup',
    date: '2023-12-15',
    time: '18:00',
    location: 'Community Center',
    description: 'A casual meetup for community members to network and connect.',
    capacity: 50,
    attendees: 32,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'Intro to React Workshop',
    type: 'workshop',
    date: '2023-12-20',
    time: '14:00',
    location: 'Online',
    description: 'Learn the basics of React.js in this hands-on workshop.',
    capacity: 30,
    attendees: 25,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'Year End Party',
    type: 'social',
    date: '2023-12-31',
    time: '20:00',
    location: 'Downtown Venue',
    description: 'Celebrate the end of the year with the community!',
    capacity: 100,
    attendees: 87,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
];

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = (event = null) => {
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    handleCloseDialog();
  };

  const filteredEvents = sampleEvents.filter((event) => {
    const matchesTab = event.status === activeTab;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getEventTypeColor = (type) => {
    const found = eventTypes.find(t => t.value === type);
    return found ? found.color : 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Events
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover and join community gatherings
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2, px: 3, py: 1 }}
        >
          Create Event
        </Button>
      </Box>

      {/* Search and Filter Bar */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          mb: 4, 
          border: 1, 
          borderColor: 'divider', 
          borderRadius: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 2,
          bgcolor: 'grey.50'
        }}
      >
        <TextField
          placeholder="Search events..."
          variant="outlined"
          size="small"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: 'white' }}
        />
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{ 
            flexShrink: 0,
            '& .MuiTab-root': { fontWeight: 'bold' } 
          }}
        >
          <Tab label="Upcoming" value="upcoming" />
          <Tab label="Past" value="past" />
          <Tab label="Draft" value="draft" />
        </Tabs>
        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Filters
        </Button>
      </Paper>

      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={event.image || 'https://source.unsplash.com/random/800x600?event'}
                  alt={event.title}
                />
                <Chip
                  label={eventTypes.find((t) => t.value === event.type)?.label || event.type}
                  size="small"
                  color={getEventTypeColor(event.type)}
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12, 
                    fontWeight: 'bold',
                    boxShadow: 1
                  }}
                />
              </Box>
              
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="caption" color="primary.main" fontWeight="bold">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    }).toUpperCase()} • {event.time}
                  </Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleOpenDialog(event)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="h6" component="h2" gutterBottom fontWeight="bold">
                  {event.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {event.location}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph sx={{ 
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}>
                  {event.description}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 12 } }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  </AvatarGroup>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon color="action" fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="caption" color="text.secondary">
                      {event.attendees}/{event.capacity}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button size="small" variant="outlined" fullWidth startIcon={<ShareIcon />}>
                  Share
                </Button>
                <Button size="small" variant="contained" fullWidth>
                  Register
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Event Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullScreen={isMobile} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{selectedEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Title"
                  defaultValue={selectedEvent?.title || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    label="Event Type"
                    defaultValue={selectedEvent?.type || ''}
                  >
                    {eventTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  defaultValue={selectedEvent?.location || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    defaultValue={selectedEvent ? new Date(selectedEvent.date) : new Date()}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Time"
                    defaultValue={selectedEvent ? new Date(`1970-01-01T${selectedEvent.time}`) : new Date()}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Capacity"
                  type="number"
                  defaultValue={selectedEvent?.capacity || ''}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  defaultValue={selectedEvent?.description || ''}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedEvent ? 'Update' : 'Create'} Event
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Events;
