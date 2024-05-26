const router = require("express").Router();

const { registerUser, loginUser, getProfile } = require("../../controllers/users.controller");
const registerSchema = require("../../schemas/register.schema");
const { checkToken, validate } = require("../../helpers/middlewares");



router.get("/profile", checkToken, getProfile)
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", loginUser )

module.exports = router;