const express = require('express');
const routes = require('../controllers/routes');
const cors = require('cors');

module.exports = () => {
    const app = express();

    //ARQUIVOS ESTÁTICOS
    app.use('/view', express.static('view'));
    app.use('/control', express.static('controllers'));
    //app.use('/view/icons', express.static('view/icons'));

    routes(app);
    app.use(cors);
   


    return app;
}