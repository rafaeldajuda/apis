const express = require('express');
const routes = require('../controllers/routes');

module.exports = () => {
    const app = express();

    routes(app);

    return app;
}