const yup = require("yup");

const productSchema = yup.object({
    name: yup.string().required('El campo name es obligatorio'),
    description: yup.string().min(10, 'La descripcion debe tener como minimo 10 caracteres'),
    price: yup.number().required('El precio es obligatorio')
})

module.exports = productSchema;