const productAuthMiddleware = ((req, res, next) => {
  (req.header("authorization") == "usuario" &&
    req.originalUrl == "/api/productos/" &&
    req.method == "GET") ||
  req.header("authorization") == "administrador"
    ? next()
    : res.status(401).json({
        error: -1,
        descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada`,
      });
});

const carritoAuthMiddleware = ((req, res, next) => {
    req.header("authorization") == "usuario" ||
    req.header("authorization") == "administrador"
      ? next()
      : res.status(401).json({
          error: -1,
          descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada`,
        });
  });

module.exports ={productAuthMiddleware,carritoAuthMiddleware}