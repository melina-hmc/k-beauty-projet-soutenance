import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/`;

// THE CATEGORIES !

// Create Category
const createCategory = async (formData) => {
    const response = await axios.post(API_URL + "category/createCategory", formData);
    return response.data;
};

// Get all Categories
const getCategories = async () => {
    const response = await axios.get(API_URL + "category/getCategories");
    return response.data;
  };
  
  // Delete categories
  const deleteCategory = async (slug) => {
    const response = await axios.delete(API_URL + "category/" + slug);
    return response.data.message;
  };

  // THE BRANDS !
  
  // Create Brand
  const createBrand = async (formData) => {
    const response = await axios.post(API_URL + "brand/createBrand", formData);
    return response.data;
  };
  
  // Get all brands
  const getBrands = async () => {
    const response = await axios.get(API_URL + "brand/getBrands");
    return response.data;
  };
  
  // Delete brand
  const deleteBrand = async (slug) => {
    const response = await axios.delete(API_URL + "brand/" + slug);
    return response.data.message;
  };

const categoryAndBrandService = {
    createCategory,
    createBrand,
    getCategories,
    getBrands,
    deleteCategory,
    deleteBrand,
}

export default categoryAndBrandService;