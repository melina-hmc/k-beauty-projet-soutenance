const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");
const slugify = require("slugify");

const createBrand = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    if (!name || !category) {
        res.status(400);
        throw new Error("Merci de remplir tous les champs");
    }

    // check existence of parent category
    const categoryExists = await Category.findOne({ name: category });
    if (!categoryExists) {
        res.status(400);
        throw new Error("Parent category not found");
    }

    const brand = await Brand.create({
        name,
        slug: slugify(name),
        category,
    });
    if (brand) {
        res.status(201).json(brand);
    }
});

// Get Brands
const getBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find().sort("-createdAt");
    res.status(200).json(brands);
});

// Delete Brand
const deleteBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findOneAndDelete({ slug: req.params.slug });
    if (!brand) {
        res.status(404);
        throw new Error("Brand not found");
    }
    res.status(200).json({ message: "Brand deleted" });
});

module.exports = {
    createBrand,
    getBrands,
    deleteBrand,
};
