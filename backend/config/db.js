const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
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
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      connectTimeout: 5000, // Fail fast (5s) to avoid Vercel timeouts
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false // Always allow self-signed/cloud certs to prevent handshake errors
      }
    },
    logging: false,
  }
);

let isConnected = false;

const ensureDatabase = async () => {
  const host = process.env.TIDB_HOST || '127.0.0.1';
  const port = Number(process.env.TIDB_PORT || 4000);
  const user = process.env.TIDB_USER || 'root';
  const password = process.env.TIDB_PASSWORD || '';
  const dbName = process.env.TIDB_DB_NAME || 'communityhub';

  const conn = await mysql.createConnection({ host, port, user, password });
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await conn.end();
};

const connectDB = async () => {
  if (isConnected) return true;

  // CRITICAL: Prevent connecting to localhost in production (Vercel)
  // This prevents the function from hanging/crashing if env vars are missing.
  if (process.env.NODE_ENV === 'production' && !process.env.TIDB_HOST) {
    console.error('CRITICAL ERROR: TIDB_HOST environment variable is missing in Production.');
    console.error('Cannot connect to database. Aborting connection attempt.');
    return false;
  }

  // In production (Vercel), fail fast to avoid function timeout
  // Enforce a strict 5s timeout race
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('DB_CONNECTION_TIMEOUT')), 4000)
  );

  try {
    // Debug logging
    console.log(`Connecting to DB: ${process.env.TIDB_HOST || 'localhost'} User: ${process.env.TIDB_USER || 'root'}`);
    
    // Race between connection and timeout
    if (process.env.NODE_ENV === 'production') {
       await Promise.race([sequelize.authenticate(), timeoutPromise]);
    } else {
       await sequelize.authenticate();
    }
    
    console.log('TiDB/MySQL Database Connected Successfully.');
    isConnected = true;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    
    // Retry logic only for dev or specific errors if needed, 
    // but for Vercel production we generally want to fail fast and return 503
    // so the frontend handles it rather than timing out.
    if (process.env.NODE_ENV !== 'production') {
        // ... existing retry logic for dev could go here if needed ...
    }
    return false;
  }
};

module.exports = { sequelize, connectDB };
