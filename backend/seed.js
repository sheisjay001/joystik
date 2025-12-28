const { sequelize } = require('./config/db');
const User = require('./models/User');
const Event = require('./models/Event');
const Poll = require('./models/Poll');
const Announcement = require('./models/Announcement');
const dotenv = require('dotenv');

dotenv.config();

const seedData = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database Connected.');

    // Sync database (force: true drops existing tables)
    await sequelize.sync({ force: true });
    console.log('Database Synced. Old data cleared.');

    // Create Users
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123', // Will be hashed by hooks
      role: 'Admin',
      status: 'Active'
    });

    const memberUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'Member',
      status: 'Active'
    });

    console.log('Users created.');

    // Create Events
    await Event.bulkCreate([
      {
        title: 'Community Meetup',
        description: 'Monthly gathering for all community members to network and share ideas.',
        date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        location: 'Community Hall A',
        type: 'Social',
        status: 'Upcoming'
      },
      {
        title: 'Tech Talk: Web Development',
        description: 'A deep dive into the latest web technologies.',
        date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
        location: 'Online (Zoom)',
        type: 'Workshop',
        status: 'Upcoming'
      },
      {
        title: 'Annual Gala',
        description: 'Celebrating our achievements over the past year.',
        date: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        location: 'Grand Hotel Ballroom',
        type: 'Social',
        status: 'Completed'
      }
    ]);
    console.log('Events created.');

    // Create Polls
    await Poll.bulkCreate([
      {
        question: 'What should be the theme for our next hackathon?',
        status: 'Active',
        endDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
      },
      {
        question: 'Best time for weekly meetings?',
        status: 'Closed',
        endDate: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log('Polls created.');

    // Create Announcements
    await Announcement.bulkCreate([
      {
        title: 'Welcome to the New Dashboard!',
        content: 'We are excited to launch our new community dashboard. Explore the new features and let us know what you think.',
        priority: 'High'
      },
      {
        title: 'Maintenance Scheduled',
        content: 'The platform will be undergoing scheduled maintenance on Sunday from 2 AM to 4 AM.',
        priority: 'Medium'
      }
    ]);
    console.log('Announcements created.');

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
