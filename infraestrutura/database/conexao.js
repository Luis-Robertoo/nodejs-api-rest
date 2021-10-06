//importa a biblioteca MySQL
const mysql = require('mysql')

//conexao recebe o metodo com os parametros que cria a conexao
const conexao = mysql.createConnection({
    host: 'localhost',
    port : '3306',
    user: 'dev',
    password: '12345678',
    database: 'agenda_petshop'
})

//devolve a conexao criada
module.exports = conexao