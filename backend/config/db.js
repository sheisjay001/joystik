const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.TIDB_DB_NAME || 'communityhub',
  process.env.TIDB_USER || 'root',
  process.env.TIDB_PASSWORD || '',
  {
    host: process.env.TIDB_HOST || '127.0.0.1',
    port: process.env.TIDB_PORT || 4000,
    dialect: 'mysql',
    dialectOptions: {
      ssl: process.env.TIDB_ENABLE_SSL === 'true' ? {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      } : null
    },
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('TiDB/MySQL Database Connected Successfully.');
    
    // Sync models (create tables if they don't exist)
    // await sequelize.sync(); 
    // console.log('Database Synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    // Do not exit process to allow the app to run with mock data if DB fails
    // process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
