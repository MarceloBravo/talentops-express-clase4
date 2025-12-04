/**
 * Configuración y generación automática de la documentación OpenAPI (Swagger).
 * Este archivo usa `swagger-autogen` para generar `swagger.json` a partir
 * de las rutas definidas en el archivo principal de la aplicación.
 *
 * No exporta nada; al requerirlo o ejecutarlo generará el archivo `swagger.json`.
 *
 * @module swagger
 */
const swaggerAutogen = require('swagger-autogen')();

/**
 * Documento base con metadatos de la API utilizado por swagger-autogen.
 * @type {{info: {title: string, description: string, version: string}, host: string, schemes: string[]}}
 */
const doc = {
  info: {
    title: 'Mi API Express',
    description: 'Documentación automática con OpenAPI',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

/**
 * Archivo de salida donde se escribirá la especificación OpenAPI generada.
 * @type {string}
 */
const outputFile = './swagger.json';

/**
 * Archivos que contienen las rutas/endpoints a escanear por swagger-autogen.
 * @type {string[]}
 */
const endpointsFiles = ['./api-rest-completa-versionada.js']; // archivo principal con las rutas

// Generación automática del JSON de Swagger (no es asíncrono por defecto)
swaggerAutogen(outputFile, endpointsFiles, doc);