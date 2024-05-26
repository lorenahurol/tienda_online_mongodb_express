const router = require("express").Router();

const { getAllProducts, createProduct, updateProduct, deleteProduct, getByPrice, addToCart} = require("../../controllers/products.controller");
const { validate } = require("../../helpers/middlewares");
const productSchema = require("../../schemas/product.schema");

// Ruta que entra y funcion que se ejecuta: /api/products
router.get("/", getAllProducts);
router.get("/min/:min_price/max/:max_price", getByPrice);
router.post("/", validate(productSchema), createProduct);
router.post("/", createProduct);
router.put("/:add-cart", addToCart);
router.put("/:product_id", updateProduct);
router.delete("/:product_id", deleteProduct);


module.exports = router;