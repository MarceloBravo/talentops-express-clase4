const jwt = require('jsonwebtoken');


function verifyToken(req, res, next){
    const authHeader = req.headers.authorization;
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if(!authHeader){
        return res.status(401).json({Error: 'Usuario no autenticado'}); //No token
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(403).json({Error: 'Usuario no autorizado'}); //Token requerido
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(403).json({Error: 'Usuario no autorizado'}); //Token invalido
        }
        req.usuario = decoded;
        next();
    });
}

module.exports = verifyToken;