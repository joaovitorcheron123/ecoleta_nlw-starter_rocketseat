const express = require("express")
const server = express() //objeto do servidor

// pegar o banco
const db = require("./database/db.js")

//config pasta public
server.use(express.static("public"))

//habilitar uso do req.body na app
server.use(express.urlencoded({ extended: true }))

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
    //query strings da url
    //req.query
    
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    //req: body: o corpo do form
    //console.log(req.body)

    //inserir dados no banco
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){ // em caso de erro
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso!") // caso nao haja erro
        console.log(this) //referencia a resposta do db.run

        return res.send("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)

})

//search-results
server.get("/search", (req, res) => { //req = pedido, res = resposta

    const search = req.query.search
    if(search == ""){ //pesquisa vaiza
        return res.render("search-results.html", { total: 0})
    }



    //pegar os dados do banco
    db.all(`SELECT * FROM places WHERE city LIKE = '%$search%'`, function(err, rows) {
        if(err){
            return console.log(err)
        }

        const total = rows.length

        //mostrar a pag html com os dados do banco
        return res.render("search-results.html", { places: rows, total: total})

    })


})

//ligar o servidor
server.listen(3000)




