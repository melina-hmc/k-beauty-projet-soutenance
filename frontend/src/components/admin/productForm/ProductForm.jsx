import React, { useEffect, useState } from "react";
import Card from "../../card/Card";
import "./ProductForm.scss";
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";
import { getBrands, getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductForm({
  saveProduct,
  isEditing, 
  files,
  setFiles,
  product,
  setProduct,
  description,
  setDescription,
}) {
    const dispatch = useDispatch();
    const [filteredBrands, setFilteredBrands] = useState([]);
    const { categories, brands } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getBrands());
      }, [dispatch]);

        // Filter Brands based on selectCategory
    function filterBrands(selectedCategory) {
        const newBrands = brands.filter(
          (brand) => brand.category === selectedCategory
        );
        setFilteredBrands(newBrands);
      }
      
      useEffect(() => {
        filterBrands(product?.category);
        // console.log(filteredBrands);
      }, [product?.category, brands]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value});
      }


  const removeImage = (image) => {
    console.log(image);
    setFiles(files.filter((img) => img !== image));
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="add-product">
      <UploadWidget files={files} setFiles={setFiles} />
      <Card cardClass={"card"}>
        <br />
        <form onSubmit={saveProduct}>
        <label>Product Images:</label>
          <div className="slide-container">
            <aside>
              {files.length > 0 &&
                files.map((image) => (
                  <div key={image} className="thumbnail">
                    <img src={image} alt="productImage" height={100} />
                    <div>
                      <BsTrash
                        size={16}
                        className="thumbnailIcon"
                        onClick={() => removeImage(image)}
                      />
                    </div>
                  </div>
                ))}
              {files.length < 1 && (
                <p className="--m">No image set for this poduct.</p>
              )}
            </aside>
          </div>
          <br />
            <label>Product Name:</label>
            <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            required
          />

        <label>Product Category:</label>
          <select
            name="category"
            value={product?.category}
            className="form-control"
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.category}>{product?.category}</option>
            ) : (
              <option>Select Category</option>
            )}
            {categories.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>

          <label>Product Brand:</label>
          <select
            name="brand"
            value={product?.brand}
            className="form-control"
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option>{product?.brand}</option>
            ) : (
              <option>Select Brand</option>
            )}

            {filteredBrands.length > 0 &&
              filteredBrands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
          </select>

          <label>Product Color:</label>
          <input
            type="text"
            placeholder="Color"
            name="color"
            value={product?.color}
            onChange={handleInputChange}
          />

          <label>Regular Price:</label>
          <input
            type="number"
            placeholder="Regular Price"
            name="regularPrice"
            value={product?.regularPrice}
            onChange={handleInputChange}
          />
          <label>Product Price:</label>
          <input
            type="number"
            placeholder="Product Price"
            name="price"
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type="number"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Product Description:</label>
            <textarea
            type="text"
            placeholder="Product Description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};


export default ProductForm;
