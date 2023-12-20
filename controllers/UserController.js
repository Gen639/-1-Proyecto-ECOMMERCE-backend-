const {
  User,
  Token,
  Order,
  Product,
  Sequelize,
} = require("../models/index.js");
const { Op } = Sequelize;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
const transporter = require("../config/nodemailer");

const UserController = {
  async create(req, res, next) {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password,
        confirmed: false,
        role: "user",
      });
      const emailToken = jwt.sign({ email: req.body.email }, jwt_secret, {
        expiresIn: "48h",
      });
      const url = "http://localhost:3000/users/confirm/" + emailToken;

      // await transporter.sendMail({
      //   to: req.body.email,
      //   subject: "Confirm your registration",
      //   html: `<h3>Welcome, you are one step away from registering </h3>
      //   <a href=${url}> Click to confirm your registration</a>
      //   `,
      // });
      res.status(201).send({
        message: "User succesfully created",
        user,
      });
    } catch (err) {
      next(err);
    }
  },

  async confirm(req, res) {
    try {
      const token = req.params.emailToken;
      const payload = jwt.verify(token, jwt_secret);
      await User.update(
        { confirmed: true },
        {
          where: {
            email: payload.email,
          },
        }
      );
      res.status(201).send("User confirmed successfully");
    } catch (error) {
      console.error(error);
    }
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
          .send({ message: "User or Password are incorrect" });
      }
      if (!user.confirmed) {
        return res.status(400).send({
          message:
            "Please confirm your email. The confirmation link sent to indicated at registration email address.",
        });
      }

      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res.send({ message: "Welcome " + user.name, user, token });
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

  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { UserId: req.user.id },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: "Succesfully logged out" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "there was a problem disconecting" });
    }
  },
};

module.exports = UserController;
