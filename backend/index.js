const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const pool = require('./db');
const { v4: uuidv4 } = require('uuid'); // Need to install uuid
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet()); // Add security headers
app.use(express.json());

// Helper for errors
const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

const crypto = require('crypto');

// --- WOMPI SIGNATURE ---
app.post('/api/payment/signature', (req, res) => {
  const { reference, amount, currency } = req.body;
  const secret = process.env.WOMPI_INTEGRITY_SECRET ? process.env.WOMPI_INTEGRITY_SECRET.trim() : '';
  
  console.log(`[FIRMA] Solicitud recibida: Ref=${reference}, Amount=${amount}, Currency=${currency}`);

  if (!secret || secret === 'TU_SECRETO_AQUI') {
      console.error("[FIRMA] Error: No hay secreto configurado.");
      return res.json({ signature: null });
  }

  // Wompi Signature Formula: SHA256(Reference + AmountInCents + Currency + Secret)
  // IMPORTANTE: Convertir amount a String para asegurar concatenación correcta
  const chain = reference + String(amount) + currency + secret;
  const signature = crypto.createHash('sha256').update(chain).digest('hex');
  
  console.log(`[FIRMA] Chain: ${reference}${amount}${currency}[SECRET]`);
  console.log(`[FIRMA] Generada: ${signature}`);
  res.json({ signature });
});

// --- AUTH ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });
    
    const user = rows[0];
    // In production: await bcrypt.compare(password, user.password)
    if (password !== user.password) return res.status(401).json({ error: 'Contraseña incorrecta' });
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, session: { access_token: 'fake-jwt-token', user: userWithoutPassword } });
  } catch (err) { handleError(res, err); }
});

app.post('/api/auth/register', async (req, res) => {
  let { email, password, full_name, role } = req.body;
  if (!role) role = 'user'; // Ensure role is never empty
  
  const id = uuidv4();
  try {
    // Check existing
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ error: 'El email ya está registrado' });

    await pool.query(
      'INSERT INTO users (id, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)', 
      [id, email, password, full_name, role]
    );
    
    const newUser = { id, email, full_name, role };
    res.json({ user: newUser, session: { access_token: 'fake-jwt-token', user: newUser } });
  } catch (err) { handleError(res, err); }
});

// --- EMAIL TRANSPORTER ---
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const [users] = await pool.query('SELECT id, full_name FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      // Don't reveal user existence
      return res.json({ message: 'Si el correo existe, se enviarán las instrucciones.' });
    }
    
    const user = users[0];
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour

    await pool.query('UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?', [token, expires, user.id]);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;

    // SEND EMAIL
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: `"Integra Tech" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Recuperación de Contraseña - Integra Tech',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #2563eb; text-align: center;">Recuperación de Contraseña</h2>
              <p>Hola ${user.full_name || 'Usuario'},</p>
              <p>Hemos recibido una solicitud para restablecer tu contraseña en <strong>Integra Tech</strong>.</p>
              <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Restablecer Contraseña</a>
              </div>
              <p>O copia y pega el siguiente enlace en tu navegador:</p>
              <p style="word-break: break-all; color: #6b7280; font-size: 14px;">${resetLink}</p>
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
              <p style="font-size: 12px; color: #9ca3af; text-align: center;">Este enlace expirará en 1 hora. Si no solicitaste este cambio, puedes ignorar este correo.</p>
            </div>
          `,
        });
        console.log(`[EMAIL] Enviado a ${email}`);
      } catch (emailError) {
        console.error('[EMAIL ERROR]', emailError);
        // Don't fail the request, just log error
      }
    } else {
        console.log('---------------------------------------------------');
        console.log(`[EMAIL SIMULADO] Faltan credenciales en .env`);
        console.log(`[EMAIL SIMULADO] Recuperación de contraseña para: ${email}`);
        console.log(`[EMAIL SIMULADO] Link: ${resetLink}`);
        console.log('---------------------------------------------------');
    }

    res.json({ message: 'Si el correo existe, se enviarán las instrucciones.' });
  } catch (err) { handleError(res, err); }
});

app.post('/api/auth/reset-password', async (req, res) => {
  const { token, password } = req.body;
  try {
    const [users] = await pool.query('SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > ?', [token, Date.now()]);
    
    if (users.length === 0) {
      return res.status(400).json({ error: 'El enlace es inválido o ha expirado.' });
    }

    const user = users[0];
    // In production: hash password
    await pool.query('UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?', [password, user.id]);

    res.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (err) { handleError(res, err); }
});

app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, email, full_name, role, is_active, created_at FROM users');
    res.json(rows);
  } catch (err) { handleError(res, err); }
});

app.post('/api/users/:id/toggle-status', async (req, res) => {
  const { is_active } = req.body;
  try {
    await pool.query('UPDATE users SET is_active = ? WHERE id = ?', [is_active, req.params.id]);
    res.json({ success: true });
  } catch (err) { handleError(res, err); }
});

app.post('/api/users/:id/reset-password', async (req, res) => {
  const { password } = req.body;
  try {
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [password, req.params.id]);
    res.json({ success: true });
  } catch (err) { handleError(res, err); }
});

app.post('/api/users/:id/role', async (req, res) => {
  const { role } = req.body;
  try {
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, req.params.id]);
    res.json({ success: true });
  } catch (err) { handleError(res, err); }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    // Soft delete or hard delete? Usually soft delete is safer, but user asked to delete.
    // Let's do soft delete first (deactivate) or hard delete if requested.
    // For "delete personal", usually means removing them.
    // We will hard delete to keep it clean, but handle constraints.
    // OR better: set is_active = false (which is what toggle status does).
    // If they want to DELETE from list, we might need to actually delete row.
    
    // Let's try hard delete but catch FK errors
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (fkError) {
        // If they have orders/etc, maybe just soft delete/ban
        if (fkError.errno === 1451) { // Integrity constraint
             await pool.query('UPDATE users SET is_active = false WHERE id = ?', [req.params.id]);
             return res.json({ success: true, message: 'Usuario desactivado (tiene registros asociados)' });
        }
        throw fkError;
    }
  } catch (err) { handleError(res, err); }
});

// --- PRODUCTS ---
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE is_active = true');
    // Parse JSON specifications if string
    const products = rows.map(p => ({
      ...p,
      specifications: typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications,
      is_promotion: !!p.is_promotion, // Ensure boolean
      discount: p.discount ? Number(p.discount) : 0,
      cost_price: p.cost_price ? Number(p.cost_price) : 0,
      profit_margin: p.profit_margin ? Number(p.profit_margin) : 0
    }));
    res.json(products);
  } catch (err) { handleError(res, err); }
});

app.post('/api/products', async (req, res) => {
  const { name, description, price, category, stock, image_url, specifications, is_promotion, discount, cost_price, profit_margin } = req.body;
  const id = uuidv4();
  try {
    // Check if columns exist (or we just assume they are added to DB). 
    // Since we can't easily run migrations here, we'll try to insert. 
    // If the columns don't exist, this will fail. We should ideally create them.
    // For this environment, we will assume we can run a "create column if not exists" query first or just fail and fix.
    
    // Let's add columns if they don't exist (Quick & Dirty Migration for Dev)
    try {
        await pool.query('ALTER TABLE products ADD COLUMN is_promotion BOOLEAN DEFAULT FALSE');
        await pool.query('ALTER TABLE products ADD COLUMN discount INT DEFAULT 0');
        await pool.query('ALTER TABLE products ADD COLUMN cost_price DECIMAL(10,2) DEFAULT 0');
        await pool.query('ALTER TABLE products ADD COLUMN profit_margin INT DEFAULT 0');
    } catch (e) {
        // Ignore if columns exist
    }

    await pool.query(
      'INSERT INTO products (id, name, description, price, category, stock, image_url, specifications, is_promotion, discount, cost_price, profit_margin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, description, price, category, stock, image_url, JSON.stringify(specifications || {}), is_promotion || false, discount || 0, cost_price || 0, profit_margin || 0]
    );
    res.json({ id, ...req.body });
  } catch (err) { handleError(res, err); }
});

app.put('/api/products/:id', async (req, res) => {
    const { name, description, price, category, stock, image_url, specifications, is_promotion, discount, cost_price, profit_margin } = req.body;
    try {
      await pool.query(
        'UPDATE products SET name=?, description=?, price=?, category=?, stock=?, image_url=?, specifications=?, is_promotion=?, discount=?, cost_price=?, profit_margin=? WHERE id=?',
        [name, description, price, category, stock, image_url, JSON.stringify(specifications || {}), is_promotion, discount, cost_price, profit_margin, req.params.id]
      );
      res.json({ success: true });
    } catch (err) { handleError(res, err); }
  });
  
app.delete('/api/products/:id', async (req, res) => {
    try {
        await pool.query('UPDATE products SET is_active = false WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) { handleError(res, err); }
});

// --- COURSES ---
app.get('/api/courses', async (req, res) => {
  try {
    const [courses] = await pool.query('SELECT * FROM courses WHERE is_active = true');
    // Fetch modules for each course (not efficient but simple)
    for (const course of courses) {
      const [modules] = await pool.query('SELECT * FROM course_modules WHERE course_id = ? ORDER BY order_index', [course.id]);
      course.modules = modules;
    }
    res.json(courses);
  } catch (err) { handleError(res, err); }
});

// --- ORDERS ---
app.get('/api/orders', async (req, res) => {
  try {
    // Basic join to get user info if needed
    // In a real app we'd join shipping address or user table
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    // Fetch items
    for (const order of rows) {
      const [items] = await pool.query(`
        SELECT oi.*, p.name as product_name 
        FROM order_items oi 
        LEFT JOIN products p ON oi.product_id = p.id 
        WHERE oi.order_id = ?`, [order.id]);
      order.items = items;
      order.order_items = items; // Alias for frontend compatibility
      
      // Parse shipping address
      if (typeof order.shipping_address === 'string') {
          order.shipping_address = JSON.parse(order.shipping_address);
      }
    }
    res.json(rows);
  } catch (err) { handleError(res, err); }
});

app.post('/api/orders', async (req, res) => {
  const { user_id, total, items, shipping_address, payment_method } = req.body;
  const connection = await pool.getConnection();
  const orderId = uuidv4();
  
  try {
    await connection.beginTransaction();
    
    await connection.query(
      'INSERT INTO orders (id, user_id, total, status, payment_method, shipping_address) VALUES (?, ?, ?, ?, ?, ?)', 
      [orderId, user_id || null, total, 'paid', payment_method, JSON.stringify(shipping_address)]
    );
    
    for (const item of items) {
      const itemId = uuidv4();
      await connection.query(
        'INSERT INTO order_items (id, order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?, ?)', 
        [itemId, orderId, item.id, item.quantity, item.price]
      );
      
      // Auto-enroll if course
      if (item.category === 'capacitacion' && user_id) {
         // Check if exists
         const [exists] = await connection.query('SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?', [user_id, item.id]);
         if (exists.length === 0) {
             const enrollId = uuidv4();
             await connection.query(
                 'INSERT INTO enrollments (id, user_id, course_id) VALUES (?, ?, ?)', 
                 [enrollId, user_id, item.id]
             );
         }
      }
    }
    
    await connection.commit();
    res.json({ success: true, orderId });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

// --- ENROLLMENTS / GRADES ---
app.post('/api/enrollments', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const id = uuidv4();
    await pool.query('INSERT INTO enrollments (id, user_id, course_id) VALUES (?, ?, ?)', [id, userId, courseId]);
    res.json({ success: true, id });
  } catch (err) { handleError(res, err); }
});

app.delete('/api/enrollments', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    await pool.query('DELETE FROM enrollments WHERE user_id = ? AND course_id = ?', [userId, courseId]);
    res.json({ success: true });
  } catch (err) { handleError(res, err); }
});

app.get('/api/grades', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM enrollments');
    // Map to frontend expected format
    const grades = rows.map(r => ({
        id: r.id,
        userId: r.user_id,
        courseId: r.course_id,
        grade: parseFloat(r.grade || 0),
        status: r.status
    }));
    res.json(grades);
  } catch (err) { handleError(res, err); }
});

const PORT = process.env.PORT || 3000;

// --- MIGRATION HELPER ---
const runMigrations = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Verificando esquema de base de datos...');
    
    // Always run schema.sql if tables don't exist
    // Check if 'users' table exists as a proxy for database initialization
    const [tables] = await connection.query("SHOW TABLES LIKE 'users'");
    if (tables.length === 0) {
        console.log('Tablas no encontradas. Inicializando base de datos desde schema.sql...');
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        // Remove CREATE DATABASE and USE commands that might conflict with cloud provider
        // Also split by ; to run one by one if needed, but multipleStatements=true handles it
        const queries = schema
            .replace(/CREATE DATABASE[\s\S]*?;/g, '')
            .replace(/USE[\s\S]*?;/g, '');
            
        await connection.query(queries);
        console.log('Base de datos inicializada correctamente.');
    }
    
    // Always run column checks, even if tables existed
    // Add columns to products if they don't exist
    const productColumns = [
      'is_promotion BOOLEAN DEFAULT FALSE',
      'discount INT DEFAULT 0',
      'cost_price DECIMAL(10,2) DEFAULT 0',
      'profit_margin INT DEFAULT 0'
    ];

    for (const col of productColumns) {
      try {
        await connection.query(`ALTER TABLE products ADD COLUMN ${col}`);
        console.log(`Columna agregada a products: ${col.split(' ')[0]}`);
      } catch (err) {
        if (err.errno !== 1060) console.error(`Error agregando columna ${col}:`, err.message);
      }
    }

    // Add columns to users if they don't exist
    const userColumns = [
      'reset_token VARCHAR(255)',
      'reset_token_expires BIGINT'
    ];

    for (const col of userColumns) {
      try {
        await connection.query(`ALTER TABLE users ADD COLUMN ${col}`);
        console.log(`Columna agregada a users: ${col.split(' ')[0]}`);
      } catch (err) {
        if (err.errno !== 1060) console.error(`Error agregando columna ${col}:`, err.message);
      }
    }

    connection.release();
    console.log('Verificación de esquema completada.');
  } catch (err) {
    console.error('Error en migraciones:', err);
  }
};

app.listen(PORT, async () => {
  console.log(`Servidor MySQL corriendo en puerto ${PORT}`);
  await runMigrations();
});
