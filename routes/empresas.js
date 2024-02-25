const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getEmpresas, loginEmpresa, crearRegistro } = require('../services/serviceEmpresas.js');
const Empresa = require('../models/Empresa.js');
const verificarToken = require('../middlewares/verificarToken');


// Configurar multer para la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especificar la carpeta donde se guardarán los archivos subidos
      cb(null, '../uploads/img');
    },
    filename: function (req, file, cb) {
      // Generar un nombre único utilizando la función uuid
      const { v4: uuidv4 } = require('uuid');
      const uniqueFilename = `${uuidv4()}-${file.originalname}`;
      cb(null, uniqueFilename);
    }
  });
  
// Crear el middleware de multer con la configuración
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    const pageN = 1; // Puedes pasar el número de página como quieras
    try {
        const { docs } = await getEmpresas(pageN); // Solo extraer la propiedad docs del resultado
        res.json(docs);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al obtener las empresas');
    }
});

router.post('/login', async (req, res) => {
    const { cif, password } = req.body;

    try {
        // Llamar a la función para autenticar al usuario
        const token = await loginEmpresa(cif, password);

        // Enviar el token como respuesta
        res.json({ token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(401).json({ message: error.message }); // Cambiar el estado a 401 si las credenciales son incorrectas
    }
});

router.get('/perfil', verificarToken, async (req, res) => {
    try {
        // Obtener el ID del usuario del objeto de solicitud
        const empresaId = req.userId;

        // Buscar a la empresa en la base de datos por su ID
        const empresa = await Empresa.findById(empresaId);

        if (!empresa) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }

        // Devolver la información de la empresa en la respuesta
        res.json(empresa);
    } catch (error) {
        console.error('Error en obtener el perfil de la empresa:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para crear una nueva solicitud
router.post('/', upload.single('archivo'), crearRegistro);

module.exports = router;

