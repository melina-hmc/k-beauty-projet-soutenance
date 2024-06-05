// import styles from "./ProductDetails.module.scss";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   ADD_TO_CART,
//   CALCULATE_TOTAL_QUANTITY,
//   DECREASE_CART,
//   saveCartDB,
//   selectCartItems,
// } from "../../../redux/features/product/cartSlice";
// import Card from "../../card/Card";
// // import StarsRating from "react-star-rate";
// import { Spinner } from "../../loader/Loader";
// import { getProduct } from "../../../redux/features/product/productSlice";
// import DOMPurify from "dompurify";
// // import StarsRating from "react-star-rate";
// import { addToWishlist } from "../../../redux/features/auth/authSlice";
// import StarRating from "react-star-ratings";
// import { calculateAverageRating, getCartQuantityById } from "../../../utils";
// import ProductRating from "../productRating/ProductRating";
// import { toast } from "react-toastify";
// import ProductRatingSummary from "../productRating/productRatingSummary";

const ProductDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const cartItems = useSelector(selectCartItems);
//   const [imageIndex, setImageIndex] = useState(0);
//   const { product, isLoading } = useSelector((state) => state.product);

//   const slideLength = product?.image?.length;
//   const nextSlide = () => {
//     setImageIndex(imageIndex === slideLength - 1 ? 0 : imageIndex + 1);
//   };
//   let slideInterval;
//   useEffect(() => {
//     if (product?.image?.length > 1) {
//       const auto = () => {
//         slideInterval = setInterval(nextSlide, 3000);
//       };
//       auto();
//     }
//     return () => clearInterval(slideInterval);
//   }, [imageIndex, slideInterval, product]);

//   useEffect(() => {
//     dispatch(getProduct(id));
//   }, [dispatch, id]);

//   const cart = cartItems.find((cart) => cart._id === id);
//   const isCartAdded = cartItems.findIndex((cart) => {
//     return cart._id === id;
//   });

//   const addToCart = (product) => {
//     dispatch(ADD_TO_CART(product));
//     dispatch(CALCULATE_TOTAL_QUANTITY());
//     dispatch(
//       saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
//     );
//   };

//   const decreaseCart = (product) => {
//     dispatch(DECREASE_CART(product));
//     dispatch(CALCULATE_TOTAL_QUANTITY());
//     dispatch(
//       saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
//     );
//   };
//   // console.log(product);
//   const addWishlist = (product) => {
//     const productData = {
//       productId: product._id,
//     };
//     console.log(productData);
//     dispatch(addToWishlist(productData));
//   };
//   const averageRating = calculateAverageRating(product?.ratings);
//   // console.log(product);

  return (
    <section>
        <div>
            <h3>ProductDetails</h3>
        </div>
    </section>
  );
};

export default ProductDetails;
