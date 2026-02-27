# Guía de Migración a MySQL

Has solicitado cambiar la base de datos a MySQL. Aquí tienes los pasos para ponerlo en marcha.

## 1. Configuración del Backend (Servidor)

La carpeta `backend` contiene el servidor que conectará tu página con MySQL.

1.  Abre una terminal en la carpeta `backend`:
    ```bash
    cd backend
    npm install
    ```
2.  Crea un archivo `.env` en la carpeta `backend` con tus credenciales de MySQL:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña_mysql
    DB_NAME=integra_tech
    PORT=3000
    ```

## 2. Configuración de la Base de Datos

1.  Abre tu gestor de MySQL (Workbench, phpMyAdmin, DBeaver, etc.).
2.  Crea una base de datos llamada `integra_tech`.
3.  Ejecuta el script `backend/schema.sql` en esa base de datos.
    -   Este script creará todas las tablas (usuarios, productos, cursos, órdenes).
    -   También insertará datos de prueba (cursos, productos, usuario admin).

## 3. Ejecutar el Proyecto

Necesitas correr **dos terminales** al mismo tiempo:

**Terminal 1 (Backend - API):**
```bash
cd backend
npm start
```
Debe decir: `Servidor MySQL corriendo en puerto 3000`.

**Terminal 2 (Frontend - Página Web):**
```bash
npm run dev
```

## 4. Verificar

1.  Ve a `http://localhost:5173`.
2.  Intenta iniciar sesión con:
    -   Email: `admin@integratech.com`
    -   Password: `admin123`
3.  Si entras correctamente, ¡felicidades! Estás usando MySQL.

## Notas Importantes

-   **Seguridad:** En el archivo `backend/index.js`, las contraseñas se comparan en texto plano para facilitar la migración. En producción, debes descomentar la línea de `bcrypt` para hashearlas.
-   **Imágenes:** Las URLs de las imágenes siguen siendo externas (Unsplash). Si quieres subir imágenes locales, necesitarás configurar una carpeta `uploads` en el backend.
