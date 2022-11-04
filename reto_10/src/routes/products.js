const Contenedor = require("../contenedor.js");
const Producto = require("../model/product");
const auth = require("../middlewares/auth.js");
const nuevo = new Contenedor("./productos.json");
const productoDAO = require("../dao/productoDAO.js");
const productoDao = new productoDAO();
const productoFirebase = require("../dao/firebase/productoDAO.js");
const productoFB = new productoFirebase();

module.exports = function (router) {
  /* RENDERIZAR PAGINA DE PRODUCTOS 
  router.get("/", async (req, res) => {
    const productos = await nuevo.getAll();
    res.render("pages/list", { productos });
  }); */

  router.get("/", auth.productAuthMiddleware, async (req, res) => {
    const productos = await productoDao.getAll();
    res.status(200).json(productos);
  });

    /* const producto = await productoDao.getProductById(req.params.id); */
  /* router.get("/:id", auth.productAuthMiddleware, async (req, res) => {
    const producto=productoFB.getProductById(req.params.id);
    producto
      ? res.status(200).json(producto)
      : res
          .status(400)
          .json({ error: "Ocurrió un error al encontrar el producto." });
  }); */

  /* RENDERIZAR PAGINA DE CREACION DE PRODUCTOS
  router.get("/crear", async (req, res) => {
    res.render("pages/form", {});
  }); */

  router.post("/", auth.productAuthMiddleware, async (req, res) => {
    (await productoDao.createProduct(req.body))
      ? res.status(200).send({ success: "Producto creado exitosamente." })
      : res
          .status(404)
          .send({ error: "Ocurrió un error al encontrar el producto." });
    /* res.redirect("/crear"); */
  });

  router.put("/:id", auth.productAuthMiddleware, async (req, res) => {
    const productUpdated = await productoDao.updateProductById(
      req.params.id,
      req.body
    );
    productUpdated
      ? res.status(200).send({ success: "Producto actualizado." })
      : res
          .status(404)
          .send({ error: "Ocurrió un error al encontrar el producto." });
  });

  router.delete("/:id", auth.productAuthMiddleware, async (req, res) => {
    const productDeleted = await productoDao.deleteProductById(req.params.id);
    productDeleted
      ? res.status(200).send({ success: "Producto eliminado." })
      : res
          .status(404)
          .send({ error: "Ocurrió un error al encontrar el producto." });
  });

  router.get("/*", auth.productAuthMiddleware, async (req, res) => {
    res.status(404).json({
      error: -2,
      descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`,
    });
  });

  return router;
};
