/*const express = require('express')

const app = express()

app.listen(3000, () => {console.log('Servidor rodando na porta 3000')})

app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos e esta realizando um GET'))

*/

const express = require('express')

const PORT = process.env.PORT || 5000

const app = express()
  
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
app.get('/', (req, res) => res.send('Você está na rota de atendimentos e esta realizando um GET'))
