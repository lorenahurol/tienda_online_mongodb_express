const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const checkToken = async (req, res, next) => {
    // Comprobar si recibimos la cabecera:
    if (!req.headers["authorization"]) {
        return res.status(403).json({error: "Debes incluir la cabecera de autenticacion "})
    }

    const token = req.headers["authorization"];

    // Comprobar si el token es valido:
    let userId;
    try {
       userId= jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return res.status(403).json({ error: "El token es incorrecto" });
    }
    
    // Si todo ha ido bien, recuperar el usuario (Hay que pasar por checkToken):
    const user = await User.findById(userId);
    // Modificar la request pasandole el user:
    req.user = user;

    next();

}

// Middleware de validate - Le pasamos el schema de validacion por parametro. Cuando se ejecute, devuelve la funcion del middleware. 

const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body, {abortEarly: false}); // Registra todos los errores
            next();
        } catch (error) {
            res.json(error.errors);
        }  
    }
}

module.exports = {
    checkToken, validate
}