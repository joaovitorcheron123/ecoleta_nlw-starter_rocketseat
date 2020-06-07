// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar objeto que fará operaçoes de bd
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db // vai para a const em "server.js"
//utilizar o objeto de bd para as operações
db.serialize(() => {
//     //criar tabela sql
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
    
//     //inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err){ // em caso de erro
//         if(err){
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso!") // caso nao haja erro
//         console.log(this) //referencia a resposta do db.run
//     }

//     db.run(query, values, afterInsertData)

    //consultar dados na tabela
    // db.all(`SELECT name FROM places`, function(err, rows) {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros:")
    //     console.log(rows)
    // })

    //deletar dado
    // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
    //     if(err){
    //         return console.log(err)
    //     }
        
    //     console.log("Deletado com sucesso!")
    // })

})
