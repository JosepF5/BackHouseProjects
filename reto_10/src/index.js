const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
const routerCarrito = express.Router();
const { engine } = require("express-handlebars");
const productRouter = require("./routes/products")(router);
const carritoRouter = require("./routes/carritos")(routerCarrito);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productRouter);
app.use("/api/carrito", carritoRouter);
app.set("views", "./src/views");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

/* RENDERIZAR PAGINA DE INICIO
app.get("/*", (req, res) => {
  res.render("pages/home", {});
}); */

app.get("/*", async (req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`,
  });
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

server.on("error", (err) => console.log(err));
