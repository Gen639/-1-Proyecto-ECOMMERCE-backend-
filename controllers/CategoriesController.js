// controllers/categoriasController.js
const { Categoria, Producto } = require('../models');
const { Op } = require('sequelize');

// Crear una categoría
const crearCategoria = async (req, res) => {
    const { nombre } = req.body;
    Categoria.create(req.body).then(categoria =>
      res.status(201).send(categoria))
      .catch(err => console.log(err))
}


// Operaciones CRUD

// Obtener todas las categorías con productos asociados
const obtenerCategoriasConProductos = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      include: [{ model: Producto, attributes: ['id', 'nombre'] }],
    });
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las categorías.' });
  }
};

// Obtener una categoría por su ID
const obtenerCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ error: 'Categoría no encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la categoría.' });
  }
};

// Filtrar categoría por nombre
const buscarCategoriaPorNombre = async (req, res) => {
  const { nombre } = req.query;
  try {
    const categorias = await Categoria.findAll({
      where: { nombre: { [Op.iLike]: `%${nombre}%` } },
    });
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar la categoría por nombre.' });
  }
};

module.exports = {
  obtenerCategoriasConProductos,
  obtenerCategoriaPorId,
  buscarCategoriaPorNombre,
  crearCategoria
  // ... otras funciones CRUD
};
