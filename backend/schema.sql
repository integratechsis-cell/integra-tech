-- Base de datos para Integra Tech (MySQL)
-- CREATE DATABASE IF NOT EXISTS integra_tech;
-- USE integra_tech;

-- Usuarios (Combina auth.users y profiles de Supabase)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY, -- UUID generado por el backend
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Hashed password
    full_name VARCHAR(255),
    role ENUM('admin', 'user', 'student') DEFAULT 'user',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Productos (Tienda)
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category ENUM('perifericos', 'suministros', 'hardware', 'software', 'capacitacion') NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image_url TEXT,
    specifications JSON,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cursos (Capacitación)
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    duration VARCHAR(50),
    modality VARCHAR(50),
    level VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Módulos del Curso
CREATE TABLE IF NOT EXISTS course_modules (
    id VARCHAR(36) PRIMARY KEY,
    course_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Inscripciones
CREATE TABLE IF NOT EXISTS enrollments (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    course_id VARCHAR(36) NOT NULL,
    status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
    grade DECIMAL(4, 2),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    UNIQUE KEY unique_enrollment (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Órdenes (Ventas)
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36), -- Puede ser NULL si se borra el usuario
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50),
    shipping_address JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Items de la Orden
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36),
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- DATOS INICIALES (SEED)

-- Admin User (Password: admin123 - Debes hashearlo en producción)
INSERT INTO users (id, email, password, full_name, role) VALUES 
('admin-uuid-1', 'admin@integratech.com', 'admin123', 'Administrador Principal', 'admin')
ON DUPLICATE KEY UPDATE email=email;

-- Cursos Iniciales
INSERT INTO courses (id, title, description, price, level, duration, image_url) VALUES 
('excel-basico', 'Microsoft Excel: Nivel Básico', 'Domina los fundamentos de Excel. Aprende a crear hojas de cálculo, fórmulas simples y formato de celdas.', 50000.00, 'Principiante', '10 horas', 'https://images.unsplash.com/photo-1543966888-7c1dc482a810?auto=format&fit=crop&q=80&w=1000'),
('excel-intermedio', 'Microsoft Excel: Nivel Intermedio', 'Lleva tus habilidades al siguiente nivel. Tablas dinámicas, funciones lógicas y gráficos avanzados.', 80000.00, 'Intermedio', '15 horas', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'),
('excel-avanzado', 'Microsoft Excel: Nivel Avanzado', 'Conviértete en un experto. Macros, VBA, Power Query y análisis de datos complejo.', 100000.00, 'Avanzado', '20 horas', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000')
ON DUPLICATE KEY UPDATE title=title;

-- Módulos de Excel Básico
INSERT INTO course_modules (id, course_id, title, order_index) VALUES
('mod-eb-1', 'excel-basico', 'Introducción a la Interfaz', 1),
('mod-eb-2', 'excel-basico', 'Celdas y Rangos', 2),
('mod-eb-3', 'excel-basico', 'Fórmulas Básicas (SUMA, PROMEDIO)', 3),
('mod-eb-4', 'excel-basico', 'Formato de Celdas y Tablas', 4)
ON DUPLICATE KEY UPDATE title=title;

-- Productos de Hardware (Ejemplos)
INSERT INTO products (id, name, description, price, category, stock, image_url) VALUES
('prod-1', 'BOARD GIGABYTE H610M H', 'Board Gigabyte H610M H DDR4 para procesadores Intel de 12va y 13ra generación.', 416100, 'hardware', 10, 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop'),
('prod-2', 'RAM 8GB BEAST FURY RGB 3200', 'Memoria RAM Kingston Fury Beast RGB 8GB 3200MHz DDR4.', 250800, 'hardware', 20, 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop'),
('prod-3', 'SSD 240 KINGSTON', 'SSD Kingston A400 240GB SATA.', 239400, 'hardware', 15, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop')
ON DUPLICATE KEY UPDATE name=name;
