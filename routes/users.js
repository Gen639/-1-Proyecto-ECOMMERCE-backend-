const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController.js");
const { authentication } = require("../middlewares/authentication.js");

router.post("/", UserController.create);
router.get("/", UserController.getAll);
router.post("/login", UserController.login);
router.get("/getUserOrders/:id", UserController.getUserInfo);
router.delete("/", authentication, UserController.logout);
router.get("/confirm/:emailToken", UserController.confirm);

module.exports = router;
