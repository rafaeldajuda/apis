const customExpress = require('./config/customExpress');
const conexaoBanco = require('./infraestrutura/conexaoBanco');
const tabelas = require('./infraestrutura/Tabelas');

conexaoBanco.connect(erro => {
    if(erro){
        console.log(erro);
    }else{
        console.log('Conectado ao banco com sucesso');
        tabelas.init(conexaoBanco);

        //INICIAR SERVIDOR
        const app = customExpress();
        app.listen(3000, () =>{
            console.log("SERVIDOR OK - PORTA 3000");
        });

        app.get('/', (req, res) =>{
            res.send("OK");
        });
    }
});
