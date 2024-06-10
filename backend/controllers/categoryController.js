const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Category = require("../models/categoryModel");

// Create Category
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Please fill in category name");
    }
    const categoryExists = await Category.findOne({ name: name });
    if (categoryExists) {
      res.status(400);
      throw new Error("Category name already exists.");
    }

    const category = await Category.create({
      name,
      slug: slugify(name),
    });
      res.status(201).json(category);
  });


  // Get Categories
  const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().sort("-createdAt");
    res.status(200).json(categories);
  });

  // Delete the categories
  const deleteCategory = asyncHandler(async (req, res) => {
    // deleted by the category slug
    const slug = req.params.slug.toLowerCase();
    const category = await Category.findOneAndDelete({ slug: slug });
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
    res.status(200).json({ message: "Category deleted" });
  });

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
};
