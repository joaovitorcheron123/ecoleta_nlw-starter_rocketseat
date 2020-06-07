const express = require("express")
const server = express() //objeto do servidor

//config pasta public
server.use(express.static("public"))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos/rotas
//home
server.get("/", (req, res) => { //req = pedido, res = resposta
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos"})
})

//create-point
server.get("/create-point", (req, res) => { //req = pedido, res = resposta
    return res.render("create-point.html")
})

//search-results
server.get("/search", (req, res) => { //req = pedido, res = resposta
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)




