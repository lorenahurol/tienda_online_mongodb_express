// Crear un modelo de product.
// Traer el metodo model y la clase Schema de Mongoose:
const { model, Schema } = require("mongoose");

// Definir como queremos que sean todos los documentos de la coleccion de productos:
const productSchema = new Schema({
    // Tienen que ser tipos de datos de Mongoose.
    name: String,
    description: String,
    price: Number,
    stock: Number,
    department: String,
    available: Boolean,
    // Dueño del producto. Se le pasa un objeto. Type del campo owner, ref: nombre de la coleccion:
    owner: { type: Schema.Types.ObjectId, ref: "user" }
}, {
    // Segundo parametro para opciones:
    versionKey: false,
    // Cuando se ha creado y cuando actualizado el documento:
    timestamps: true,
    // Que aparezcan los virtuals:
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Campo virtual: Campo que solo esta en memoria, no en BD. Se calcula en base a funciones:

// Para todos mis documentos de la coleccion productos, creo un nuevo campo aparte de los que ya tienen definidos.
// Cada vez que recupere el priceTaxes, hace el calculo sobre el precio:
productSchema.virtual("priceTaxes").get(function () {
    return this.price * 1.21
});
// Aparece la url:
productSchema.virtual("url").get(function () {
    return this.name.replaceAll(" ", "-").toLowerCase();
})


// Creo el modelo: nombre de la coleccion, y el Schema que hemos creado:
module.exports = model("product", productSchema);