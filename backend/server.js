const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('CommunityHub API is running...');
});

app.get('/api/dashboard', (req, res) => {
  // Mock data for dashboard
  const stats = [
    {
      title: 'Total Members',
      value: '1,245',
      icon: 'PeopleIcon',
      color: 'primary',
    },
    {
      title: 'Upcoming Events',
      value: '12',
      icon: 'EventIcon',
      color: 'primary',
    },
    {
      title: 'Active Polls',
      value: '3',
      icon: 'PollIcon',
      color: 'primary',
    },
    {
      title: 'New Announcements',
      value: '5',
      icon: 'AnnouncementIcon',
      color: 'primary',
    },
  ];
  res.json(stats);
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

module.exports = app;
