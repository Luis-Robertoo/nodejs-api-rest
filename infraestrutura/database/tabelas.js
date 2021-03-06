//cria um objeto Tabelas
class Tabelas {
    //recebe a conexao criada como parametro
    init(conexao) {
        //passa conexao como atributo do objeto Tabelas
        this.conexao = conexao

        //chama o metodo que cria a tabela de atendimentos
        this.criarAtendimentos()
        this.criarPets()
    }
    
    criarAtendimentos() {
        //Query SQL para criar a tabela
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL,pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY (id))'

        //chama o metodo query, passa a string com o SQL,
        //e uma função que o primeiro e único parametro
        //caso dê erro retorna esse erro
        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        })
    }

    criarPets() {
        const query = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome VARCHAR(50), imagem VARCHAR(200), PRIMARY KEY (id))'

        this.conexao.query(query, (erro) => {
            if(erro){
                console.log(erro)
            } else {
                console.log('Tabela Pets criada com sucesso')
            }
        })
    }
}

//devolve para a Index um objetos já instanciado de Tabelas
module.exports = new Tabelas