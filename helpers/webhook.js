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



// Simulación de base de datos de suscriptores
const clientes = [
  { id: 1, nombre: "Jian Pérez", email: "mabc@live.cl" },
  { id: 2, nombre: "Pedro Contreras", email: "email@test.cl" }
];

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