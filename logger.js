/**
 * Módulo de logging sencillo que escribe entradas en un archivo JSONL.
 * Proporciona helpers `info` y `error` y un middleware `requestLogger`.
 *
 * Este logger está diseñado para no lanzar errores hacia la aplicación
 * si falla la escritura en disco; en su lugar, imprime en consola el error.
 * @module logger
 */
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, 'operations.log');

/**
 * Escribe una entrada de log en el archivo de logs.
 *
 * @param {'info'|'error'|string} level - Nivel de la entrada (por ejemplo 'info' o 'error').
 * @param {string} message - Mensaje principal del log.
 * @param {Object} [meta] - Información adicional a incluir (opcional).
 * @returns {void}
 */
function write(level, message, meta) {
  try {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      meta: meta || null
    };
    fs.appendFileSync(logFile, JSON.stringify(entry) + '\n');
  } catch (err) {
    // Si falla el logger, no interrumpir la app
    // eslint-disable-next-line no-console
    console.error('Logger error:', err);
  }
}

/**
 * Middleware de Express que registra cada petición cuando finaliza la respuesta.
 * Añade detalles como método, URL, status, duración y información de request.
 *
 * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @param {import('express').NextFunction} next - Función next() de Express.
 */
function requestLogger(req, res, next) {
  const start = Date.now();

  // Esperar al evento finish para obtener el status code y tiempo
  res.on('finish', () => {
    const duration = Date.now() - start;
    // No registrar body completo en GET por tamaño, pero se incluye para POST/PUT/PATCH
    const body = ['POST', 'PUT', 'PATCH'].includes(req.method) ? req.body : undefined;

    write('info', `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`, {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: duration,
      ip: req.ip,
      params: req.params,
      query: req.query,
      body
    });
  });

  next();
}

module.exports = {
  /**
   * Registra una entrada de información.
   * @param {string} message - Mensaje a registrar.
   * @param {Object} [meta] - Metadatos opcionales.
   */
  info: (message, meta) => write('info', message, meta),

  /**
   * Registra una entrada de error.
   * @param {string} message - Mensaje de error.
   * @param {Object} [meta] - Metadatos opcionales.
   */
  error: (message, meta) => write('error', message, meta),

  // Middleware para registrar cada petición y su resultado
  requestLogger
};
