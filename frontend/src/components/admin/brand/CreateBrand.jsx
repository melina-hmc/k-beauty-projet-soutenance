import React, { useEffect, useState } from "react";
import Card from "../../card/Card";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import { createBrand, getBrands, getCategories } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";

const CreateBrand = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);
  const { isLoading, categories } = useSelector((state) => state.category);

  const saveBrand = async (e) => {
    e.preventDefault();
    if (name.length < 2) {
      return toast.error("name must be up to 2 characters");
    }
    if (!category) {
      return toast.error("Please add a parent category");
    }
    const formData = {
      name,
      category,
    };
    console.log(formData);
    await dispatch(createBrand(formData));
    await dispatch(getBrands());
    setName("");
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="--underline"></div>
      <br />
      <div className="--mb2">
        <h3>Créer une marque</h3>
        <p>
          Use the form to <b>Create a Brand.</b>
        </p>
        <Card cardClass={"card"}>
          <br />
          <form onSubmit={saveBrand}>
            <label>Nom de la marque:</label>
            <input
              type="text"
              placeholder="Brand name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}>
              <option>Select category</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._name}>
                    {cat.name}
                  </option>
                ))}
            </select>

            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Brand
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default CreateBrand;
