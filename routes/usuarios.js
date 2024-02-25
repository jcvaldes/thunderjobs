const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();
const Usuario = require('../models/Usuario.js');
const { loginUsuario, crearRegistro } = require('../services/serviceUsuarios.js'); // Importar la función de autenticación del servicio de usuarios
const verificarToken = require('../middlewares/verificarToken'); // Importar el middleware

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Llamar a la función para autenticar al usuario
        const token = await loginUsuario(username, password);

        // Enviar el token como respuesta
        res.json({ token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(401).json({ message: error.message }); // Cambiar el estado a 401 si las credenciales son incorrectas
    }
});

// Ruta protegida para obtener el perfil del usuario
router.get('/perfil', verificarToken, async (req, res) => {
    try {
        // Obtener el ID de usuario del token decodificado
        const userId = req.userId;

        // Buscar al usuario en la base de datos por su ID
        const usuario = await Usuario.findById(userId);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devolver la información del usuario en la respuesta
        res.json(usuario);
    } catch (error) {
        console.error('Error en obtener el perfil del usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para crear una nueva solicitud
router.post('/', crearRegistro);


module.exports = router;


