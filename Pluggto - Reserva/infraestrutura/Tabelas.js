class Tabelas {
    init(conexao){
        console.log('Tabelas foram chamadas');
        this.conexao = conexao;

        this.criarTebelaTokenPluggto();
    }

    criarTebelaTokenPluggto(){
        const sql = 'CREATE TABLE IF NOT EXISTS tokenPluggto(' +
            'id INTEGER NOT NULL AUTO_INCREMENT,' +
            'client_id VARCHAR(200) NOT NULL,' +
            'client_secret VARCHAR(200) NOT NULL,' +
            'username VARCHAR(200) NOT NULL,' +
            'passoword VARCHAR(200) NOT NULL,' +
            'cliente VARCHAR(50) NOT NULL,' +
            'tipo VARCHAR(50) NOT NULL,' +
            'access_token VARCHAR(200),' +
            'refresh_token VARCHAR(200),' +
            'PRIMARY KEY(id))';

        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro);
            }else{
                console.log('Tabela tokenPluggto criada com sucesso');
            }
        });
    }
}

module.exports = new Tabelas;
