const mysql = require('mysql2/promise');
require('dotenv').config();

async function updatePrices() {
  console.log('Iniciando actualización de precios a COP...');

  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };

  try {
    const connection = await mysql.createConnection(config);
    console.log('Conectado a MySQL.');

    // Update Courses
    await connection.query("UPDATE courses SET price = 50000.00 WHERE id = 'excel-basico'");
    await connection.query("UPDATE courses SET price = 80000.00 WHERE id = 'excel-intermedio'");
    await connection.query("UPDATE courses SET price = 100000.00 WHERE id = 'excel-avanzado'");
    
    // Update Products (Examples)
    await connection.query("UPDATE products SET price = 416100.00 WHERE id = 'prod-1'");
    await connection.query("UPDATE products SET price = 250800.00 WHERE id = 'prod-2'");
    await connection.query("UPDATE products SET price = 239400.00 WHERE id = 'prod-3'");

    console.log('✅ Precios actualizados correctamente a Pesos Colombianos.');
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error actualizando precios:', error.message);
  }
}

updatePrices();
