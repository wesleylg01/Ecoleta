// const express recive the 'express'
const express = require("express")
// const server will exec the function express, the const express recive the function, 
// so i can use the const like a function
const server = express()

//recive the database, the connection with bd
const db = require("./database/db.js")

//get the folder public, i need this folder here to use css files 
server.use(express.static("public"))

//able req.body
server.use(express.urlencoded({extended: true}))

// const nunjucks recive the 'nunjucks'
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

// route to index.html
server.get("/", (req, res) =>{
    return res.render("index.html")
})

// routes to create-point.html
server.get("/create-point", (req, res) =>{
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) =>{
    // The structure for insert
    const query  = `INSERT INTO places (image,name,address,address2,state,city,items) VALUES (?,?,?,?,?,?,?);`
    // The data to insert
    const values = [req.body.image, req.body.name, req.body.address, req.body.address2, req.body.state, req.body.city, req.body.items]

    // function back for insert
    // while inserts run, this functio say if insert happenf or not
    function afterInsertData(err){
        if (err){
            return res.render("create-point.html", {saved: false})
        }
        return res.render("create-point.html", {saved: true})
    }

    //finally, runing insert
    db.run(query,values, afterInsertData)    
})

// route to search-results.html
server.get("/search-results", (req, res) =>{
    
    const search = req.query.search

    if (search == ""){
        return res.render("search-results.html",{total: 0})
    }

    // search the data from bd
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err,rows){
        if (err){
            return console.log(err)
        }    
    const total = rows.length
    return res.render("search-results.html",{places: rows, total: total})
    })
})

// turn on the server
server.listen(3000)