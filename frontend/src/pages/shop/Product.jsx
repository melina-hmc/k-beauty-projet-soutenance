import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCogs } from "react-icons/fa";
import styles from "./Product.module.scss";
import {
  GET_PRICE_RANGE,
  getProducts,
  selectIsLoading,
  selectProducts,
} from "../../redux/features/product/productSlice";
import { Spinner } from "../../components/loader/Loader";
import ProductList from "../../components/product/productList/ProductList";
import ProductFilter from "../../components/product/productFilter/ProductFilter";

function Product() {
//   const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(false);
  const {isLoading, products} = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

//   useEffect(() => {
//     dispatch(
//       GET_PRICE_RANGE({
//         products: products,
//       })
//     );
//   }, [dispatch, products]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
        <div className={`container ${styles.product}`}>
            <aside className={ showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
                {isLoading ? null : <ProductFilter />}
            </aside>

            <div className={styles.content}>
                {isLoading ? <Spinner /> : <ProductList products={products} />}
                <div className={styles.icon} onClick={toggleFilter}>
                    <FaCogs size={20} color="red" />
                    <p>
                        <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
                    </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
