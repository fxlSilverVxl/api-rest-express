const express = require('express'); //* Importa el paquete express
const app = express();

const usuarios = [
    {id:1, nombre:'Juan'},
    {id:2, nombre:'Karen'},
    {id:3, nombre:'Diego'},
    {id:4, nombre:'yo'}
]

// app.get() //* Consulta
// app.post()//* Envio de datos al servidor
// app.put() //* Actualizacion
// app.delete()//* Eliminacion

app.use(express.json()); //* Le decimos a Express que use este middleware

//? Consulta en la ruta raiz del sitio
//* Toda peticion siempre va a recibir dos parametros (objetos)
//* req: la informacion que recibe el servidor desde el cliente
//* res: la informacion que el servidor va a responder al cliente
app.get('/', (req, res) => {
    res.send('Hola mundo desde Express!')
});

app.get('/api/usuarios', (req, res) => {
    res.send(['Jorge', 'Ana', 'Karen', 'Luis']);
});

//* Con los : dlante del id, 
//* Express sabe que es un parametro a recibir en la ruta
app.get('/api/usuarios/:id', (req, res) => {
    //* En el cuerpo del objeto req esta la propiedad params 
    //* que guarda los parametros enviados
    //? Los parametros en req.params se reciben como strings
    //* parseInt, hace el casteo a valores enteros directamente
    const id = parseInt(req.params.id);
    //* Devuelve el primer usuario que cumpla con el predicado
    const usuario = usuarios.find(u => u.id === id);

    if(!usuario)
        res.status(404).send(`El usuario ${id} no existe!`);

    res.send(usuario);
})

//? Recibiendo varios parametros
//* Se pasan los parametros year y month 

//? Query strinn
//* localhost:5000/api/usuarios/1990/2/?nombre=xxx&single=y
app.get('/api/usuarios/:year/:month', (req, res) => {
    //* En el cuerpo de req esta la propiedad 
    //* query, que guarda los parametros Query string
    res.send(req.query);
});

//* La ruta tiene el mismo nombre que la peticion GET
//* Express hace la diferencia dependiendo del tipo de peticion

//* La peticion POST la vamos a utilizar para insertar un
//* nuevo usuario en nuestro arreglo 
app.post('/api/usuarios', (req, res) => {
    //* El objeto request tiene la propiedad body 
    //* que va a venir en formato JSON 

    //* Revisa que este pasando el parametro correcto 
    if(!req.body.nombre){
        res.status(400);
    };

    const usuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    };

    usuarios.push(usuario);
    res.send(usuario);
});

app.get('/api/productos', (req, res) => {
    res.send(['mouse', 'teclado', 'monitor'])
});

//! Indispensable 
//* El modulo process contiene informacion del sistema
//* El objeto env contiene informacion de las variables 
//* de entorno.

//* Si la variable port no existe, que tome un valor
//* Fijo definido por nosotros (3000)
const port = process.env.PORT || 3000; 

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}...`)
})