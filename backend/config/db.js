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

const connectDB = async (retries = 5) => {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('TiDB/MySQL Database Connected Successfully.');
      return;
    } catch (error) {
      console.error(`Unable to connect to the database (Retries left: ${retries - 1}):`, error.message);
      retries -= 1;
      if (retries === 0) {
        console.error('Max retries reached. Running without database connection.');
      } else {
        // Wait for 5 seconds before next retry
        await new Promise(res => setTimeout(res, 5000));
      }
    }
  }
};

module.exports = { sequelize, connectDB };
