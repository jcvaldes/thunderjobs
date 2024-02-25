const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const vacanteSchema = new Schema({
  // Definir los campos y tipos de datos
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
  fecha_registro: {
    type: Date,
    default: Date.now
  },
  vacante_id: Number,
  ubicacion: String
});

// Añadimos plugin al schema para poder implementar paginación
vacanteSchema.plugin(mongoosePaginate);

// Compilar el modelo a partir del esquema
const Vacante = model('vacantes', vacanteSchema);

// Exportar el modelo para poder utilizarlo en otros archivos
module.exports = Vacante;