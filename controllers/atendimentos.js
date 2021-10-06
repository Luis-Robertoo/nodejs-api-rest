//pega o objeto conexao de infra conexao
const conexao = require('../infraestrutura/database/conexao')

//vai até models e pega o obejo com os metodos para cada tipo de requisição
const Atendimento = require('../models/atendimentos')


//devolve APP para customExpress e consign
module.exports = app => {

    app.get('/atendimentos', (req, res) => {

        Atendimento.lista()
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    app.get('/atendimentos/:id', (req,res) => {

        //converte o id passado por parametro em número
        const id = parseInt(req.params.id)

        //chama o método buscaPorID e passa o id convertido
        // e recebe res como resposta do processamento
        Atendimento.buscaPorId(id, res)
    })

    app.post('/atendimentos', (req, res) => {

        const atendimento = req.body

        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => 
                res.status(201).json(atendimentoCadastrado))
            .catch(erros => 
                res.status(400).json(erros))

    })
    
    app.patch('/atendimentos/:id', (req, res) => {

        //converte o id passado por parametro em número
        const id = parseInt(req.params.id)

        //guarda o body(corpo) da requisição em valores
        const valores = req.body

        //chama altera passando id, valores, e res
        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const resposta = req.params.id
        if(resposta == 'true'){

            Atendimento.deletatudo(resposta, res)

        } else {
            const id = parseInt(req.params.id)

            Atendimento.deleta(id, res)
        }

    })

}