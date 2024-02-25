const Usuario = require('../models/Usuario.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUsuario = async (username, password) => {
    // Buscar el usuario por su correo electrónico
    const usuario = await Usuario.findOne({ username });

    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    // Verificar la contraseña
    const contraseñaValida = bcrypt.compare(password, usuario.password);
    if (!contraseñaValida) {
        throw new Error('Contraseña incorrecta');
    }

    // Generar el token JWT
    const token = jwt.sign({ id: usuario._id }, 'secreto');

    return token;
}

async function crearRegistro(req, res) {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { nombre, email, password, username } = req.body;

        // Verificar si el email ya está en uso
        const usuarioExistenteEmail = await Usuario.findOne({ email });
        if (usuarioExistenteEmail) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }

        // Verificar si el username ya está en uso
        const usuarioExistenteUsername = await Usuario.findOne({ username });
        if (usuarioExistenteUsername) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        // Buscar la última solicitud creada en la base de datos
        const ultimoUsuario = await Usuario.findOne().sort({ usuario_id: -1 });

        // Obtener el último usuario_id y sumar uno
        let nuevoUsuarioId = 1;
        if (ultimoUsuario) {
            nuevoUsuarioId = ultimoUsuario.usuario_id + 1;
        }

        // Crear una nueva instancia de Usuario y establecer la fecha actual
        const nuevoUsuario = new Usuario({
            usuario_id: nuevoUsuarioId,
            nombre,
            email,
            password,
            username,
            fecha_registro: new Date(),
        });

        // Guardar el nuevo usuario en la base de datos
        await nuevoUsuario.save();

        res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = { loginUsuario, crearRegistro };

