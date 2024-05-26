const { checkToken } = require("../helpers/middlewares");

const router = require("express").Router();

// Pasar por checkToken antes de ir a productos:
router.use("/products", checkToken, require("./api/products"));
router.use("/users", require("./api/users"));

module.exports = router;