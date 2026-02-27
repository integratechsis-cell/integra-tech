const pool = require('./db');
require('dotenv').config();

async function checkSchema() {
  try {
    const [rows] = await pool.query('DESCRIBE users');
    console.log(rows);
  } catch (error) {
    console.error('Error checking schema:', error);
  } finally {
    process.exit();
  }
}

checkSchema();
