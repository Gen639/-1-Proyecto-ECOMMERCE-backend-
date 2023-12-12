const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

const app = express();

router.get("/", CategoryController.obtenerCategoriasConProductos);
router.get("/id/:id", CategoryController.obtenerCategoriaPorId);
router.get("/buscar", CategoryController.buscarCategoriaPorNombre);
router.post("/", CategoryController.crearCategoria);
// Configura otras rutas CRUD

module.exports = router;
