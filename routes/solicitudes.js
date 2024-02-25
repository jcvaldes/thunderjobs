const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Solicitud = require('../models/Solicitud');
const { obtenerSolicitudesPorUsuario, obtenerSolicitudesPorEmpresa, crearSolicitud, cambiarEstadoSolicitud } = require('../services/serviceSolicitudes');
const verificarToken = require('../middlewares/verificarToken');

// Configurar multer para la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especificar la carpeta donde se guardarán los archivos subidos
    cb(null, '../uploads/pdf');
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

// Ruta para descargar un archivo de solicitud
router.get('/descargar/:solicitud_id', async (req, res) => {
  try {
    // Obtener el solicitud_id de los parámetros de la solicitud
    const solicitudId = req.params.solicitud_id;

    // Buscar la solicitud en la base de datos
    const solicitud = await Solicitud.findOne({ solicitud_id: solicitudId });

    // Verificar si se encontró la solicitud
    if (!solicitud) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    // Obtener el nombre del archivo de la solicitud
    const nombreArchivo = solicitud.archivo;

    // Ruta completa del archivo en el servidor
    const rutaArchivo = path.join(__dirname, '../../uploads/pdf', nombreArchivo);


    // Verificar si el archivo existe
    if (!fs.existsSync(rutaArchivo)) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }

    // Descargar el archivo al cliente
    res.download(rutaArchivo, nombreArchivo);
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener solicitudes por usuario_id
router.get('/usuario/:usuario_id', verificarToken, obtenerSolicitudesPorUsuario);

router.get('/empresa/:cif', obtenerSolicitudesPorEmpresa);

// Ruta para crear una nueva solicitud
router.post('/', verificarToken, upload.single('archivo'), crearSolicitud);

router.patch('/estado/:solicitud_id', verificarToken, cambiarEstadoSolicitud);

module.exports = router;


