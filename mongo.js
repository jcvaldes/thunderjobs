const mongoose = require('mongoose');

const conectarBD = async () => {
    try {
        const user = 'jonathantanasa7';
        const pwd = '1q2w3e4r';
        const db = 'thunderJobsdb';
        const connectionString = `mongodb+srv://${user}:${pwd}@cluster0.xfhjuuj.mongodb.net/${db}
                                   ?retryWrites=true&w=majority
                                   &useNewUrlParser=true
                                   &useUnifiedTopology=true`;

        await mongoose.connect(connectionString);
        console.log('Conexión exitosa a la base de datos MongoDB');
    } catch (error) {
        console.error('Error de conexión a la base de datos MongoDB:', error);
    }
};

module.exports = conectarBD;

  
