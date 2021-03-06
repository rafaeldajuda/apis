const pluggto = require('../model/Pluggto');

module.exports = (app) => {

    //ROTA TESTE
    app.post('/login', (req, res) =>{
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', "*");
        res.status(200).json({token: "123"});
    });
    
    //GERAR TOKEN
    app.post('/token', (req, res) =>{
        const cliente = req.body;

        if(cliente.idCliente == undefined){
            res.status(400).json({status:400, msg: 'JSON inválido'});
        }else{
            pluggto.pegarDadosCliente(cliente, (callback) =>{
                const clienteBanco = callback;
                pluggto.gerarToken(res, cliente, clienteBanco);
            });    
        }
        
    });

    //PEGAR TOKEN
    app.get('/token/:idCliente', (req, res) =>{
        const idCliente = req.params.idCliente;
        
        pluggto.pegarToken(res, idCliente);
    });

    //RETORNA TODOS OS PRODUTOS
    app.get('/produtos', (req, res) =>{
        const access_token = req.query.access_token;
        
        pluggto.listarProdutos(res, access_token);
    });

    //RETORNA SOMENTE UM PRODUTO
    app.get('/produtos/:sku', (req, res) => {
        const sku = req.params.sku;
        const access_token = req.query.access_token;

        pluggto.pegarProduto(res, sku, access_token);
    });

}