import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import ProductForm from "../productForm/ProductForm";
import {
  RESET_PROD,
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../../redux/features/product/productSlice";

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, message} = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );

    if (productEdit && productEdit.image) {
      setFiles(productEdit.image);
    }

  }, [productEdit]);

  const saveProduct = async (e) => {
    e.preventDefault();
    if (files.length < 1) {
      return toast.info("Please add an image");
    }

    const formData = {
      name: product.name,
      category: product.category,
      brand: product.brand,
      color: product.color,
      quantity: Number(product.quantity),
      regularPrice: product.regularPrice,
      price: product.price,
      description,
      image: files,
    };
    // console.log(formData);
    await dispatch(updateProduct({ id, formData }));
    // await dispatch(getProducts());

    navigate("/admin/all-products");
  };
  useEffect(() => {
    if(message === "Product updated successfully") {
        navigate("/admin/all-products");
    }
    dispatch(RESET_PROD())
}, [message, navigate, dispatch])


  return (
    <section>
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Edit Product</h3>
            <ProductForm
                files={files}
                setFiles={setFiles}
                product={product}
                setProduct={setProduct}
                productImage={productImage}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                description={description}
                setDescription={setDescription}
                saveProduct={saveProduct}
                isEditing={true}
            />
        </div>
    </section>
  );
};

export default EditProduct;
