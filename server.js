const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const {Vendedor, Producto} = require('./clienteMongo.js');
const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(bodyParser.json());



// CRUD  Vendedor

// CREATE
app.post('/api/vendedor', (request, response) => {
    let jsonCliente = request.body;

    
    const nuevoVendedor = Vendedor(jsonCliente);

    nuevoVendedor
        .save((error, vendedor)=>{
            response
                .status(201)
                .send({
                    "menssage": "Vendedor creado exitosamente",
                    "body": vendedor,
                    "error": error
                })
        })
       // .catch (error => console.log(error))
});

// READ
app.get('/api/vendedor', (request, response) => {

    Vendedor
    .find()
    .populate('Productos')
    .exec()
    .then( jsonResultado => {
        response
            .status(200)
            .send({
                "message": "Producto eliminado exitosamente",
                "body": jsonResultado 
        });
    })
    .catch( error => console.log(error));
        
});

// READ
app.get('/api/vendedor/:id', (req, res)=>{
    const vendedorId = req.params.id;

    Vendedor
        .findById(vendedorId)
        .populate('Productos')
        .exec()
        .then( vendedor => {
            res.status(200).send(vendedor);
        })
        .catch( error => {
            res.status(404).send(error);
        })
});

// UPDATE
app.put('/api/vendedor/:id', (req, res)=>{
    const vendedorId = req.params.id;

    Vendedor 
        .findByIdAndUpdate(
            vendedorId,
            {$set: req.body},
            {new: true}
        )
        .populate('productos')
        .exec()
        .then( vendedorActualizado => {
            res.status(200).send(vendedorActualizado);
        })
        .catch( error => {
            res.status(400).send(`Error: ${error}`);
        });
});

// DELLETE
app.delete('/api/vendedor/:id', (req, res)=>{
    const VendedorId = req.params.id;

    Vendedor
        .findByIdAndRemove(VendedorId)
        .exec()
        .then( resultado => {
            res.status(204).send({
                "message": "Vendedor eliminado exitosamente",
                "body": resultado
            })
        })
        .catch( error => {
            res.status(404).send(error)
        })

});







// -------------- CRUD Productos --------------

// CREATE  ->  Post One
app.post('/api/productos', (request, response) => {
    let json = request.body;

    const productoNuevo = Producto(json);

    productoNuevo
        .save( (error, producto) => {
            response
                .status(201)
                .send({
                    "menssage": "Producto creado exitosamente",
                    "body": producto
                });
        })
});

// READ    ->  Get All
app.get('/api/productos', (request, response) => {

    Producto
        .find()
        .exec()
        .then( producto => {
            response.status(200).send({
                "message": "Lista de productos obtenida exitosamente",
                "body": producto
            });
        })
        .catch( error => {
            response.status(404).send(error);
        })
});


// READ    ->  Get One
app.get('/api/productos/:id/', (req, res) => {
    const productoId = req.params.id;

    Producto
        .findById(productoId)
        .exec()
        .then( producto => {
            res
              .status(200)
              .send({
                message: "Prodcuto hallado exitosamente",
                body: producto
              });
        })
        .catch( error => {
            res.status(404).send(error);
        })
});

// UPDATE  ->  Put One
app.put('/api/productos/:id/', (req, res) => {
    const productoId = req.params.id;

    Producto
        .findByIdAndUpdate(
            productoId,
            { $set: req.body },
            { new: true }
        )
        .exec()
        .then(productoActualizado => {
            res.status(200).send(productoActualizado);
        })
        .catch(error => {
            res.status(400).send(`Error: ${error}`);
        });
});

// DELLETE ->  Delete One
app.delete('/api/productos/:id/', (req, res) => {
    const productoId = req.params.id;

    Producto
        .findByIdAndRemove(productoId)
        .exec()
        .then(resultado => {
            res.status(204).send({
                "message": "Producto eliminado exitosamente",
                "body": resultado
            })
        })
        .catch(error => {
            res.status(404).send(error)
        })
});







// -------------- Listen & Port --------------



// use port 3000 unless there exists a preconfigured port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} , CRACK!`);
});

