//importa a biblioteca moment que faz a manipulação de data e hora
const moment = require('moment')

//pega o objeto conexao de infra conexao
const conexao = require('../infraestrutura/conexao')

//cria a classe Atendimento com os metodos  
class Atendimento {

    adiciona(atendimento, res) {

        //pega a data atual
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM')

        //pega a data passada dentro do objeto atendimento 
        //e converte para o formato aceito no banco
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM')

        //retorna um booleado depois de verificar se a data passada é depois da data atual
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)

        //retorna um boobeano depois de verificar se o nome do cliente é maior que 4 letras
        const clienteEhValidado = atendimento.cliente.length >= 4

        //cria um array de objetos
        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValidado,
                mensagem: 'Cliente deve ter 4 caracteres ou mais'
            }
        ]

        //cria um array com objetos caso o campo valido seja true
        const erros = validacoes.filter(campo => !campo.valido)

        //pega o tamanho do array erros
        const existemErros = erros.length

        //caso exista algum erro retorna o status code 400
        //com os erros no formato json
        if(existemErros){
            res.status(400).json(erros)
        } else {

            //atendimentoDatado recebe todos os dados de atendimento
            //as datas de crição e atual corrigidas
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            
            //coloca o começo da query
            //esse ? diz que ela vai completar com o segundo parametro
            const sql = 'INSERT INTO atendimentos SET ?'

            //faz uma query com sql e atendimentoDatado
            //uma função com dois argumentos vai ser retornada 
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {

                //retorna o erro
                if(erro){
                    res.status(400).json(erro)

                //retorna o dados de atendimento em formato json
                } else {
                    res.status(201).json(atendimento)
                }
            })
        }
        
    }


    lista(res) {
        const sql = 'SELECT * FROM atendimentos'

        //tenta executar a query
        //passa uma funcao com dois parametros
        conexao.query(sql, (erro, resultados) => {
            if(erro){

                //devolve res para o cliente com STATUS 400 e o erro em formato JSON
                res.status(400).json(erro)
            } else {
                
                //devolve res STATUS OK e o resultado da query em formato JSON
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
       
        //controi uma query com uma format string 
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`


        conexao.query(sql, (erro, resultado) => {
            const atendimento = resultado[0]
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {

        //faz uma validação na data
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM')
        }

        //constroi novamente com ?
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'

        //como tem dois ? esse argumento são passados dentro de um array
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {

                //o retorno é os valores alterados e o id
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

//devolve para atendimentos na pasta controllers
//o objeto instanciado com seus metodos
module.exports = new Atendimento