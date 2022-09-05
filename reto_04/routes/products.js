const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const Contenedor = require("../contenedor.js");
const nuevo = new Contenedor("./productos.txt");
let urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", (req, res) => {
  nuevo.getAll().then((result) => res.send(result));
});

router.post("/", urlencodedParser, (req, res) => {
  console.log(req.body);
  nuevo.save(req.body).then((result) => res.send(result));
});

router.get("/:id", (req, res) => {
  nuevo.getById(Number(req.params.id)).then((result) => res.send(result));
});

router.put("/:id", (req, res) => {
  nuevo.updateById(req.body).then((result) => res.send(result));
});

router.delete("/:id", (req, res) => {
  nuevo.deleteById(Number(req.params.id)).then((result) => res.send(result));
});

module.exports = router;
