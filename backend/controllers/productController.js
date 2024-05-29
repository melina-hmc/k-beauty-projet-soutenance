const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Create Product
const createProduct = asyncHandler(async (req, res) => {
    const { 
        name,
        sku,
        category,
        brand,
        quantity,
        description,
        image,
        regularPrice,
        price,
        color, 
    } = req.body

    if (!name || !category || !brand || !quantity || !price || !description) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    // Create product
    const product = await Product.create({
        name,
        sku,
        category,
        quantity,
        brand,
        price,
        description,
        image,
        regularPrice,
        color,
    })

    res.status(201).json(product);
})

module.exports = {
    createProduct,
};