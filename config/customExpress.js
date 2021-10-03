
//importa essas bibliotecas
//cria o servidor e todo o resto
const express = require('express')
//essa aqui agrega e organiza as rotas de APP
const consign = require('consign')
//essa aqui faz o parse do conteudo do body
const bodyParser = require('body-parser')


//module.exports diz o que vai ser enviado para customExpress()
module.exports = () => {
    //APP recebe express
    const app = express()

    //APP usa as funcoes de parse
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //consign agrega a pasta controllers e tudo que tem nela a APP
    consign()
        //pega os verbos HTTP (GET, POST, PATCH, DELETE)
        .include('controllers')
        .into(app)

    //por fim APP é enviado a customExpress
    return app
}


