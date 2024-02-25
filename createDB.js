// Importa la función de conexión a la base de datos desde mongo.js
const conectarBD = require('./mongo.js');

// Importa los datos y modelos necesarios
const { empresas, vacantes, usuarios, solicitudes } = require('./resources/dataDB.js');
const Empresa = require('./models/Empresa.js');
const Vacante = require('./models/Vacante.js');
const Usuario = require('./models/Usuario.js');
const Solicitud = require('./models/Solicitud.js');

// Función para crear registros en la base de datos
const createdb = async () => {
    try {
        // Elimina todos los documentos de las colecciones
        await Empresa.deleteMany({});
        await Vacante.deleteMany({});
        await Usuario.deleteMany({});
        await Solicitud.deleteMany({});

        // Inserta los datos en las colecciones correspondientes
        await Empresa.insertMany(empresas);
        await Vacante.insertMany(vacantes);
        await Usuario.insertMany(usuarios);
        await Solicitud.insertMany(solicitudes);

        console.log('Registros creados exitosamente en la base de datos');
    } catch (err) {
        console.error('Error al crear registros en la base de datos:', err);
    }
}; 

// Llama a la función de conexión a la base de datos y luego ejecuta la función para crear registros
conectarBD()
    .then(() => {
        console.log('Conexión a la base de datos establecida, creando registros...');
        createdb();
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });
