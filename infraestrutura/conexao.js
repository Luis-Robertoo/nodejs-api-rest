const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port : '3306',
    user: 'dev',
    password: '12345678',
    database: 'agenda_petshop'
})

module.exports = conexao