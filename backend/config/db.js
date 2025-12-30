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
        rejectUnauthorized: process.env.TIDB_SSL_STRICT === 'true' // Default to false if not specified to avoid CA issues
      } : null
    },
    logging: false,
  }
);

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  // In production (Vercel), fail fast to avoid function timeout
  // In development, retry a few times
  let retries = process.env.NODE_ENV === 'production' ? 1 : 5;
  const delay = 2000; // 2 seconds

  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log('TiDB/MySQL Database Connected Successfully.');
      isConnected = true;
      return true;
    } catch (error) {
      console.error(`Unable to connect to the database (Retries left: ${retries - 1}):`, error.message);
      retries -= 1;
      if (retries === 0) {
        console.error('Max retries reached. Running without database connection.');
        return false;
      } else {
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }
  return false;
};

module.exports = { sequelize, connectDB };
