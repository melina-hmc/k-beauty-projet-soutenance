import styles from "./ProductDetails.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  saveCartDB,
  selectCartItems,
} from "../../../redux/features/product/cartSlice";
import { Spinner } from "../../loader/Loader";
import { getProduct } from "../../../redux/features/product/productSlice";
import DOMPurify from "dompurify";
// import { addToWishlist } from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const { product, isLoading } = useSelector((state) => state.product);
  const cartItems = useSelector(selectCartItems);

  const slideLength = product?.image?.length;
  const nextSlide = () => {
    setImageIndex(imageIndex === slideLength - 1 ? 0 : imageIndex + 1);
  };

  let slideInterval;
  useEffect(() => {
    if (product?.image?.length > 1) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, 2000);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [imageIndex, slideInterval, product]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);


  const cart = cartItems.find((cart) => cart._id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart._id === id;
  });

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    // dispatch(CALCULATE_TOTAL_QUANTITY());
    // dispatch(
    //   saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    // );
  };
  // console.log(product);
  const addWishlist = (product) => {
    const productData = {
      productId: product._id,
    };
    console.log(productData);
    // dispatch(addToWishlist(productData));
  };

  return (
    <section>
        <div className={`container ${styles.product}`}>
            <h2>Détails du produit:</h2>
            <div>
                <Link to="/shop">&larr; Retour aux produits</Link>
            </div>

            {isLoading ? (
                <Spinner/>
            ) : (
                <>
                <div className={styles.details}>
                    <div className={styles.img}>
                    <img
                        src={product?.image[imageIndex]}
                        alt={product?.name}
                        className={styles.pImg}
                />
                        <div className={styles.smallImg}>
                            {product?.image.map((img, index) => {
                                return (
                                    <img key={index} src={img} alt="product" onClick={() => setImageIndex(index)}
                                    className={imageIndex === index ? "activeImg" : ""}/>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles.content}>
                        <h3>{product?.name}</h3>

                        <div className="--underline"></div>
                            <div className={styles.property}>
                                <p>
                                    <b>Prix:</b>
                                </p>
                                <p className={styles.price}>{`${product?.price}€`}</p>
                            </div>
                            <div className={styles.property}>
                            <p>
                                <b>SKU:</b>
                            </p>
                            <p>{product?.sku}</p>
                            </div>
                            <div className={styles.property}>
                                <p>
                                    <b>Catégorie: </b>
                                </p>
                                <p>{product?.category}</p>
                            </div>
                            <div className={styles.property}>
                                <p>
                                    <b>Marque: </b>
                                </p>
                                <p>{product?.brand}</p>
                            </div>
                            <div className={styles.property}>
                                <p>
                                    <b>Couleur: </b>
                                </p>
                                <p>{product?.color}</p>
                            </div>
                            <div className={styles.property}>
                                <p>
                                    <b>Quantité en stock: </b>
                                </p>
                            <p>{product?.quantity}</p>
                            </div>
                            <div className={styles.property}>
                                <p>
                                    <b>Sold: </b>
                                </p>
                                <p>{product?.sold}</p>
                            </div>

                            <div className={styles.count}>
                                {isCartAdded < 0 ? null : (
                                    <>
                                    <button
                                        className="--btn"
                                        onClick={() => decreaseCart(product)}
                                    >
                                        -
                                    </button>
                                    <p>
                                        <b>{cart.cartQuantity}</b>
                                    </p>
                                    <button
                                        className="--btn"
                                        onClick={() => addToCart(product)}
                                    >
                                        +
                                    </button>
                                    </>
                                )}
                            </div>

                            <div className="--flex-start">
                                {product?.quantity > 0 ? (
                                    <button className="--btn --btn-primary" onClick={() => addToCart(product)}>
                                        Ajouté dans le panier
                                    </button>
                                ) : (
                                    <button className="--btn --btn-red" onClick={() =>
                                        toast.error("Désolé, le produit est en rupture de stock")
                                    }>
                                        Rupture de stock
                                    </button>
                                )}
                                <button className="--btn --btn-danger">
                                        Ajouté en favoris
                                </button>
                                <div className="--underline">
                                <p>
                                    <b>Description du produit:</b>
                                </p>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(product?.description),
                                    }}>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    </section>
  );
};

export default ProductDetails;
