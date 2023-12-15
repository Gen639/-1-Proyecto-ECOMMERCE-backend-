// controllers/categoriasController.js
const { Category, Product } = require("../models/index.js");
const { Op } = require("sequelize");

// Crear una categoría
const crearCategoria = async (req, res) => {
  const { name } = req.body;
  Category.create(req.body)
    .then((category) => res.status(201).send(category))
    .catch((err) => console.log(err));
};

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
const buscarCategoriaPorNombre = (req, res) => {
  const { name } = req.query;
  Category.findAll({ where: { name: { [Op.like]: `%${name}%` } } })
    .then((categories) => res.send(categories))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: "There was a problem of getting categories" });
    });
};

const borrarCategoria = async (req, res) => {
  try {
    const deletedCategoriaCount = await Category.destroy({
      where: { id: req.params.id },
    });

    if (deletedCategoriaCount > 0) {
      res.send("The category successfully deleted");
    } else {
      res.status(404).send({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const updateCategoria = async (req, res) => {
  const { CategoryId } = req.body;
  const existingCategory = await Category.findByPk(req.params.id);
  // const existingCategory = await Category.findByPk(CategoryId);

  if (CategoryId) {
    if (!existingCategory) {
      return res.status(400).send({ error: "Category not found" });
    }
  }

  await Category.update(
    {
      name: req.body.name,
    },
    {
      where: { id: req.params.id },
    }
  );
  res.send("Product succesfully updated");
};

module.exports = {
  obtenerCategoriasConProductos,
  obtenerCategoriaPorId,
  buscarCategoriaPorNombre,
  crearCategoria,
  borrarCategoria,
  updateCategoria,
  // ... otras funciones CRUD
};
