const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    // Array de productos del usuario:
    cart: [{ type: Schema.Types.ObjectId, ref: "product"}]
}, {
    versionKey: false,
    timestamps: true
});

module.exports = model("user", userSchema);

// /api/users/register

