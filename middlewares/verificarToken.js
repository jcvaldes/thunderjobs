const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Leer el token del encabezado de autorización
    const authorizationHeader = req.headers.authorization;

    // Verificar si el encabezado de autorización está presente
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    // Separar el token del prefijo 'Bearer'
    const tokenParts = authorizationHeader.split(' ');

    // Verificar si el token está en el formato correcto
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Formato de token inválido' });
    }

    const token = tokenParts[1];

    // Verificar el token JWT
    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token de autenticación no válido' });
        }
        // Guardar el ID del usuario en el objeto de solicitud para su uso posterior
        req.userId = decoded.id;
        next(); // Llamar a next() para pasar al siguiente middleware o ruta
    });
};

module.exports = verificarToken;

