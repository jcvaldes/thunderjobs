const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const empresaSchema = new Schema({
  // Definir los campos y tipos de datos
  cif: String,
  nombre: String,
  email: String,
  password: String,
  descripcion: String,
  fecha_registro: {
    type: Date,
    default: Date.now
  },
  imagen: String
});

// Añadimos plugin al schema para poder implementar paginación
empresaSchema.plugin(mongoosePaginate);

// Compilar el modelo a partir del esquema
const Empresa = model('empresas', empresaSchema);

// Exportar el modelo para poder utilizarlo en otros archivos
module.exports = Empresa;