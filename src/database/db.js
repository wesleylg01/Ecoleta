// import the dependences od sqlite3
// the method 'verbose' is used to  showmore information in terminal, information about the process, taks and etc ...
const sqlite3 = require("sqlite3").verbose()

// create the database
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// create the structure
  db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
}) 
/*
// The structure for insert
const query  = `INSERT INTO places (image,name,address,address2,state,city,items) VALUES (?,?,?,?,?,?,?);`
// The data to insert
const values = [
    "https://images.unsplash.com/photo-1542739674-b449a8938b59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    "Papersider",
    "Guilherma Gembalia, Jardim América",
    "n° 260",
    "Santa Catarina",
    "Rio do Sul",
    "Resíduos Eletrônicos, lâmpadas"]

// function back for insert
// while inserts run, this functio say if insert happenf or not
function afterInsertData(err){
    if (err){
        return console.log(err)
    }
    console.log("Cadastrado com sucesso")
    console.log(this)
}
*/
 //finally, runing insert
//db.run(query,values, afterInsertData)

// To consult, the famous SELECT
/*  db.all('SELECT * FROM places',function(err,rows){
    if (err){
        return console.log(err)
    }

    console.log("Registros:")
    console.log(rows)
})  */
 
// To delete
//db.run(`DELETE FROM places`)