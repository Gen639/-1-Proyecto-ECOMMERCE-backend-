const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController.js");
const { authentication, isAdmin } = require("../middlewares/authentication.js");

//Endpoint para crear un producto
router.post("/", authentication, isAdmin, ProductController.create);

//El endpoint de traer todos productos
router.get("/", ProductController.getAll);
//El endpoint de traer productos debe mostrarse junto a la categoría o categorías que pertenece
router.get("/withCategory/:id", ProductController.getByIdCateg);
//Endpoint que traiga un producto por su id
router.get("/id/:id", ProductController.getById);
//Filtro que ordene los productos de mayor a menor precio
router.get("/filter/highToLowPrice", ProductController.highToLow);

//Endpoint para actualizar un producto
router.put("/id/:id", authentication, isAdmin, ProductController.updateById);
//Endpoint para eliminar un producto
router.delete("/id/:id", authentication, isAdmin, ProductController.delete);

module.exports = router;
