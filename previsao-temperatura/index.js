const customExpress = require('./config/customExpress');
const appConfig = require('./config/appConfig');
const dbConnection = require('./infraestrutura/dbConnection');
const PrevisaoTabelas = require('./infraestrutura/createTablePrevisaoTabela');

//START DB CONNECTION
dbConnection.connect(erro =>{
    if(erro){
        console.log(erro);
    }else{
        console.log('db connection successful');
        PrevisaoTabelas.init(dbConnection);
        PrevisaoTabelas.createPrevisaoTempo();

        //START SERVER - PORT 3000
        const app = customExpress();
        app.listen(appConfig.port, () =>{
            console.log('SERVER RUN PORT ' + appConfig.port);
        });
    }
})

