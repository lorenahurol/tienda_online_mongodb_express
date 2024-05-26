const router = require("express").Router();

const { registerUser, loginUser, getProfile } = require("../../controllers/users.controller");
const { checkToken } = require("../../helpers/middlewares");

router.get("/profile", checkToken, getProfile)
router.post("/register", registerUser);
router.post("/login", loginUser )

module.exports = router;