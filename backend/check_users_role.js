const pool = require('./db');
require('dotenv').config();

async function checkUser() {
  try {
    const email = 'carlos.perez@gmail.com';
    console.log(`Checking user with email: ${email}`);
    const [rows] = await pool.query('SELECT * FROM users');
    console.log('All users found:', rows.map(u => `${u.email} (${u.role})`));
  } catch (error) {
    console.error('Error checking user:', error);
  } finally {
    process.exit();
  }
}

checkUser();
