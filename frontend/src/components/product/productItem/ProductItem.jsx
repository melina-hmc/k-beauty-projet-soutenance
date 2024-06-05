import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import Card from "../../card/Card";
import {
  shortenText,
} from "../../../utils";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import { ADD_TO_CART, saveCartDB, selectCartItems } from "../../../redux/features/cart/cartSlice";

const ProductItem = ({
product, grid, _id, name, price, image, regularPrice
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(
      saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
    );
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
       <Link to={`/product-details/${_id}`}>
        <div className={styles.img}>
            <img src={image[0]} alt={name} />
        </div>
       </Link>

       <div className={styles.content}>
            <div className={styles.details}>
                <p>
                    <span>{regularPrice > 0 && <del>{regularPrice}€</del>}</span>
                    {` ${price}€`}
                </p>
                <h4>Note ***</h4>
                <h4>{shortenText(name, 18)}</h4>

                {!grid && (
                    <div dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                            shortenText(product?.description, 150)
                        )
                    }}>

                    </div>
                )}

                {product?.quantity > 0 ? (
                    <button className="--btn --btn-primary" onClick={() => addToCart(product)}>
                        Ajouter dans le panier
                    </button>
                ) : (<button className="--btn --btn-red" onClick={() => toast.error("Désolé, le produit est en rupture de stock")}>
                Rupture de stock
            </button>)}
            </div>
       </div>
   

    </Card>

  );
};

export default ProductItem;
