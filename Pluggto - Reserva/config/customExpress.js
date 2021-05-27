const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = () =>{
    const app = express();

    //SETAR TIPOS DE ENTRADAS
    app.use(bodyParser.json());
    
    consign()
        .include('controllers')
        .into(app);

    return app;
}

