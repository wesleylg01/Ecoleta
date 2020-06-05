// const express recive the 'express'
const express = require("express")
// const server will exec the function express, the const express recive the function, 
// so i can use the cont like a function
const server = express()

//get the folder public, i need this folder here to use css files 
server.use(express.static("public"))

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

// route to create-point.html
server.get("/create-point", (req, res) =>{
    return res.render("create-point.html")
})

// route to search-results.html
server.get("/search-results", (req, res) =>{
    return res.render("search-results.html")
})

// turn on the server
server.listen(3000)