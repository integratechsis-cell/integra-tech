# Cómo subir tu proyecto a GitHub

Parece que estás teniendo problemas para subir tu página. Aquí tienes la solución paso a paso.

## ERROR COMÚN: No subas `node_modules`
El error más frecuente es intentar subir la carpeta `node_modules`. Esta carpeta contiene miles de archivos y **NO debe subirse a GitHub**.
- GitHub rechazará la subida si intentas arrastrar esta carpeta.
- Solo necesitas subir tu código fuente (`src`, `public`, `package.json`, etc.).

---

## Opción 1: Usando la Web de GitHub (Sin instalar nada)

1. Ve a [github.com/new](https://github.com/new) y crea un nuevo repositorio.
2. En la página de tu repositorio, haz clic en **"uploading an existing file"**.
3. **IMPORTANTE:** Arrastra SOLAMENTE estas carpetas y archivos:
   - `src` (Carpeta)
   - `public` (Carpeta)
   - `index.html`
   - `package.json`
   - `vite.config.ts`
   - `tsconfig.json` (y otros archivos de configuración tsconfig.*)
   - `tailwind.config.js`
   - `postcss.config.js`
   - `.gitignore`
   - `README.md`
   
   **NO ARRASTRES:** `node_modules` ni `dist`.

4. Escribe un mensaje (ej: "Subida inicial") y dale a **Commit changes**.

---

## Opción 2: Usando Git (Recomendado)

Si tienes Git instalado en tu computadora, abre una terminal en la carpeta del proyecto y ejecuta:

```bash
# 1. Inicializar repositorio (si no lo has hecho)
git init

# 2. Agregar todos los archivos (el .gitignore evitará que se suba node_modules automáticamente)
git add .

# 3. Guardar cambios
git commit -m "Primera versión completa de Integra Tech"

# 4. Conectar con GitHub (Reemplaza URL_DE_TU_REPO con el link de tu repositorio)
git branch -M main
git remote add origin URL_DE_TU_REPO
git push -u origin main
```

## Opción 3: Usando GitHub Desktop

1. Descarga e instala [GitHub Desktop](https://desktop.github.com/).
2. Ve a **File** > **Add Local Repository**.
3. Selecciona la carpeta `D:\PROGRAMAS\Pagina Integra-tech\integra-tech`.
4. Te preguntará si quieres crear un repositorio, dile que sí.
5. Haz clic en **Publish repository** (arriba a la derecha).
6. Asegúrate de desmarcar "Keep this code private" si quieres que sea público (o déjalo marcado si es privado).
7. Dale a **Publish**.

¡Esto subirá tu código correctamente ignorando los archivos pesados innecesarios!
