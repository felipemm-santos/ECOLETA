const express = require("express")
const server  = express()

//Configurar caminhos da aplicação
// pagina inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
    res.send("Cheguei aqui")
})

// ligar o servidor

server.listen(3000)