import React, { useEffect } from "react";
import "./Brand.scss";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../../redux/features/categoryAndBrand/categoryAndBrandSlice";
import BrandList from "./BrandList";
import CreateBrand from "./CreateBrand";

const Brand = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const reloadBrands = () => {
    dispatch(getBrands());
  };

  return (
    <section>
      <div className="container coupon">
        <CreateBrand reloadBrands={reloadBrands} />
        <BrandList brands={brands} />
      </div>
    </section>
  );
};

export default Brand;
