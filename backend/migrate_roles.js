const pool = require('./db');
require('dotenv').config();

async function migrateRoles() {
  try {
    console.log('Migrating role column to VARCHAR...');
    
    // Change column type to VARCHAR to support any role
    await pool.query('ALTER TABLE users MODIFY COLUMN role VARCHAR(50) DEFAULT "user"');
    
    console.log('Column modified successfully.');
    
    // Now fix the roles
    console.log('Fixing empty roles...');
    await pool.query('UPDATE users SET role = "editor" WHERE email = "perez@gmail.com"');
    await pool.query('UPDATE users SET role = "editor" WHERE email = "carlos.perez@gmail.com"');
    await pool.query('UPDATE users SET role = "user" WHERE role = "" OR role IS NULL');
    
    console.log('Roles fixed.');
  } catch (error) {
    console.error('Error migrating roles:', error);
  } finally {
    process.exit();
  }
}

migrateRoles();
