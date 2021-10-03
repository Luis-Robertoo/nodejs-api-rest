//a responsabilidade e controlar as rotas e o que cada uma faz
const Atendimento = require('../models/atendimentos')
//criado o modulo de exportaçao para o consign na pasta config

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos e esta realizando um GET'))

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento)
        res.send('POST atendimento')

    })
    
}