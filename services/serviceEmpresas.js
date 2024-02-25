const Empresa = require('../models/Empresa.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getEmpresas = async (page) => {
    return await Empresa.paginate({}, {page})
}

const loginEmpresa = async (cif, password) => {
    // Buscar el usuario por su correo electrónico
    const empresa = await Empresa.findOne({ cif });

    if (!empresa) {
        throw new Error('Usuario no encontrado');
    }

    // Verificar la contraseña
    const contraseñaValida = bcrypt.compare(password, empresa.password);
    if (!contraseñaValida) {
        throw new Error('Contraseña incorrecta');
    }

    // Generar el token JWT
    const token = jwt.sign({ id: empresa._id }, 'secreto');

    return token;
}

async function crearRegistro(req, res) {
    try {
        const imagenArchivo = req.file;
        console.log(req.file);

        // Extraer los datos del cuerpo de la solicitud
        const { cif, nombre, email, password, descripcion } = req.body;

        // Verificar si el CIF ya está en uso
        const empresaExistenteCIF = await Empresa.findOne({ cif });
        if (empresaExistenteCIF) {
            return res.status(400).json({ message: 'El CIF ya está en uso' });
        }

        // Verificar si el email ya está en uso
        const empresaExistenteEmail = await Empresa.findOne({ email });
        if (empresaExistenteEmail) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }

        // Verificar si el nombre de la empresa ya está en uso
        const empresaExistenteNombre = await Empresa.findOne({ nombre });
        if (empresaExistenteNombre) {
            return res.status(400).json({ message: 'El nombre de la empresa ya está en uso' });
        }

        let nombreArchivo = ''; // Variable para almacenar el nombre del archivo de imagen

        // Si no hay una empresa existente con el mismo CIF, email y nombre, entonces guarda la imagen
        if (!empresaExistenteCIF && !empresaExistenteEmail && !empresaExistenteNombre) {
            // Verificar si se envió una imagen
            if (imagenArchivo) {
                // Modificar el nombre del archivo concatenando el nombre de usuario
                nombreArchivo = imagenArchivo.filename;
            }
        }

        // Crear una nueva instancia de Empresa y establecer la fecha actual
        const nuevaEmpresa = new Empresa({
            cif,
            nombre,
            email,
            password,
            descripcion,
            fecha_registro: new Date(),
            imagen: nombreArchivo // Guardar el nombre de la imagen solo si no existe el usuario
        });

        // Guardar la nueva empresa en la base de datos solo si no existe
        if (!empresaExistenteCIF && !empresaExistenteEmail && !empresaExistenteNombre) {
            await nuevaEmpresa.save();
        }

        res.status(201).json({ message: 'Empresa creada exitosamente', empresa: nuevaEmpresa });
    } catch (error) {
        console.error('Error al crear la empresa:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}




module.exports = {getEmpresas, loginEmpresa, crearRegistro};