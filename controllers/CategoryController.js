// controllers/categoriasController.js
const { Category, Product } = require("../models/index.js");
const { Op } = require("sequelize");

// Crear una categoría
const crearCategoria = async (req, res) => {
  const { nombre } = req.body;
  Category.create(req.body)
    .then((category) => res.status(201).send(category))
    .catch((err) => console.log(err));
};

// Operaciones CRUD

// Obtener todas las categorías con productos asociados
const obtenerCategoriasConProductos = async (req, res) => {
  try {
    const categorias = await Category.findAll({
      include: [{ model: Product, attributes: ["id", "name"] }],
    });
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las categorías." });
  }
};

// Obtener una categoría por su ID
const obtenerCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Category.findByPk(id);
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ error: "Categoría no encontrada." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la categoría." });
  }
};

// Filtrar categoría por nombre
const buscarCategoriaPorNombre = async (req, res) => {
  try {
    const { name } = req.query;
    const categories = await Category.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
    });

    res.send({ message: "Resultado de la busqueda", categories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al buscar la categoría por nombre." });
  }
};

module.exports = {
  obtenerCategoriasConProductos,
  obtenerCategoriaPorId,
  buscarCategoriaPorNombre,
  crearCategoria,
  // ... otras funciones CRUD
};
