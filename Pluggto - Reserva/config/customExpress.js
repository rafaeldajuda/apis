const express = require('express');
const consign = require('consign');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = () =>{
    const app = express();

    //SETAR TIPOS DE ENTRADAS
    app.use(bodyParser.json());

    //CORS - BIBLIOTECA QUE PERMITE QUEM PODE OU NAO ACESSAR UM RECURSO
    app.use(cors());
    
    consign()
        .include('controllers')
        .into(app);

    return app;
}

