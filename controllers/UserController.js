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
};

module.exports = UserController;
