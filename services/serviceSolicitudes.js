const fs = require('fs');
const Solicitud = require('../models/Solicitud');
const Vacante = require('../models/Vacante');
const Usuario = require('../models/Usuario');


async function obtenerSolicitudesPorUsuario(req, res) {
  try {
    const usuarioId = req.params.usuario_id;

    // Buscar todas las solicitudes con el usuario_id específico
    const solicitudes = await Solicitud.find({ 'usuario.usuario_id': usuarioId });

    // Devolver las solicitudes encontradas como respuesta
    res.json({ solicitudes });
  } catch (error) {
    console.error('Error al obtener las solicitudes:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function obtenerSolicitudesPorEmpresa(req, res) {
  try {
    const empresaCif = req.params.cif;

    // Buscar todas las solicitudes con el usuario_id específico
    const solicitudes = await Solicitud.find({ 'vacante.empresa.cif': empresaCif });

    // Devolver las solicitudes encontradas como respuesta
    res.json({ solicitudes });
  } catch (error) {
    console.error('Error al obtener las solicitudes:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function crearSolicitud(req, res) {
  try {
    // Lógica para manejar la carga del archivo PDF
    const archivoPDF = req.file; // Suponiendo que multer está configurado para manejar la carga del archivo PDF

    // Extraer los datos del cuerpo de la solicitud
    const { comentarios, vacante_id, usuario_id } = req.body;

    // Buscar la vacante y el usuario en las respectivas colecciones
    const vacante = await Vacante.findOne({ vacante_id: vacante_id });
    const usuario = await Usuario.findOne({ usuario_id: usuario_id });

    // Verificar si se encontraron la vacante y el usuario
    if (!vacante || !usuario) {
      return res.status(404).json({ message: 'Vacante o usuario no encontrados' });
    }

    // Buscar la última solicitud creada en la base de datos
    const ultimaSolicitud = await Solicitud.findOne().sort({ solicitud_id: -1 });

    // Obtener el último solicitud_id y sumar uno
    let nuevaSolicitudId = 1;
    if (ultimaSolicitud) {
      nuevaSolicitudId = ultimaSolicitud.solicitud_id + 1;
    }
    // Modificar el nombre del archivo concatenando el nombre de usuario
    const nombreArchivo = `${archivoPDF.filename}`;

    // Crear una nueva instancia de Solicitud y establecer la fecha actual
    const nuevaSolicitud = new Solicitud({
      solicitud_id: nuevaSolicitudId,
      archivo: nombreArchivo, // Guarda el nombre del archivo PDF modificado en la base de datos
      comentarios,
      fecha: new Date(),
      vacante,
      usuario,
      estado: 0
    });

    // Guardar la nueva solicitud en la base de datos
    await nuevaSolicitud.save();

    res.status(201).json({ message: 'Solicitud creada exitosamente', solicitud: nuevaSolicitud });
  } catch (error) {
    console.error('Error al crear la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function cambiarEstadoSolicitud(req, res) {
  try {
    const solicitudId = parseInt(req.params.solicitud_id);
    const nuevoEstado = req.body.nuevoEstado;

    if (isNaN(solicitudId)) {
      throw new Error('El ID de solicitud no es un número entero válido');
    }

    await Solicitud.findOneAndUpdate({ solicitud_id: solicitudId }, { estado: nuevoEstado });

    if (nuevoEstado === 1) {
      // Obtener la solicitud y la vacante relacionada
      const solicitud = await Solicitud.findOne({ solicitud_id: solicitudId });
      const vacanteId = solicitud.vacante.vacante_id;
      const vacante = await Vacante.findOne({ vacante_id: vacanteId });

      // Actualizar el campo vacante.estatus de la solicitud a "Cubierta"
      solicitud.vacante.estatus = 'Cubierta';
      await solicitud.save();

      // Actualizar el campo estatus de la vacante relacionada a "Cubierta"
      vacante.estatus = 'Cubierta';
      await vacante.save();

      // Actualizar el campo estado de todas las solicitudes relacionadas (excepto la actual) a 4
      await Solicitud.updateMany({ 'vacante.vacante_id': vacanteId, solicitud_id: { $ne: solicitudId } }, { estado: 4 });
    }

    res.status(200).json({ message: 'Estado de solicitud actualizado correctamente' });
  } catch (error) {
    console.error('Error al cambiar el estado de la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}



module.exports = { obtenerSolicitudesPorUsuario, obtenerSolicitudesPorEmpresa, crearSolicitud, cambiarEstadoSolicitud };


