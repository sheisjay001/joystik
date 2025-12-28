import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Mock User Data
  const [formData, setFormData] = useState({
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@joystik.com',
    bio: 'Community Manager and Enthusiast',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      marketing: false
    }
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSuccessMessage('');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (e) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [e.target.name]: e.target.checked
      }
    });
  };

  const handleSave = () => {
    setSuccessMessage('Settings saved successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your profile, account, and preferences
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeTab}
              onChange={handleTabChange}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab icon={<PersonIcon />} iconPosition="start" label="Profile" sx={{ justifyContent: 'flex-start', minHeight: 60 }} />
              <Tab icon={<AccountCircleIcon />} iconPosition="start" label="Account" sx={{ justifyContent: 'flex-start', minHeight: 60 }} />
              <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notifications" sx={{ justifyContent: 'flex-start', minHeight: 60 }} />
              <Tab icon={<SecurityIcon />} iconPosition="start" label="Security" sx={{ justifyContent: 'flex-start', minHeight: 60 }} />
            </Tabs>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2 }}>
            
            {/* Profile Tab */}
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box sx={{ position: 'relative', mr: 3 }}>
                  <Avatar 
                    sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: 32 }}
                  >
                    {formData.firstName[0]}{formData.lastName[0]}
                  </Avatar>
                  <IconButton 
                    color="primary" 
                    sx={{ 
                      position: 'absolute', 
                      bottom: -8, 
                      right: -8, 
                      bgcolor: 'background.paper',
                      boxShadow: 1,
                      '&:hover': { bgcolor: 'background.paper' }
                    }}
                  >
                    <PhotoCameraIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {formData.firstName} {formData.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formData.email}
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    multiline
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us a little about yourself..."
                  />
                </Grid>
              </Grid>
            </TabPanel>

            {/* Account Tab */}
            <TabPanel value={activeTab} index={1}>
              <Typography variant="h6" gutterBottom>Account Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="error">
                    Delete Account
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>

            {/* Notifications Tab */}
            <TabPanel value={activeTab} index={2}>
              <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={formData.notifications.email} 
                      onChange={handleNotificationChange} 
                      name="email" 
                    />
                  }
                  label="Email Notifications"
                />
                <Divider />
                <FormControlLabel
                  control={
                    <Switch 
                      checked={formData.notifications.push} 
                      onChange={handleNotificationChange} 
                      name="push" 
                    />
                  }
                  label="Push Notifications"
                />
                <Divider />
                <FormControlLabel
                  control={
                    <Switch 
                      checked={formData.notifications.marketing} 
                      onChange={handleNotificationChange} 
                      name="marketing" 
                    />
                  }
                  label="Marketing Emails"
                />
              </Box>
            </TabPanel>

            {/* Security Tab */}
            <TabPanel value={activeTab} index={3}>
              <Typography variant="h6" gutterBottom>Change Password</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
                onClick={handleSave}
                size="large"
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
