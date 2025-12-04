/**
 * Middleware para verificar JWT en las peticiones entrantes.
 * Extrae el token del header `Authorization` y verifica su validez.
 * Si el token es válido, añade el objeto decodificado a `req.usuario`.
 *
 * @module middlewares/verifiToken
 */
const jwt = require('jsonwebtoken');
const logger = require('../logger');


/**
 * Verifica que la petición incluye un JWT válido y adjunta la carga útil al objeto `req`.
 *
 * - Si no hay header `Authorization`, responde con 401 (no autenticado).
 * - Si no hay token o es inválido, responde con 403 (no autorizado).
 *
 * @param {import('express').Request} req - Objeto de petición de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @param {import('express').NextFunction} next - Función next() de Express.
 * @returns {void}
 */
function verifyToken(req, res, next){
    const authHeader = req.headers.authorization;
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if(!authHeader){
        logger.info('Usuario no autenticado accediendo a: ', req.path);
        return res.status(401).json({Error: 'Usuario no autenticado'}); //No token
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        logger.info(`Usuario no autorizado accediendo a ${req.path}: no se ha recibido token`);
        return res.status(403).json({Error: 'Usuario no autorizado'}); //Token requerido
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err){
            logger.info(`Usuario no autorizado accediendo a ${req.path}: token invalido`);
            return res.status(403).json({Error: 'Usuario no autorizado'}); //Token invalido
        }
        /**
         * Usuario decodificado a partir del JWT. Forma y propiedades dependen del payload usado al crear el token.
         * @type {Object}
         */
        req.usuario = decoded;
        next();
    });
}

module.exports = verifyToken;