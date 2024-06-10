const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { default: mongoose } = require("mongoose");

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
    } = req.body // product data extraction

    if (!name || !category || !brand || !quantity || !price || !description) {
        res.status(400);
        throw new Error("Merci de remplir tous les champs");
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
});

// Get Products
const getProducts = asyncHandler(async (req, res) => {
    // récupère tous les produits et les trie par ordre décroissant de createdAt
    const products = await Product.find().sort("-createdAt")
    res.status(200).json(products);
});

// Get Single Product
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(404);
        throw new Error("Produit non trouvé")
    }
    res.status(200).json(product);
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(404);
        throw new Error("Produit non trouvé")
    }
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "Product Deleted !"});
})

// update product
const updateProduct = asyncHandler(async (req, res) => {
    const { 
        name,
        category,
        brand,
        quantity,
        description,
        image,
        regularPrice,
        price,
        color, 
    } = req.body; // extract new data

    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(404);
        throw new Error("Produit non trouvé")
    }

    // Now, update the product with the new data
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: req.params.id},
        {
            name,
            category,
            brand,
            quantity,
            description,
            image,
            regularPrice,
            price,
            color, 
        },
        {
            new: true, // return updated document
            runValidators: true, // valider les champs du schéma pendant la mise à jour
        }
    )
    res.status(200).json(updatedProduct);
});

// Review product

const reviewProduct = asyncHandler(async (req, res) => {
    // star, review
    const { star, review, reviewDate } = req.body;
    const { id } = req.params;
  
    // validation
    if (star < 1 || !review) {
      res.status(400);
      throw new Error("Veuillez ajouter une étoile et un avis");
    }
  
    const product = await Product.findById(id);
  
    // if product doesnt exist
    if (!product) {
      res.status(404);
      throw new Error("Produit non trouvé");
    }
  
    // if product exist, add/update rating
    product.ratings.push({
      star,
      review,
      reviewDate,
      name: req.user.name,
      userID: req.user._id,
    });
    product.save();
  
    res.status(200).json({ message: "Product review added" });
  });
  
  // Delete review
  const deleteReview = asyncHandler(async (req, res) => {
    const { userID } = req.body;
  
    const product = await Product.findById(req.params.id);
    // if product doesnt exist
    if (!product) {
      res.status(400);
      throw new Error("Product not found");
    }
  
    // filter product reviews to remove userID reviews
    const newRatings = product.ratings.filter((rating) => {
      return rating.userID.toString() !== userID.toString();
    });
    product.ratings = newRatings;
    product.save();
    res.status(200).json({ message: "Product review deleted" });
  });
  
  // Update Review
  const updateReview = asyncHandler(async (req, res) => {
    const { star, review, reviewDate, userID } = req.body;
    const { id } = req.params;
  
    // validation
    if (star < 1 || !review) {
      res.status(400);
      throw new Error("Please add star and review");
    }
  
    const product = await Product.findById(id);
  
    // if product doesnt exist
    if (!product) {
      res.status(400);
      throw new Error("Product not found");
    }
    // Match user to review
    if (req.user._id.toString() !== userID) {
      res.status(401);
      throw new Error("User not authorized");
    }
  
    // Update Product review
    const updatedReview = await Product.findOneAndUpdate(
      { _id: product._id,
        "ratings.userID": mongoose.Types.ObjectId(userID)
      },
      {
        $set: {
          "ratings.$.star": Number(star),
          "ratings.$.review": review,
          "ratings.$.reviewDate": reviewDate,
        },
      }
    );
  
    if (updatedReview) {
      res.status(200).json({ message: "Product review updated" });
    } else {
      res.status(400).json({ message: "Product review NOT updated" });
    }
  });
  
  module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    reviewProduct,
    deleteReview, 
    updateReview,
  };
  