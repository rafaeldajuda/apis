const conexao = require('../infraestrutura/conexaoBanco');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

class Pluggto{

    gerarToken(res, cliente){
        //PEGAR DADOS CLIENTE
        var sql = 'SELECT client_id, client_secret, username, password FROM tokenPluggto WHERE id = ' + cliente.idCliente;
        var clienteBanco = {};
        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                console.log(erro);
            }else{
                if(resultados.length == 0){
                    res.status(400).json({status:400, msg: 'cliente nao existe'});
                    return;
                }else{
                    clienteBanco.client_id = resultados[0].client_id;
                    clienteBanco.client_secret = resultados[0].client_secret;
                    clienteBanco.username = resultados[0].username;
                    clienteBanco.password = resultados[0].password;
                    

                    const client_id = clienteBanco.client_id;
                    const client_secret = clienteBanco.client_secret;
                    const username = clienteBanco.username;
                    const password = clienteBanco.password;

                    const urlToken = 'https://api.plugg.to/oauth/token';
                    const metodo = 'POST';
                    const corpo = `grant_type=password&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${password}`;
                    const header = 'application/x-www-form-urlencoded';

                    const respostaPluggto = enviarRequisicao(metodo, urlToken, corpo, header);
                
                    //FAZER UPDATE NO BANCO
                    if(respostaPluggto.status == 200){
                        this.salvarToken(respostaPluggto.resultado.access_token, respostaPluggto.resultado.refresh_token, cliente.idCliente);
                    }
                    
                    res.status(respostaPluggto.status).json(respostaPluggto);
                }
            }
        });

    }

    salvarToken(access_token, refresh_token, idCliente){
        var sql = `UPDATE tokenPluggto SET access_token='${access_token}', refresh_token='${refresh_token}' ` +
                    `WHERE id=${idCliente}`;
        
        conexao.query(sql, (erro, resultado) => {
            if(erro){
                console.log(erro);
            }
        });
    }

    pegarToken(res, idCliente){
        var sql = 'SELECT access_token, refresh_token FROM tokenPluggto WHERE id = ' + idCliente;
        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }

    listarProdutos(res, access_token){
        const urlProduto = 'https://api.plugg.to' + `/products?access_token=${access_token}`;
        const metodo = 'GET';
        const corpo = '';
        const header = 'application/json';

        const respostaPluggto = enviarRequisicao(metodo, urlProduto, corpo, header);
        
        res.status(respostaPluggto.status).json(respostaPluggto);
    }

    pegarProduto(res, sku, access_token){
        const urlProduto = 'https://api.plugg.to' + `/skus/${sku}?access_token=${access_token}`;
        const metodo = 'GET';
        const corpo = '';
        const header = 'application/json';

        const respostaPluggto = enviarRequisicao(metodo, urlProduto, corpo, header);
        
        res.status(respostaPluggto.status).json(respostaPluggto);
    }
}

function enviarRequisicao(metodo, url, corpo, header){
    //REQUISICAO
    var xhr = new XMLHttpRequest();
    xhr.open(metodo, url, false);
    xhr.setRequestHeader('Content-Type', header);
    xhr.send(corpo);

    var resultado = {};
    resultado.resultado = JSON.parse(xhr.responseText);
    resultado.status = xhr.status;

    return resultado;
}

module.exports = new Pluggto;