const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  console.log('Iniciando configuración de base de datos...');

  const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true // Importante para ejecutar el script completo
  };

  try {
    // 1. Conectar sin seleccionar DB para poder crearla
    const connection = await mysql.createConnection(config);
    console.log('Conectado a MySQL.');

    // 2. Leer archivo schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // 3. Ejecutar script
    console.log('Ejecutando script SQL...');
    await connection.query(schemaSql);

    console.log('✅ Base de datos y tablas creadas exitosamente.');
    console.log('✅ Datos de prueba insertados.');
    
    await connection.end();
  } catch (error) {
    console.error('❌ Error DETALLADO:', error);
    if (error.code === 'ECONNREFUSED') {
        console.error('--> IMPORTANTE: No se puede conectar a MySQL. ¿Está encendido? (Abre XAMPP/WAMP y dale Start a MySQL)');
    }
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('--> IMPORTANTE: Contraseña incorrecta. Revisa el archivo .env');
    }
  }
}

setupDatabase();
