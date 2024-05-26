// Traer el modelo de producto:
const { json } = require("express");
const Product = require("../models/product.model");

const getAllProducts = async (req, res, next) => {
    // Acciones sobre el modelo product:
    try {
        // Populate: Extrae la informacion del campo owner:
        const products = await Product.find().populate("owner");
        /*
        // Iterar sobre los productos:
        for (let prod of products) {
            console.log(prod.priceTaxes);
        } */
        res.json(products);
    }catch (error) {
        next(error);
    }
}

const getByPrice = async (req, res, next) => {
    const { min_price, max_price } = req.params;

    try {
        const products = await Product.find({
            // Pasarle un objeto con las comparaciones numericas:
            price: { $gte: min_price, $lte: max_price }
        })
        res.json(products);
    } catch (error) {
        next(error);
    }
}

const addToCart = async (req, res, next) => {
    // Usuario loggeado, cart e insertamos:
    try {
        req.user.cart.push(req.body.product_id);
        await req.user.save();
        res.json({ message: "Producto agregado al carrito " });
    } catch (error) {
        next(error);
    }
    
}

const createProduct = async (req, res, next) => {

    // Anadir el usuario loggeado al body del producto:
    req.body.owner = req.user._id;

    // Le pasamos el body:
    try {
        const prod = await Product.create(req.body);
        res.json(prod);
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    // Recuperamos el id de los params de la url:
    const { product_id } = req.params;

    // Buscar por ID y pasarle el body actualizado.
    // Para extraer el objeto nuevo tras la actualizacion: new: true
    try {
        const prod = await Product.findByIdAndUpdate(product_id, req.body, { new: true });
        res.json(prod);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    const { product_id } = req.params;

    try {
        const prod = await Product.findByIdAndDelete(product_id);
        res.json(prod);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts, createProduct, updateProduct, deleteProduct, getByPrice, addToCart
}