import { useNavigate } from "react-router";
import styles from "./Cart.module.scss";
import "./Radio.scss";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, saveCartDB, selectCartItems, selectCartTotalAmount } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card"
import { selectCartTotalQuantity } from "../../redux/features/cart/cartSlice";
import { useEffect } from "react";
import PaymentOptions from "../../components/paymentOption/PaymentOptions";

function Cart () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    // Augmente la quantité d'un produit dans le panier et sauvegarde le panier mis à jour dans la base de données.
    const increaseCart = (product) => {
        dispatch(ADD_TO_CART(product));
        dispatch(
            saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
        )

    };
    // pareil mais diminue
    const decreaseCart = (product) => {
        dispatch(DECREASE_CART(product));
        dispatch(
            saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
        )
    };
    // supp and save
    const removeFromCart = (cart) => {
        dispatch(REMOVE_FROM_CART(cart));
        dispatch(
          saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
        );
      };

      const clearCart = () => {
        dispatch(CLEAR_CART());
        dispatch(
            saveCartDB({ cartItems: [] })
        )
      };

    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL());
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }, [cartItems, dispatch]);

  return (
    <div className={`container ${styles.table}`}>
        <h2>Panier</h2>
        {/* cart without item(s) */}
        {cartItems?.length === 0 ? (
            <>
                <p>Ton panier est vide</p>
                <div>
                    <Link to="/shop">&larr; Continue tes achats</Link>
                </div>
            </>
        ) : (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>s/n</th>
                            <th>Produit</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* cart with item(s) */}
                        {cartItems?.map((cart, index) => {
                            const { _id, name, price, image, cartQuantity } = cart;
                            return (
                                <tr key={_id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <p>
                                            <b>
                                               {name} 
                                            </b>
                                        </p>
                                        <img src={image[0]} alt={name} style={{width:"100px"}}/>
                                    </td>
                                    <td>{price}</td>
                                    <td>
                                        <div className={styles.count}>
                                                <>
                                                <button
                                                    className="--btn"
                                                    onClick={() => decreaseCart(cart)}
                                                >
                                                    -
                                                </button>
                                                <p>
                                                    <b>{cartQuantity}</b>
                                                </p>
                                                <button
                                                    className="--btn"
                                                    onClick={() => increaseCart(cart)}
                                                >
                                                    +
                                                </button>
                                                </>
                                        </div>
                                    </td>
                                    <td>{(price * cartQuantity).toFixed(2)}</td>
                                    <td className={styles.icons}>
                                        <FaTrashAlt size={19} color="red" onClick={() => removeFromCart(cart)} />
                                    </td>
                                </tr>
                            )
                            })
                        }
                    </tbody>
                </table>

                <div className={styles.summary}>
                    <button className="--btn --btn-danger" onClick={clearCart}>
                         Vider le Panier
                    </button>
                    <div className={styles.checkout}>
                        <Link to={"/shop"}>&larr; Continue ton shopping</Link>
                    </div>
                    <br />
                        <Card cardClass={styles.card}>
                            <p>
                                <b> {`Cart item(s): ${cartTotalQuantity}`}</b>
                            </p>
                            <div className={styles.text}>
                                <h4>Total:</h4>
                                <h3>{`${cartTotalAmount?.toFixed(2)}€`}</h3>
                            </div>
                            <div className="--underline">
                                <PaymentOptions />
                            </div>
                        </Card>
                    </div>
            </>
        )}
    </div>
  )
};


export default Cart;
