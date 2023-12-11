const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/CategoriesController');

const app = express();

router.get('/', categoriasController.obtenerCategoriasConProductos);
router.get('/:id', categoriasController.obtenerCategoriaPorId);
router.get('/buscar', categoriasController.buscarCategoriaPorNombre);
router.put("/",categoriasController.crearCategoria);
// Configura otras rutas CRUD

module.exports = router;


