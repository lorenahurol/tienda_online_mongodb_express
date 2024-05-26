// Schemas de validacion con yup:
const yup = require("yup");

// Validar el objeto que vamos a recibir en el registro:
const registerSchema = yup.object({
    name: yup.string().min(3, 'El nombre debe tener 3 caracteres').required('El campo name es requerido'),
    email: yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'El email debe ser correcto').required('El campo email es requerido'),
    password: yup.string().required('El campo password es requerido')
});

module.exports = registerSchema;