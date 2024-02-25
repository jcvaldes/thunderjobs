const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const usuarioSchema = new Schema({
  // Definir los campos y tipos de datos
  usuario_id: Number,
  nombre: String,
  email: String,
  password: String,
  username: String,
  fecha_registro: {
    type: Date,
    default: Date.now
  }
});

// Añadimos plugin al schema para poder implementar paginación
usuarioSchema.plugin(mongoosePaginate);

// Compilar el modelo a partir del esquema
const Usuario = model('usuarios', usuarioSchema);

// Exportar el modelo para poder utilizarlo en otros archivos
module.exports = Usuario;