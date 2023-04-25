function log(req, res, next){
    console.log('Logging...')
    next(); //* Le indica a express que llame la sigueinte funcion middleware
            //* o la peticion correspondiente
            //! Si no lo indictamos, express se queda dentro de esta funcion 
};

module.exports = log;