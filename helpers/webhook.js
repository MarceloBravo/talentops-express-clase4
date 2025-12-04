/**
 * Helper para envío de notificaciones por correo electrónico.
 * Usa `nodemailer` y un transporte configurado por variables de entorno.
 * @module helpers/webhook
 */
const nodemailer = require('nodemailer');
const logger = require('../logger');

/*
// Configuración del transporte SMTP (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SENDER,  // correo configurado en .env
    pass: process.env.EMAIL_PASSWORD // contraseña o App Password configurada en .env
  }
});
*/
// Configuración del transporte SMTP (ejemplo con hotmail)
/**
 * Transporte nodemailer usado para enviar correos.
 * Los valores sensibles deben provenir de variables de entorno:
 * - `EMAIL_SENDER`
 * - `EMAIL_PASSWORD`
 * @type {import('nodemailer').Transporter}
 */
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",   // Servidor SMTP de Outlook/Hotmail
  port: 587,                    // Puerto TLS
  secure: false,                // Debe ser false para STARTTLS
  auth: {
    user: process.env.EMAIL_SENDER,   // correo configurado en .env
    pass: process.env.EMAIL_PASSWORD  // contraseña o App Password configurada en .env
  },
  tls: {
    ciphers: 'SSLv3'
  }
});



// Simulación de base de datos de suscriptores (solo para ejemplo/local)
/**
 * Lista de clientes de ejemplo para envío de pruebas.
 * @type {{id: number, nombre: string, email: string}[]}
 */
const clientes = [
  { id: 1, nombre: "Jian Pérez", email: "mabc@live.cl" },
  { id: 2, nombre: "Pedro Contreras", email: "email@test.cl" }
];

/**
 * Envía una notificación por correo a un cliente.
 *
 * @param {string} evento - Nombre del evento que origina la notificación.
 * @param {string} data - Detalles o cuerpo del mensaje a incluir en el correo.
 * @param {number} clienteId - Índice del cliente en la lista `clientes`.
 * @returns {Promise<void>} Resuelve cuando el envío ha terminado (o maneja el error internamente).
 */
async function notificar(evento, data, clienteId){
    try {
        await transporter.sendMail(
            {
                from: '"Sistema de Productos" <mi_tienda@gmail.com>',
                to: clientes[clienteId].email, // receptor de la notificación
                subject: `Notificación: ${evento}`,
                text: `Se ha producido el evento ${evento}.\n\nDetalles:\n${data}`
            }
        );
        logger.info('Correo enviado correctamente');
    } catch (err) {
        console.log('ERROR DE NOTIFICACION',err);
        logger.info('Error al enviar la notificación al cliente')
    }

}

module.exports = notificar;