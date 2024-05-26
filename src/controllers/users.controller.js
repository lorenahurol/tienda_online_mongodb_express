// Traer el modelo de user:
const User = require("../models/user.model");
// Libreria Bcrypt para encriptar la password:
const bcrypt = require("bcryptjs");
// Libreria jsonwebtoken:
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
    // Encriptar password
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Determinar si el usuario existe:
    const user = await User.findOne({ email });
    if (!user) {
        res.status(403).json({ error: "Error en email y/o password " });
    }

    // Comprobar si la password es correcta:
    const comp = bcrypt.compareSync(password, user.password);
    if (!comp) {
        res.status(403).json({ error: "Error en el email y/o password " });
    }

    res.json({
        message: "Login correcto",
        token: jwt.sign(user._id.toString(), process.env.SECRET_KEY)
    })
}

const getProfile = async (req, res, next) => {
    const user = await User.findById(req.user._id).populate("cart");
    res.json(user);
    
}

module.exports = {
    registerUser, loginUser, getProfile
}