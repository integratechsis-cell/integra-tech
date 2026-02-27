# Guía de Despliegue Gratuito (Frontend + Backend + MySQL)

Para subir tu página web totalmente funcional y gratis, seguiremos estos pasos usando servicios gratuitos confiables:

*   **Frontend (React)**: Vercel
*   **Backend (Node.js)**: Render
*   **Base de Datos (MySQL)**: Clever Cloud

---

## Paso 1: Subir tu código a GitHub

1.  Crea una cuenta en [GitHub.com](https://github.com) si no tienes una.
2.  Crea un **Nuevo Repositorio** (público o privado).
3.  Sube tu carpeta del proyecto (`integra-tech`) a ese repositorio.
    *   Si usas Git en tu computadora:
        ```bash
        git init
        git add .
        git commit -m "Primer commit"
        git branch -M main
        git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
        git push -u origin main
        ```

---

## Paso 2: Crear la Base de Datos MySQL (Gratis)

Usaremos **Clever Cloud** (no pide tarjeta de crédito para la prueba).

1.  Ve a [Clever Cloud](https://www.clever-cloud.com/) y regístrate con tu cuenta de GitHub.
2.  Haz clic en **"Create an application"** -> **"Create an add-on"**.
3.  Selecciona **"MySQL"**.
4.  Elige el plan **"Dev"** (Gratis/Free).
5.  Dale un nombre (ej: `integra-db`) y selecciona la región (US o EU).
6.  Al finalizar, verás una pantalla con las **Credenciales** (`Host`, `Database Name`, `User`, `Password`, `Port`). **Guárdalas, las necesitarás.**

---

## Paso 3: Desplegar el Backend (Node.js)

Usaremos **Render** (tiene capa gratuita para servicios web).

1.  Ve a [Render.com](https://render.com/) y regístrate con GitHub.
2.  Haz clic en **"New +"** -> **"Web Service"**.
3.  Conecta tu repositorio de GitHub (`integra-tech`).
4.  Configuración:
    *   **Name**: `integra-api` (o lo que quieras)
    *   **Root Directory**: `backend` (¡Importante! Porque tu backend está en esa carpeta)
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node index.js`
    *   **Plan**: Free
5.  **Variables de Entorno (Environment Variables)**:
    Haz clic en "Advanced" o "Environment" y agrega estas variables con los datos de Clever Cloud:
    *   `DB_HOST`: (El host de Clever Cloud)
    *   `DB_USER`: (El usuario de Clever Cloud)
    *   `DB_PASSWORD`: (La contraseña de Clever Cloud)
    *   `DB_NAME`: (El nombre de la base de datos de Clever Cloud)
    *   `PORT`: `3000`
    *   `WOMPI_INTEGRITY_SECRET`: (Tu secreto de Wompi, si lo tienes)
6.  Haz clic en **"Create Web Service"**.
7.  Espera a que termine. Render te dará una URL (ej: `https://integra-api.onrender.com`). **Cópiala.**

---

## Paso 4: Desplegar el Frontend (React)

Usaremos **Vercel** (el mejor para React).

1.  Ve a [Vercel.com](https://vercel.com/) y regístrate con GitHub.
2.  Haz clic en **"Add New..."** -> **"Project"**.
3.  Importa tu repositorio de GitHub (`integra-tech`).
4.  Configuración:
    *   **Framework Preset**: Vite
    *   **Root Directory**: `.` (Déjalo vacío o pon `./` si te pregunta, ya que el frontend está en la raíz).
        *   *Nota*: Si tu frontend está en la raíz del repo, está bien. Si moviste todo a una carpeta, indícalo.
    *   **Environment Variables**:
        *   Nombre: `VITE_API_URL`
        *   Valor: `https://integra-api.onrender.com/api` (La URL de tu backend en Render + `/api`)
5.  Haz clic en **"Deploy"**.

---

## Paso 5: Inicializar la Base de Datos

Una vez que todo esté subido, tu base de datos estará vacía.

1.  Conéctate a tu base de datos de Clever Cloud usando un programa como **MySQL Workbench** o **DBeaver** en tu computadora (usa los mismos datos de Host, User, Password).
2.  Abre el archivo `backend/db_schema.sql` de tu proyecto.
3.  Copia el contenido y ejecútalo en tu programa SQL para crear las tablas (`users`, `products`, etc.).
4.  ¡Listo!

Ahora puedes entrar a la URL que te dio Vercel y tu página estará funcionando en internet.
