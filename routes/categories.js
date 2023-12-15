const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

const app = express();

router.get("/", CategoryController.obtenerCategoriasConProductos);
router.get("/id/:id", CategoryController.obtenerCategoriaPorId);
router.get("/buscar", CategoryController.buscarCategoriaPorNombre);
router.post("/", CategoryController.crearCategoria);
// delete
router.delete("/:id", CategoryController.borrarCategoria);
// put
router.put("/:id", CategoryController.updateCategoria);

module.exports = router;
