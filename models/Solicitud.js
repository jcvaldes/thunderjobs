const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const solicitudSchema = new Schema({
  // Definir los campos y tipos de datos
  solicitud_id: Number,
  archivo: String,
  comentarios: String,
  fecha: {
    type: Date,
    default: Date.now
  },
  vacante: {
    titulo: String,
    descripcion: String,
    requisitos: String,
    salario: String,
    estatus: String,
    destacado: Number,
    categoria: String,
    empresa: {
      cif: String,
      nombre: String,
      email: String,
      descripcion: String,
      imagen: String
    },
    vacante_id: Number,
    ubicacion: String
  },
  usuario: {
    usuario_id: Number,
    nombre: String,
    email: String,
    username: String
  },
  estado: Number
});

// Añadimos plugin al schema para poder implementar paginación
solicitudSchema.plugin(mongoosePaginate);

// Compilar el modelo a partir del esquema
const Solicitud = model('solicitudes', solicitudSchema);

// Exportar el modelo para poder utilizarlo en otros archivos
module.exports = Solicitud;