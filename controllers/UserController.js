const { User } = require("../models/index.js");

const UserController = {
  create(req, res) {
    req.body.role = "user";
    User.create(req.body)
      .then((user) =>
        res.status(201).send({ message: "Usuario creado con éxito", user })
      )
      .catch(console.error);
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
