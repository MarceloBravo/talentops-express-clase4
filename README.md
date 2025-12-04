### Ejercicio: Extiende la API versionada agregando: 
- autenticación JWT, 
- rate limiting, 
- logging de operaciones, 
- documentación OpenAPI automática, y 
- un sistema de webhooks para notificar cambios en productos.

### -------------------------------------------------------------------

## Puesta en marcha

### Requisitos

- Node.js (v16+ recomendado)
- npm

### Instalación

1. Instalar dependencias:

```powershell
npm install
```

2. Crear un fichero `.env` en la raíz del proyecto con al menos las siguientes variables (ejemplo):

```
PORT=3000
JWT_SECRET_KEY=tu_clave_secreta_aqui
EMAIL_SENDER=tu_correo@ejemplo.com
EMAIL_PASSWORD=tu_contraseña_o_app_password
```

> Nota: Para entornos Windows puedes usar el editor de tu preferencia para crear el `.env`.

### Generar la documentación OpenAPI (swagger)

El proyecto incluye `swagger.js` que genera `swagger.json` leyendo las rutas.

```powershell
node .\swagger.js
```

Esto creará/actualizará `swagger.json` en la raíz del proyecto.

### Ejecutar la aplicación

Iniciar la aplicación en modo desarrollo (según `package.json`):

```powershell
npm run dev
```

La API quedará disponible por defecto en `http://localhost:3000` (según la configuración de `swagger.js` y las variables de entorno).

### Logs

Las entradas de log se escriben en la carpeta `logs/` (archivo `operations.log`). Asegúrate de que la aplicación tenga permisos de escritura en ese directorio.

### Notas

- Asegúrate de configurar correctamente las credenciales del correo si vas a utilizar las notificaciones (webhooks).
- Si necesitas cambiar el puerto, modifica la variable `PORT` en `.env` o la configuración en el archivo principal.

Si quieres, puedo hacer el commit de estos cambios al repositorio ahora.