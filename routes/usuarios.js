const express = require('express')
const Joi = require('joi')
const ruta = express.Router();

const usuarios = [
    {id:1, nombre:'Juan'},
    {id:2, nombre:'Karen'},
    {id:3, nombre:'Diego'},
    {id:4, nombre:'yo'}
]

ruta.get('/', (req, res) => {
    res.send(usuarios);
});

//* Con los : dlante del id, 
//* Express sabe que es un parametro a recibir en la ruta
ruta.get('/:id', (req, res) => {
    const id = req.params.id;
    let usuario = existeUsuario(id);

    if(!usuario){
        res.status(404).send(`El usuario ${id} no existe!`);
        return;
    }

    res.send(usuario);
    return;
})

//* La peticion POST la vamos a utilizar para insertar un
//* nuevo usuario en nuestro arreglo 
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
        const usuario = {
            id: usuarios.length + 1,
            nombre: req.body.nombre
        };

        usuarios.push(usuario);
        res.send(usuario);
    }
    else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
    return;
});

//* Peticion para modificar datos existentes
//* Este metodo debe recibir un parametro 
//* id para saber que usuario modificar
ruta.put('/:id', (req, res) => {
    let usuario = existeUsuario(req.params.id)

    if(!usuario){
        res.status(404).send('El usuario no existe');
        return;
    }
    
    const {error, value} = validarUsuario(req.body.nombre)
    
    //? Actualiza el nombre
    if(!error){
        usuario.nombre = value.nombre;
        res.send(usuario);
    }
    else{
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
    return;
})

//* Recibe como parametro el id del usuario
//* que se va a eliminar
ruta.delete('/:id', (req, res) => {
    const usuario = existeUsuario(req.params.id);
    if(!usuario){
        res.status(404).send('El usuario no existe')
        return;
    }

    //* encontrar el index del usuario dentro del arreglo
    const index = usuarios.indexOf(usuario);

    usuarios.splice(index, 1); //* Elimina el usuario en el indice 
    res.send(usuario);
    return;
});

function existeUsuario(id){
    return usuarios.find(u => u.id === parseInt(id));
}

function validarUsuario(nom){
    const schema = Joi.object({
        nombre: Joi.string()
                    .min(3)
                    .required()
    })
    return (schema.validate({nombre:nom}))
}


module.exports = ruta; //* se exporta el objeto ruta