
const Contenedor= require('./contenedor.js');
const express = require('express')
const app = express()
const port = 8080
const nuevo= new Contenedor('./productos.txt')

app.get('/productos', (req, res) => {
  nuevo.getAll().then(result=>res.send(result))
})

app.get('/productoRandom', (req, res) => {
  nuevo.getAll().then(result=>res.send(result[Math.floor(Math.random() * (result.length))]))
}) 

app.get('/*', (req, res) => {
    res.send("Consulta /productos o /productoRandom bro. ")
}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
