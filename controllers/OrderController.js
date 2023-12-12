const { Order, User } = require("../models/index.js");

// const OrderController = {
//   create(req, res) {
//     const { number, date, UserId } = req.body;
//     const existingUser = User.findByPk(UserId);

//     if (!number || !date || !UserId) {
//       res
//         .status(400)
//         .send("All camps (number, date and UserId) have to be filled");
//     }
//     if (!existingUser) {
//       return res.status(400).send({ error: "User not found" });
//     }
//     Order.create(req.body)
//       .then((order) =>
//         res.status(201).send({ message: "Order succesfully created", order })
//       )
//       .catch((err) => console.log(err));
//   },
// };

const OrderController = {
  async create(req, res) {
    try {
      const { number, date, UserId } = req.body;

      // Validate input
      if (!number || !date || !UserId) {
        return res
          .status(400)
          .send("All fields (number, date, and UserId) must be filled");
      }

      // Check if the user exists
      const existingUser = await User.findByPk(UserId);
      if (!existingUser) {
        return res.status(400).send({ error: "User not found" });
      }

      // Create the order
      const createdOrder = await Order.create({
        number,
        date,
        UserId,
      });

      // Send a success response
      res.status(201).send({
        message: "Order successfully created",
        order: createdOrder,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Internal Server Error" });
    }
  },
};

module.exports = OrderController;
