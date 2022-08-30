
const Contenedor=require('./contenedor.js');
const express = require('express')
const app = express()
const port = 8080

app.get('/productos', (req, res) => {
  const nuevo= new Contenedor('./productos.txt')
  nuevo.getAll().then(result=>res.send(result))
})

app.get('/productoRandom', (req, res) => {
  const nuevo= new Contenedor('./productos.txt')
  nuevo.getAll().then(result=>res.send(result[Math.floor(Math.random() * (result.length - 1))]))
}) 

app.get('/*', (req, res) => {
    res.send("Consulta /productos o /productoRandom bro. ")
}) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
