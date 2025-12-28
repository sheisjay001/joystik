const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
const Event = require('./models/Event');
const Poll = require('./models/Poll');
const Announcement = require('./models/Announcement');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Sync Database
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database Synced (Tables created/updated).');
  } catch (error) {
    console.error('Failed to sync database:', error.message);
  }
};
syncDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('CommunityHub API is running...');
});

app.get('/api/dashboard', async (req, res) => {
  try {
    // Fetch counts from database
    const memberCount = await User.count();
    const eventCount = await Event.count({ where: { status: 'Upcoming' } });
    const pollCount = await Poll.count({ where: { status: 'Active' } });
    const announcementCount = await Announcement.count();

    const stats = [
      {
        title: 'Total Members',
        value: memberCount.toString(),
        icon: 'PeopleIcon',
        color: 'primary',
      },
      {
        title: 'Upcoming Events',
        value: eventCount.toString(),
        icon: 'EventIcon',
        color: 'primary',
      },
      {
        title: 'Active Polls',
        value: pollCount.toString(),
        icon: 'PollIcon',
        color: 'primary',
      },
      {
        title: 'New Announcements',
        value: announcementCount.toString(),
        icon: 'AnnouncementIcon',
        color: 'primary',
      },
    ];
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    // Fallback to mock data if DB fails
    const stats = [
      { title: 'Total Members', value: '0', icon: 'PeopleIcon', color: 'primary' },
      { title: 'Upcoming Events', value: '0', icon: 'EventIcon', color: 'primary' },
      { title: 'Active Polls', value: '0', icon: 'PollIcon', color: 'primary' },
      { title: 'New Announcements', value: '0', icon: 'AnnouncementIcon', color: 'primary' },
    ];
    res.json(stats);
  }
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
