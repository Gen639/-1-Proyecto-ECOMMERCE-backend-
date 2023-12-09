const { Product, Category } = require("../models/index.js");
const { Op } = require("sequelize");

const ProductController = {
  create(req, res) {
    const { name, price, CategoryId } = req.body;

    if (!name || !price || !CategoryId) {
      res
        .status(400)
        .send("All camps (name, price and CategoryId) have to be filled");
    }

    Product.create(req.body)
      .then((product) =>
        res
          .status(201)
          .send({ message: "Product succesfully created", product })
      )
      .catch(console.error);
  },
  getAll(req, res) {
    const { productName, productPrice } = req.query;
    let whereCondition = {};
    if (productName) {
      whereCondition = {
        name: {
          [Op.like]: `%${productName}%`,
        },
      };
    }
    if (productPrice) {
      whereCondition = {
        price: {
          [Op.like]: `%${productPrice}%`,
        },
      };
    }

    Product.findAll({ where: whereCondition })
      .then((products) => res.send(products))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "There was a problem of getting all products" });
      });
  },
  async updateById(req, res) {
    await Product.update(
      {
        name: req.body.name,
        price: req.body.price,
        CategoryId: req.body.CategoryId,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.send("Product was succesfully updated");
  },
  async delete(req, res) {
    await Product.destroy({
      where: { id: req.params.id },
    });
    res.send("The product was succesfully deleted");
  },
  getByIdCateg(req, res) {
    Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ["name"] }],
    }).then((product) => res.send(product));
  },
  getById(req, res) {
    Product.findByPk(req.params.id).then((product) => res.send(product));
  },

  highToLow(req, res) {
    Product.findAll({
      order: [["price", "DESC"]],
    })
      .then((products) => res.send(products))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "There was a problem of getting products" });
      });
  },
};

module.exports = ProductController;
