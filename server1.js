const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {Player,Equipo} = require('./clienteMongo.js');
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.user(cors())

app.use(bodyParser.json());



// CRUD PLAYERS LoL

// CREATE
app.post('/api/player', (request, response) => {
    let jsonCliente = request.body;

    
    const nuevoPlayer = Player(jsonCliente);

    nuevoPlayer
        .save((error, player)=>{
            response
                .status(201)
                .send({
                    "menssage": "Jugador creado exitosamente",
                    "body": player,
                    "error": error
                })
        })
});

// READ
app.get('/api/player', (request, response) => {

    Player
    .find()
    .populate('Equipo')
    .exec()
    .then( jsonResultado => {
        response
            .status(200)
            .send({
                "message": "Miembros del equipo exitosa.",
                "body": jsonResultado
        });
    })
    .catch( error => console.log(error));
        
});

// READ
app.get('/api/player/:id', (req, res)=>{
    const playerId = req.params.id;

    Player
        .findById(playerId)
        .populate('')
        .exec()
        .then( player => {
            res.status(200).send(player);
        })
        .catch( error => {
            res.status(404).send(error);
        })
});

// UPDATE
app.put('/api/player/:id', (req, res)=>{
    const playerId = req.params.id;

    Player 
        .findByIdAndUpdate(
            playerId,
            {$set: req.body},
            {new: true}
        )
        .populate('cursos')
        .exec()
        .then( playerActualizado => {
            res.status(200).send(playerActualizado);
        })
        .catch( error => {
            res.status(400).send(`Error: ${error}`);
        });
});

// DELLETE
app.delete('/api/player/:id', (req, res)=>{
    const PlayerId = req.params.id;

    Player
        .findByIdAndRemove(PlayerId)
        .exec()
        .then( resultado => {
            res.status(204).send({
                "message": "Player eliminado exitosamente",
                "body": resultado
            })
        })
        .catch( error => {
            res.status(404).send(error)
        })

});







// -------------- CRUD Cursos --------------

// CREATE  ->  Post One
app.post('/api/team', (request, response) => {
    let json = request.body;

    const equipoNuevo = Equipo(json);

    equipoNuevo
        .save( (error, equipo) => {
            response
                .status(201)
                .send({
                    "menssage": "Curso creado exitosamente",
                    "body": equipo
                });
        })
});

// READ    ->  Get All
app.get('/api/team', (request, response) => {

    Equipo
        .find()
        .exec()
        .then( equipo => {
            response.status(200).send({
                "message": "Lista de cursos obtenida exitosamente",
                "body": equipo
            });
        })
        .catch( error => {
            response.status(404).send(error);
        })
});


// READ    ->  Get One
app.get('/api/team/:id/', (req, res) => {
    const equipoId = req.params.id;

    Equipo
        .findById(equipoId)
        .exec()
        .then( equipo => {
            res
              .status(200)
              .send({
                message: "Curso hallado exitosamente",
                body: equipo
              });
        })
        .catch( error => {
            res.status(404).send(error);
        })
});

// UPDATE  ->  Put One
app.put('/api/team/:id/', (req, res) => {
    const equipoId = req.params.id;

    Equipo
        .findByIdAndUpdate(
            equipoId,
            { $set: req.body },
            { new: true }
        )
        .exec()
        .then(equipoActualizado => {
            res.status(200).send(equipoActualizado);
        })
        .catch(error => {
            res.status(400).send(`Error: ${error}`);
        });
});

// DELLETE ->  Delete One
app.delete('/api/team/:id/', (req, res) => {
    const equipoId = req.params.id;

    Equipo
        .findByIdAndRemove(equipoId)
        .exec()
        .then(resultado => {
            res.status(204).send({
                "message": "Equipo eliminado exitosamente",
                "body": resultado
            })
        })
        .catch(error => {
            res.status(404).send(error)
        })
});







// -------------- Listen & Port --------------



// use port 3000 unless there exists a preconfigured port
const PORT = process.env.port || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

