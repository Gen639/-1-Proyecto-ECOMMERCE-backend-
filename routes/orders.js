const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

//Crea un endpoint para crear pedidos
router.post("/", OrderController.create);

//Crea un endpoint para ver los pedidos junto a los productos que tienen

module.exports = router;
