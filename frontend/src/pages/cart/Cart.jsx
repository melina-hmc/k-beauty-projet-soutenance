import { useNavigate } from "react-router";
import styles from "./Cart.module.scss";
import "./Radio.scss";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, selectCartItems } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

function Cart ({ children, cardClass }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    // const cartTotalAmount = useSelector(selectCartTotalAmount);
    // const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    const increaseCart = (product) => {
        dispatch(ADD_TO_CART(product));

    };
    const decreaseCart = (product) => {
        dispatch(DECREASE_CART(product));

    };
    const removeFromCart = (cart) => {
        dispatch(REMOVE_FROM_CART(cart));
        dispatch(
          saveCartDB({ cartItems: JSON.parse(localStorage.getItem("cartItems")) })
        );
      };

  return (
    <div className={`container ${styles.table}`}>
        <h2>Panier</h2>
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
                                        <img src={image[0      ]} alt={name} style={{width:"100px"}}/>
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
            </>
        )}
    </div>
  )
};


export default Cart;
