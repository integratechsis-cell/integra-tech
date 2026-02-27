const pool = require('./db');
require('dotenv').config();

async function fixRoles() {
  try {
    console.log('Fixing empty roles...');
    
    // Fix specific users
    const [res1] = await pool.query('UPDATE users SET role = ? WHERE email = ?', ['editor', 'perez@gmail.com']);
    console.log('Updated perez:', res1.affectedRows);
    
    const [res2] = await pool.query('UPDATE users SET role = ? WHERE email = ?', ['editor', 'carlos.perez@gmail.com']);
    console.log('Updated carlos:', res2.affectedRows);
    
    // Fix any other empty roles
    const [res3] = await pool.query('UPDATE users SET role = ? WHERE role IS NULL OR role = ?', ['user', '']);
    console.log('Updated others:', res3.affectedRows);
    
    console.log('Roles fixed.');
  } catch (error) {
    console.error('Error fixing roles:', error);
  } finally {
    process.exit();
  }
}

fixRoles();
