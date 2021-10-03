//a responsabilidade aqui é configurar

//Aqui temos as importaçoes de bibliotecas

const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')


//criamos o modulo de exportação
module.exports = () => {
    const app = express()

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
//consing faz com que o gerenciamento de rotas fica mais facil
//ele inclui a pasta controllers que tem as rotas 
    consign()
        .include('controllers')
        .into(app)

//ao final app é exportado para index.js
    return app
}


