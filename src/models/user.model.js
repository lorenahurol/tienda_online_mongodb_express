const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: String
}, {
    versionKey: false,
    timestamps: true
})