//pega o objeto conexao de infra conexao
const conexao = require('../infraestrutura/conexao')

//vai até models e pega o obejo com os metodos para cada tipo de requisição
const Atendimento = require('../models/atendimentos')


//devolve APP para customExpress e consign
module.exports = app => {

    //APP acompanhado do VERBO HTTP 
    //rota, uma funcao que recebe dois parametros
    //primeiro é o que o cliente enviou para o servidor - req
    //segundo é a resposta do servidor para o cliente - res
    app.get('/atendimentos', (req, res) => {

        //chama o metodo lista do objeto Atendimentos
        //e passa como parametro res
        //aqui esse parametro vai ser a resposta
        //do processamento do metodo lista 
        Atendimento.lista(res)
    
    })

    app.get('/atendimentos/:id', (req,res) => {

        //converte o id passado por parametro em número
        const id = parseInt(req.params.id)

        //chama o método buscaPorID e passa o id convertido
        // e recebe res como resposta do processamento
        Atendimento.buscaPorId(id, res)
    })

    app.post('/atendimentos', (req, res) => {

        //guarda o body(corpo) da requisição do cliente em atendimento
        const atendimento = req.body

        //chama o médoto adiciona com dois parametros
        //atendimento e o res
        //que novamente vai ser processado e devolvido
        Atendimento.adiciona(atendimento, res)

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