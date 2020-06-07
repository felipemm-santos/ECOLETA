const express = require("express")
const server  = express()

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Configurar pasta publica
server.use(express.static("public"))

//Configurar caminhos da aplicação
// pagina inicial
// req: requisição
// res: resposta
server.get("/", (req, res) => {
   return res.render("index.html")
})
server.get("/create-point", (req, res) => {
   return res.render("create-point.html")
})
server.get("/page-search-results", (req, res) => {
   return res.render("page-search-results.html")
})


// ligar o servidor

server.listen(3000)