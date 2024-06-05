import React, { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";
import { useNavigate } from "react-router";
import "./AddProduct.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET_PROD, createProduct } from "../../../redux/features/product/productSlice";

const initialState = {
  name: "",
  category: "",
  brand: "",
  quantity: "",
  price: "",
  color: "",
  regularPrice: "",
};

function AddProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState(initialState);
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);

    const { isLoading, message } = useSelector((state) => state.product)
    const { name, category, brand, price, quantity, color, regularPrice } = product; 
        
      const generateSKU = (category) => {
        const letter = category.slice(0, 3).toUpperCase();
        const number = Date.now();
        const sku = letter + "-" + number;
        return sku;
    };
    
    const saveProduct = async (e) => {
        e.preventDefault();
        if (files.length < 1) {
              return toast.info("Please add an image");
            }

        const formData = {
            name,
            sku: generateSKU(category),
            category,
            brand,
            color,
            quantity: Number(quantity),
            regularPrice,
            price,
            description,
            image: files
          };
      
        //   console.log(formData);
      
          await dispatch(createProduct(formData));
      
        };
        useEffect(() => {
            if(message === "Product created successfully") {
                navigate("/admin/all-products");
            }
            dispatch(RESET_PROD())
        }, [message, navigate, dispatch])
        
  return (
    <section>
        <div className="container">
        {isLoading && <Loader />}
        <h3 className="--mt">Add New Product</h3>

        <ProductForm
            files={files}
            setFiles={setFiles}
            product={product}
            setProduct={setProduct}
            description={description}
            setDescription={setDescription}
            saveProduct={saveProduct}
            isEditing={false}
        />
        </div>
    </section>
  );
};

export default AddProduct;
