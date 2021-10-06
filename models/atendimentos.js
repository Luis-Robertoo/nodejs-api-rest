
const moment = require('moment')
const axios = require('axios')

const conexao = require('../infraestrutura/database/conexao')

const repositorio = require('../repositorios/atendimentos') 

class Atendimento {
    constructor() {
        this.dataEhValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValidado = (tamanho) => tamanho >= 4

        this.valida = (parametros) => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]

            return !campo.valido(parametro)
        })

        

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValidado,
                mensagem: 'Cliente deve ter 4 caracteres ou mais'
            }
        ]
    }
        
 

    adiciona(atendimento) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM')

        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM')


        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }

        const erros = this.valida(parametros)

        const existemErros = erros.length

        if(existemErros){
            return new Promise ((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
    
            return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId
                    return { ...atendimento, id }
                })
        }
    }


    lista() {
        return repositorio.lista()
    }

    buscaPorId(id, res) {
       
        //controi uma query com uma format string 
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`


        conexao.query(sql, async (erro, resultado) => {
            const atendimento = resultado[0]
            const cpf = atendimento.cliente
            if(erro){
                res.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                atendimento.cliente = data
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

    deletatudo(resposta, res){
        
        const sql = 'DELETE FROM atendimentos'

        conexao.query(sql, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }
}

//devolve para atendimentos na pasta controllers
//o objeto instanciado com seus metodos
module.exports = new Atendimento