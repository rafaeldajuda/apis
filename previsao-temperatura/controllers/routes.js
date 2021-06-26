const express = require('express');
const appConfig = require('../config/appConfig');
const moment = require('moment');
const httpRequest = require('../controllers/httpRequest');
const PrevisaoTempo = require('../model/previsaoTempo');
const path = require('path');
const pathViews = '/home/rafael/Documentos/Outros/APIs Node/previsao-temperatura/'

module.exports = (app) => {
    app.get('/', (req, res) =>{
        //res.sendFile(path.join(__dirname + '/index.html'));
        //res.sendFile(pathViews + "index.html");
        res.status(200).sendFile(pathViews + "index.html");
    });

    app.get('/tempo', (req, res) =>{
        res.header('Acess-Control-Allow-Origin', '*');
        const startTime = moment().format();
        const endTime = moment().add(5, 'hour').format();

        const urlRequest = appConfig.url + 
            `?location=${appConfig.location}&` +
            `fields=${appConfig.fields}&` +
            `units=${appConfig.units}&` +
            `timezone=${appConfig.timezone}&` +
            `apikey=${appConfig.apikey}&` +
            "timesteps=" + appConfig.timesteps +"&" +
            `startTime=${startTime}&` + 
            `endTime=${endTime}`;

        const metodo = 'GET';
        const body = null;
        const headers = {};

        httpRequest(metodo, urlRequest, body, headers, res,(res, status, response) => {
            if(status == 200){
                PrevisaoTempo.insertPrevisaoTempo(JSON.parse(response));
                res.status(status).json(JSON.parse(response));
            }else{
                res.status(status).json(JSON.parse(response));
            }
        });
    });
}