const inicioDebug = require('debug')('app:inicio') //* Importa el paquete debug
                                    //* El parametro indica el archivo y el entorno
                                    //* de depuracion
const dbDebug = require('debug')('app:db')

const usuarios = require('./routes/usuarios')
const productos = require('./routes/productos')

const express = require('express'); //* Importa el paquete express
const config = require('config');
const morgan = require('morgan');
const Joi = require('joi');
const app = express();
const logger = require('./logger');

// app.get() //* Consulta
// app.post()//* Envio de datos al servidor
// app.put() //* Actualizacion
// app.delete()//* Eliminacion

app.use(express.json()); //* Le decimos a Express que use este middleware
app.use(express.urlencoded({extended:true}));//* Nuevo middleware
                                            //* Define el uso de la libreria qs
                                            //* para separar la informacion codificada
                                            //* en el url
app.use(express.static('public')); //* Nombre de la carpeta que tendra los recursos estaticos

app.use('/api/usuarios', usuarios); //* Middleware que importamos
app.use('/api/productos', productos); //* Middleware que importamos

//? El primer parametro es la ruta raiz asociada
//? con las peticiones a los datos de usuaiors
//* La ruta raiz 


console.log(`Aplicacion: ${config.get('nombre')}`);
console.log(`BD Server: ${config.get('configDB.host')}`);

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    // console.log('Morgan habilitado..') //* Morgan marca en la consola los detalles de las peticiones 

    //* Muestra el mensaje de depuracion
    inicioDebug('Morgan esta habilitado')
}

dbDebug('Conectando con la base de datos ... ')

//! Los 3 app.use son middleware y se llaman antes de
//! las funciones de ruta GET, POST, PUT, DELETE
//! para que estas puedan trabajar

//? Consulta en la ruta raiz del sitio
//* Toda peticion siempre va a recibir dos parametros (objetos)
//* req: la informacion que recibe el servidor desde el cliente
//* res: la informacion que el servidor va a responder al cliente
app.get('/', (req, res) => {
    res.send('Hola mundo desde Express!')
});

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

// app.get('/api/productos', (req, res) => {
//     res.send(['mouse', 'teclado', 'monitor'])
// });

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

//? Funciones middleware
//* El middleare es un bloque de codigo que se ejecuta
//* entre las peticiones del usuario (request) y la peticion 
//* que llega al servidor. Es un enlace entre la peticion 
//* del usuario y el servidor, antes de que este pueda dar
//* una respuesta

//* Las funciones middleware son funciones que tienen acceso
//* al objeto de solicitud (req), al objeto de respuesta(res)
//* y a la siguiente funcion de middleware en el ciclo de
//* solicitud/respuestas de la aplicacion. La siguiente
//* funcion de middleware se denota normalmente como una
//* variable denominada next.

//* Las funciones de middlware pueden realizar las siguientes
//* tareas: 
//*     -   Ejecutar cualquier codigo
//*     -   Realizar cambio en la solicitud y los objetos de respuesta
//*     -   Finalizar el ciclo de solicitud/respuesta
//*     -   Invoca la siguiente funcion de middleware en la pila

//* Express es un framework de direccionamiento y uso de middleware
//* que permite que la aplicacion tenga funcionalidad minima propia.

//* Ya hemos utilizado algunos middlware como son express.json()
//* que transforma el body del req a formato JSON 

//*           ---------------------------
//* Request --|--> json() --> route() --|--> response
//*           ---------------------------

//? route() --> Funcion GET, POST, PUT, DELETE

//* Una aplicacion Express puede utilizar los siguientes
//* tipos de middleware
//*     -   Middleware de nivel de aplicacion
//*     -   Middleware de nivel de direccionador
//*     -   Middleware de manejo de errores
//*     -   Middleware incorporado
//*     -   Middleware de terceros




//? Recursos estaticos
//* Los recursos estaticos hacen referencia a archivos, 
//* imagenes, documentos que se ubican en el servidor.
//* Vamos a usar un middleware para poder acceder a esos recursos