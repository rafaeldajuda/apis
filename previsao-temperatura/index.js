const customExpress = require('./config/customExpress');
const appConfig = require('./config/appConfig');
const dbConnection = require('./infraestrutura/dbConnection');

//START DB CONNECTION
dbConnection.connect(erro =>{
    if(erro){
        console.log(erro);
    }else{
        console.log('db connection successful');

        //START SERVER - PORT 3000
        const app = customExpress();
        app.listen(appConfig.port, () =>{
            console.log('SERVER RUN PORT ' + appConfig.port);
        });
    }
})

