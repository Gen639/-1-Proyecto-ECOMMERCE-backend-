const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController.js");

//Endpoint para crear un producto
router.post("/", ProductController.create);

//El endpoint de traer todos productos
router.get("/", ProductController.getAll);
//El endpoint de traer productos debe mostrarse junto a la categoría o categorías que pertenece
router.get("/category/:id", ProductController.getByIdCateg);
//Endpoint que traiga un producto por su id
router.get("/:id", ProductController.getById);
//Filtro que ordene los productos de mayor a menor precio
router.get("/filter/highToLowPrice", ProductController.highToLow);

//Endpoint para actualizar un producto
router.put("/:id", ProductController.updateById);
//Endpoint para eliminar un producto
router.delete("/:id", ProductController.delete);

module.exports = router;
