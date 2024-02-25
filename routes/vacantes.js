const { Router } = require('express');
const router = Router();
const { getVacantes, getVacanteById, crearVacante, obtenerVacantesPorEmpresa, cambiarEstatusVacante, modificarVacante } = require('../services/serviceVacantes.js');
const verificarToken = require('../middlewares/verificarToken');

router.get('/', async (req, res) => {
    try {
        const { cifEmpresa, ubicacion, nombreCategoria, palabraClave } = req.query; // Obtener los parámetros de filtro de la consulta
        const filtro = {}; // Objeto para almacenar los filtros

        // Agregar los filtros al objeto
        if (cifEmpresa) {
            filtro.cifEmpresa = cifEmpresa;
        }
        if (ubicacion) {
            filtro.ubicacion = ubicacion;
        }
        if (nombreCategoria) {
            filtro.nombreCategoria = nombreCategoria;
        }

        // Si se proporciona una palabra clave, agregarla al filtro
        if (palabraClave) {
            filtro.palabraClave = palabraClave;
        }

        const vacantes = await getVacantes(filtro); // Llamar a getVacantes con los filtros
        res.json(vacantes);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al obtener las vacantes');
    }
});

// Ruta para obtener una vacante por su ID
router.get('/:id', async (req, res) => {
    try {
        const vacante = await getVacanteById(req.params.id);
        if (!vacante) {
            return res.status(404).json({ message: 'Vacante no encontrada' });
        }
        res.json(vacante);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al obtener la vacante');
    }
});

// Ruta para crear una nueva vacante
router.post('/', verificarToken, crearVacante);

router.get('/empresa/:cif', obtenerVacantesPorEmpresa);

// Ruta para cambiar el estatus de una vacante por su ID
router.patch('/:vacante_id', cambiarEstatusVacante);

router.patch('/modificar/:vacante_id', verificarToken, modificarVacante);


module.exports = router;


