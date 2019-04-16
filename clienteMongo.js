const mongoose = require('mongoose');

const url = 'mongodb://ricardo:abc123@ds239936.mlab.com:39936/montev';

mongoose.connect(
  url,
  { useNewUrlParser: true },
  () => {
    console.log("¡Conexión exitosa con la base de datos!");
  }
);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const productoSchema = Schema({
  producto: ObjectId,
  nombre: String,
  descripccion: String,  
  foto_url: String

});
 // marca: {type: Schema.ObjectId, ref: 'Equipo' },

const vendedorSchema = Schema({
  Vendedor: ObjectId,
  nombres: String,
  rol: String,
  foto_url: String

});



const Vendedor = mongoose.model('Vendedor', vendedorSchema);
const Producto = mongoose.model('Producto', productoSchema);


module.exports = {Vendedor, Producto};