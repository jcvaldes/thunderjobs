const Vacante = require('../models/Vacante.js');
const Solicitud = require('../models/Solicitud.js');

const getVacantes = async (filtro) => {
    let query = {};

    // Verificar si se proporciona un filtro por cif de empresa
    if (filtro.cifEmpresa) {
        query['empresa.cif'] = filtro.cifEmpresa;
    }

    // Verificar si se proporciona un filtro por ubicación
    if (filtro.ubicacion) {
        query.ubicacion = filtro.ubicacion;
    }

    // Verificar si se proporciona un filtro por nombre de categoría
    if (filtro.nombreCategoria) {
        query['categoria'] = filtro.nombreCategoria;
    }

    // Verificar si se proporciona una palabra clave
    if (filtro.palabraClave) {
        query.$or = [
            { titulo: { $regex: filtro.palabraClave, $options: 'i' } }, // Búsqueda por título (insensible a mayúsculas y minúsculas)
            { descripcion: { $regex: filtro.palabraClave, $options: 'i' } } // Búsqueda por descripción (insensible a mayúsculas y minúsculas)
        ];
    }

    return await Vacante.find(query);
}

const getVacanteById = async (vacanteId) => {
    return await Vacante.findOne({ vacante_id: vacanteId });
}

async function crearVacante(req, res) {
    try {
        // Buscar la última solicitud creada en la base de datos
        const ultimaVacante = await Vacante.findOne().sort({ vacante_id: -1 });

        // Obtener el último solicitud_id y sumar uno
        let nuevaVacanteId = 1;
        if (ultimaVacante) {
            nuevaVacanteId = ultimaVacante.vacante_id + 1;
        }

        // Extraer los datos del cuerpo de la solicitud
        const { titulo, descripcion, requisitos, salario, destacado, categoria, empresa, ubicacion } = req.body;

        // Crear una nueva instancia de Solicitud y establecer la fecha actual
        const nuevaVacante = new Vacante({
            titulo,
            descripcion,
            requisitos,
            salario,
            estatus: "CREADA",
            destacado,
            categoria,
            empresa,
            fecha_registro: new Date(),
            vacante_id: nuevaVacanteId,
            ubicacion
        });

        // Guardar la nueva solicitud en la base de datos
        await nuevaVacante.save();

        res.status(201).json({ message: 'Solicitud creada exitosamente', vacante: nuevaVacante });
    } catch (error) {
        console.error('Error al crear la solicitud:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function obtenerVacantesPorEmpresa(req, res) {
    try {
      const empresaCif = req.params.cif;
      
      // Buscar todas las solicitudes con el usuario_id específico
      const vacantes = await Vacante.find({ 'empresa.cif': empresaCif });
  
      // Devolver las solicitudes encontradas como respuesta
      res.json({ vacantes });
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async function cambiarEstatusVacante(req, res) {
    const { vacante_id } = req.params;

    try {
        // Encontrar la vacante por su ID y actualizar el estatus
        const vacante = await Vacante.findOneAndUpdate({ vacante_id }, { estatus: 'CANCELADA' }, { new: true });

        if (!vacante) {
            return res.status(404).json({ message: 'Vacante no encontrada' });
        }

        // Actualizar las solicitudes asociadas a la vacante
        await Solicitud.updateMany({ 'vacante.vacante_id': vacante_id }, { $set: { 'vacante.estatus': 'CANCELADA', estado: 3 } });

        res.json({ message: 'Estatus de vacante y solicitudes actualizados correctamente', vacante });
    } catch (error) {
        console.error('Error al cambiar el estatus de la vacante y las solicitudes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function modificarVacante(req, res) {
    const { vacante_id } = req.params;
    const { titulo, descripcion, requisitos, categoria, ubicacion, salario, destacado } = req.body;

    try {
        // Construir el objeto con los campos a actualizar
        const camposActualizados = {};
        if (titulo) camposActualizados.titulo = titulo;
        if (descripcion) camposActualizados.descripcion = descripcion;
        if (requisitos) camposActualizados.requisitos = requisitos;
        if (categoria) camposActualizados.categoria = categoria;
        if (ubicacion) camposActualizados.ubicacion = ubicacion;
        if (salario) camposActualizados.salario = salario;
        if (destacado) camposActualizados.destacado = destacado;

        // Buscar y actualizar la vacante por su vacante_id
        const vacanteActualizada = await Vacante.findOneAndUpdate({ vacante_id }, camposActualizados, { new: true });

        if (!vacanteActualizada) {
            return res.status(404).json({ message: 'Vacante no encontrada' });
        }

        res.json({ message: 'Vacante actualizada correctamente', vacante: vacanteActualizada });
    } catch (error) {
        console.error('Error al modificar la vacante:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = { getVacantes, getVacanteById, crearVacante, obtenerVacantesPorEmpresa, cambiarEstatusVacante, modificarVacante };


