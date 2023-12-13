const { User } = require("../models/index.js");
const bcrypt = require("bcryptjs");

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
      res.send(user);
    });
  },
};

module.exports = UserController;
