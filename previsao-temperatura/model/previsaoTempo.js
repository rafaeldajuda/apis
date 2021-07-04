const dbConnection = require('../infraestrutura/dbConnection');
const appConfig = require('../config/appConfig');
const { response } = require('express');

class PrevisaoTempo {

    init(){

    }

    //INSERT PREVISAO TEMPO
    insertPrevisaoTempo(tempo) {
        const startDate = tempo.data.timelines[0].startTime;
        const endDate = tempo.data.timelines[0].endTime;

        const lista = tempo.data.timelines[0].intervals;
        for(var i = 0; i < lista.length; i++){
            var temperatureDate = lista[i].startTime;
            var temperature = lista[i].values.temperature;
            var local = appConfig.local;

            var sql = 'INSERT INTO previsaoTempo ' +
                '(startDate, endDate, temperatureDate, temperature, local)' +
                ` VALUES ('${startDate}', '${endDate}', '${temperatureDate}', ${temperature}, '${local}')`;

            dbConnection.query(sql, (error) =>{
                if(error){
                    console.log(error);
                    breakLoop();
                }
            });

            function breakLoop(){
                i = 999;
            }

        }
    }

    selectTemperaturas(res){
        const dataDoAno = new Date();
        const dataInicial = dataDoAno.getUTCFullYear() + "-01-01 00:00:00";
        const dataFinal = dataDoAno.getFullYear() + "-12-31 23:59:59";

        const sql = `SELECT id, DATE_FORMAT(temperatureDate, "%Y-%m-%d %H:%i:%s") AS  temperatureDate, 
            logDate, temperature 
            FROM previsaoTempo 
            WHERE temperatureDate >= '${dataInicial}' AND temperatureDate < '${dataFinal}'
            ORDER BY temperatureDate ASC`;

        dbConnection.query(sql, (error, response) => {
            if(error){
                res.status(400).json(error);
            }else{
                res.status(200).json(response);
            }
        });
    }

}

module.exports = new PrevisaoTempo;