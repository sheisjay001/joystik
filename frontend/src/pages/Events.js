import React, { useState, useEffect } from 'react';
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

const Events = () => {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const API_BASE = (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL)
    ? process.env.REACT_APP_API_URL
    : (!window.location.port ? `${window.location.protocol}//${window.location.hostname}:5000` : '');

  // Fetch events from API
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/events`);
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Server returned non-JSON:', text);
        throw new Error('Received non-JSON response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch events');
      }
      
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = (event = null) => {
    setSelectedEvent(event);
    if (event) {
      setSelectedDate(new Date(event.date));
      // Construct a valid date object for time
      const timeParts = event.time ? event.time.split(':') : ['00', '00'];
      const timeDate = new Date();
      timeDate.setHours(parseInt(timeParts[0]), parseInt(timeParts[1]));
      setSelectedTime(timeDate);
    } else {
      setSelectedDate(new Date());
      setSelectedTime(new Date());
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Construct event object from form data
    const formData = new FormData(event.target);
    const eventData = {
      title: formData.get('title'),
      type: formData.get('type'),
      location: formData.get('location'),
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      capacity: formData.get('capacity'),
      description: formData.get('description'),
      status: 'upcoming' // default
    };

    try {
      const method = selectedEvent ? 'PUT' : 'POST';
      const url = selectedEvent ? `${API_BASE}/api/events/${selectedEvent.id}` : `${API_BASE}/api/events`;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('Server returned non-JSON:', text);
        throw new Error('Server returned non-JSON response');
      }

      if (response.ok) {
        fetchEvents();
        handleCloseDialog();
      } else {
        console.error('Failed to save event:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const filteredEvents = events.filter((event) => {
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
                  name="title"
                  label="Event Title"
                  defaultValue={selectedEvent?.title || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    name="type"
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
                  name="location"
                  label="Location"
                  defaultValue={selectedEvent?.location || ''}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Time"
                    value={selectedTime}
                    onChange={(newValue) => setSelectedTime(newValue)}
                    slotProps={{ textField: { fullWidth: true, required: true } }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="capacity"
                  label="Capacity"
                  type="number"
                  defaultValue={selectedEvent?.capacity || ''}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
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
