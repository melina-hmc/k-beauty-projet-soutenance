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
import ReactPaginate from "react-paginate";

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

    // Begin Pagination = changer de page
    const itemsPerPage = 8;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
      setItemOffset(newOffset);
    };
    // End Pagination

  return (
    <div className={styles["product-list"]}>
        <div className={styles.top}>
            <div className={styles.icons}>
                <BsFillGridFill
                size={22}
                color="purple"
                onClick={() => setGrid(true)}
                />

                <FaListAlt size={24} color="pink" 
                onClick={() => setGrid(false)} 
                />

                <p>
                    <b>{currentItems.length}</b> Produits trouvés.
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
                {currentItems.map((product) => {
                    return (
                        <div key={product._id}>
                        <ProductItem {...product} grid={grid} product={product}/>
                        </div>
                    )
                })}</>
            )}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="Suivant"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Précédent"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />

    </div>
  );
};

export default ProductList;
