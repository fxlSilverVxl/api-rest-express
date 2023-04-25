const express = require('express')
const Joi = require('joi')
const ruta = express.Router();

const productos = [
    {id:1, nombre:'Raton'},
    {id:2, nombre:'Teclado inhalambrico'},
    {id:3, nombre:'monitor si'},
    {id:4, nombre:'cable HDMI'}
]

ruta.get('/', (req, res) => {
    res.send(productos)
    return;
})

ruta.get('/:id', (req, res) => {
    const id = req.params.id;
    let producto = existeProducto(id);

    if(!producto){
        res.status(404).send(`El producto ${id} no existe!`);
        return;
    }

    res.send(producto);
    return;
})

ruta.post('/', (req, res) => {
    //* El objeto request tiene la propiedad body 
    //* que va a venir en formato JSON 

    //? Creacion del schema con Joi
    const schema = Joi.object({
        nombre: Joi.string()
                    .min(3)
                    .required()
    });
    const {error, value} = schema.validate({nombre: req.body.nombre});

    if(!error) {
        const producto = {
            id: productos.length + 1,
            nombre: req.body.nombre
        };

        productos.push(producto);
        res.send(producto);
    }
    else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
    return;
});

ruta.put('/:id', (req, res) => {
    let producto = existeProducto(req.params.id)

    if(!producto){
        res.status(404).send(`El producto ${req.params.id} no existe`);
        return;
    }
    
    const {error, value} = validarProducto(req.body.nombre)
    
    //? Actualiza el nombre
    if(!error){
        producto.nombre = value.nombre;
        res.send(producto);
    }
    else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
    return;
})

ruta.delete('/:id', (req, res) => {
    const producto = existeProducto(req.params.id);
    if(!producto){
        res.status(404).send('El producto no existe')
        return;
    }

    //* encontrar el index del producto dentro del arreglo
    const index = productos.indexOf(producto);

    productos.splice(index, 1); //* Elimina el producto en el indice 
    res.send(producto);
    return;
});

function existeProducto(id){
    return productos.find(u => u.id === parseInt(id));
}

function validarProducto(nom){
    const schema = Joi.object({
        nombre: Joi.string()
                    .min(3)
                    .required()
    })
    return (schema.validate({nombre:nom}))
}

module.exports = ruta;