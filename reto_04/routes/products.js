const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Contenedor = require("../contenedor.js");
const nuevo = new Contenedor("./productos.txt");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

/* (check) GET '/api/productos' -> devuelve todos los productos. */
router.get("/", (req, res) => {
  nuevo.getAll().then((result) => res.send(result));
});
/* (check) POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado. */
router.post("/", urlencodedParser, (req, res) => {
  nuevo.save(req.body).then((result) => res.send(result));
});
/* (check) GET '/api/productos/:id' -> devuelve un producto según su id. */
router.get("/:id", (req, res) => {
  nuevo
    .getById(Number(req.params.id))
    .then((result) =>
      result
        ? res.status(200).send(result)
        : res
            .status(404)
            .send(
              `Hubo un error encontrando el producto con id ${req.params.id}`
            )
    );
});
/* (check) PUT '/api/productos/:id' -> recibe y actualiza un producto según su id. */
router.put("/:id", (req, res) => {
  nuevo
    .updateById(req.params.id - 1, req.body)
    .then((result) =>
      result
        ? res
            .status(200)
            .send(`El producto con id ${req.params.id} fue actualizado`)
        : res
            .status(404)
            .send(
              `Hubo un error encontrando el producto con id ${req.params.id}`
            )
    );
});
/* (check) DELETE '/api/productos/:id' -> elimina un producto según su id. */
router.delete("/:id", (req, res) => {
  nuevo
    .deleteById(Number(req.params.id))
    .then((result) =>
      result
        ? res
            .status(200)
            .send(`Producto con id ${req.params.id} eliminado`)
        : res
            .status(404)
            .send(
              `Hubo un error encontrando el producto con id ${req.params.id}`
            )
    );
});

module.exports = router;

/* 
1.- Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }
2.- Implementar la API en una clase separada,
utilizando un array como soporte de persistencia en memoria.
3.- Incorporar el Router de express en la url base '/api/productos'
y configurar todas las subrutas en base a este.
4.- Crear un espacio público de servidor que contenga un documento
index.html con un formulario de ingreso de productos con los datos
apropiados.
5.- El servidor debe estar basado en express y debe implementar los
mensajes de conexión al puerto 8080 y en caso de error, representar
la descripción del mismo.
6.- Las respuestas del servidor serán en formato JSON.
La funcionalidad será probada a través de Postman y del formulario
de ingreso.
 */
