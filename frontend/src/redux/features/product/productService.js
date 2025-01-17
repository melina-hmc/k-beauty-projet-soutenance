import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products/`;

// Create New Product
const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all products
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

// Review Product
const reviewProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}review/${id}`, formData);
  return response.data.message;
};

// Delete Review
const deleteReview = async (id, formData) => {
  const response = await axios.patch(`${API_URL}deleteReview/${id}`, formData);
  return response.data.message;
};

// Update Review
const updateReview = async (id, formData) => {
  const response = await axios.patch(`${API_URL}updateReview/${id}`, formData);
  return response.data.message;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
};

export default productService;
