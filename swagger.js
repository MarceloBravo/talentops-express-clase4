// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Mi API Express',
    description: 'Documentación automática con OpenAPI',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./api-rest-completa-versionada.js']; // archivo principal con las rutas

swaggerAutogen(outputFile, endpointsFiles, doc);