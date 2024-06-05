import React, { useEffect, useState } from "react";
import styles from"./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
// import ReactPaginate from "react-paginate";

function ProductList({products}) {
    const [grid, setGrid] = useState(true);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");

    const dispatch = useDispatch();
    const filteredProducts = useSelector(selectFilteredProducts)

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, search}))
  }, [dispatch, products, search])

  useEffect(() => {
    dispatch(SORT_PRODUCTS({products, sort}))
  }, [dispatch, products, sort])


  return (
    <div className={styles["product-list"]}>
        <div className={styles.top}>
            <div className={styles.icons}>
                <BsFillGridFill
                size={22}
                color="red"
                onClick={() => setGrid(true)}
                />

                <FaListAlt size={24} color="#0066d4" 
                onClick={() => setGrid(false)} 
                />

                <p>
                    <b>{products.length}</b> Produits trouvés.
                </p>
            </div>

            <div>
                <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className={styles.sort}>
                <label>Trier par:</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="latest">Dernier</option>
                    <option value="lowest-price">Prix le plus bas</option>
                    <option value="highest-price">Prix le plus haut</option>
                    <option value="a-z">A - Z</option>
                    <option value="z-a">Z - A</option>
                </select>
            </div>
        </div>

        <div className={ grid ?  `${styles.grid}` : `${styles.list}`}>
            {filteredProducts.length === 0 ? (
                <p>Aucun produit trouvé</p>
            ) : (
                <>
                {filteredProducts.map((product) => {
                    return (
                        <div key={product._id}>
                        <ProductItem {...product} grid={grid} product={product}/>
                        </div>
                    )
                })}</>
            )}
        </div>
    </div>
  );
};

export default ProductList;
