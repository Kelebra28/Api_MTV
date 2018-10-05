const mongoose = require('mongoose');

const url = 'mongodb://kelebra28:abcd1234@ds121373.mlab.com:21373/loldex';

mongoose.connect(
  url,
  { useNewUrlParser: true },
  () => {
    console.log("¡Conexión exitosa con la base de datos!");
  }
);

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const equipoSchema = Schema({
  equipo: ObjectId,
  nombres: String,
  
  foto_url: String

});


const playerSchema = Schema({
  player: ObjectId,
  nombres: String,
  equipo: {type: Schema.ObjectId, ref: 'Equipo' },
  edad: {type: Number},
  sexo: String,
  rol: String,
  campeones: String,
  mundiales: {type: Number},
  foto_url: String

});



const Player = mongoose.model('Player', playerSchema);
const Equipo = mongoose.model('Equipo', equipoSchema);


module.exports = {Player,Equipo};