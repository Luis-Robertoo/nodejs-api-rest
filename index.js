
//vai até config e pega o 'APP'
const customExpress = require("./config/customExpress") 

//vai até infra e pega a conexao MySQL
const conexao = require('./infraestrutura/conexao')

//vai até infra e pega as tabelas dessas vez
const Tabelas = require('./infraestrutura/tabelas')

//agora que ele já tem o objeto com os dados da conexao
//ele chama o metodo MySQL connect com uma funcao 
//onde o primeiro parametro de retorno é um erro
//caso tenha dado certo chama o metodo INIT de Tabelas
conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('conectado no banco')

        //passando a conexao 
        Tabelas.init(conexao)
        
        //APP recebe o customExpress com todas as bibliotecas utilizadas
        //tratamento com Parse-Body
        //e o consign
        const app = customExpress()

        //inicia o servidor na porta 3000, e printa no console
        app.listen(3000, () => {console.log('Servidor rodando na porta 3000')})

    }
})



