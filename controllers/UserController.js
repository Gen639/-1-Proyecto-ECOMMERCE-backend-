const { User, Token, Order, Product } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const UserController = {
  create(req, res) {
    req.body.role = "user";
    const password = bcrypt.hashSync(req.body.password, 10);

    User.create({ ...req.body, password })
      .then((user) =>
        res.status(201).send({ message: "Usuario creado con éxito", user })
      )
      .catch((err) => console.error(err));
  },
  getAll(req, res) {
    User.findAll()
      .then((users) => res.send(users))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "There was a problem of getting all users" });
      });
  },
  async login(req, res) {
    await User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!user || !isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }

      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Bienvenid@ " + user.name, user, token });
    });
  },
  getUserInfo(req, res) {
    User.findByPk(req.params.id, {
      include: [
        {
          model: Order,
          attributes: ["id", "number"],
          include: [
            {
              model: Product,
              through: "ProductOrder", // Specify the name of your join table
            },
          ],
        },
      ],
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        res.send({ user });
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
      });
  },
};

module.exports = UserController;
