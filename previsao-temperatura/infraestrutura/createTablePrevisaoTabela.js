class PrevisaoTabelas {
    init(dbConnection){
        console.log("tabelas foram chamadas");
        this.dbConnection = dbConnection;
    }

    createPrevisaoTempo(){
        const sql = "CREATE TABLE IF NOT EXISTS previsaoTempo(" +
            "id INTEGER AUTO_INCREMENT PRIMARY KEY, " +
            "startDate DATETIME NOT NULL, " +
            "endDate DATETIME NOT NULL, " +
            "temperatureDate DATETIME NOT NULL, " +
            "temperature FLOAT(100,2) NOT NULL, " +
            "local VARCHAR(50) NOT NULL, " +
            "logDate DATETIME DEFAULT CURRENT_TIMESTAMP" +
        ")";

        this.dbConnection.query(sql, (error) =>{
            if(error){
                console(error);
            }else{
                console.log("table previsaoTempo created");
            }
        });
    }
}

module.exports = new PrevisaoTabelas;
