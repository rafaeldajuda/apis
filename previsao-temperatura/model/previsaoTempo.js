const dbConnection = require('../infraestrutura/dbConnection');
const appConfig = require('../config/appConfig');

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

}

module.exports = new PrevisaoTempo;