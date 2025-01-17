import React, { useEffect, useState } from "react";
import { NavLink , Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, logout } from "../../redux/features/auth/authSlice";
import ShowOnLogin , { ShowOnLogout } from "../hiddenLink/hiddenLink";
import logoImg from "../../assets/images/whitelogo.png";
import { UserName } from "../../pages/profile/Profile";
import { AdminOnlyLink } from "../hiddenLink/AdminOnlyRoute";
import { FaRegUser } from "react-icons/fa";
import { CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalQuantity } from "../../redux/features/cart/cartSlice";
import { FaRegHeart } from "react-icons/fa";

export const logo = (
    <div className='logo'>
        <Link to="/">
            <h2>
                <img src={logoImg} alt="logo in white" />
            </h2>
        </Link>
    </div>
)

const activeLink = ({isActive}) => (isActive ?  `active` : "") // change the style css when the link is active

function Header(){

    const [showMenu, setShowMenu] = useState(false);
    const [scrollPage, setScrollPage] = useState(false);
    const cartItems = useSelector(selectCartItems);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function fixNavbar(){
        if (window.scrollY > 50) {
            setScrollPage(true)
        } else {
            setScrollPage(true)
        }
    };
    window.addEventListener("scroll", fixNavbar);

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    };
    const hideMenu = () => {
        setShowMenu(false)
    };

    const logoutUser = async () => {
        await dispatch(logout());
        await dispatch(RESET_AUTH());
        navigate("/login")

    };

    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }, [cartItems, dispatch]);
    

    const cart = (
        <span className="cart">
            <Link to={"cart"}>
                <IoCartOutline size={20} />
                <p>{cartTotalQuantity}</p>
            </Link>
        </span>
    )

    return (
        <header className={scrollPage ? `${"fixed"}` : null}> 
            <div className='header'>{logo}
                <nav className={showMenu ? "show-nav" : "hide-nav"}>

                    <div className={showMenu ? ["nav-wrapper" , "show-nav-wrapper"]: "nav-wrapper"} onClick={hideMenu}>
                    </div>

                    <ul>
                        <li className="logo-mobile">
                            {logo}
                            <FaTimes size={22} color="#fff" onClick={hideMenu}/>
                        </li>
                        <li>
                            <NavLink to={"shop"} className={activeLink}>
                                Nos produits
                           </NavLink>
                        </li>

                            <AdminOnlyLink>
                        <li>
                            <NavLink to={"/admin/home"} className={activeLink}>
                                Admin
                           </NavLink>
                        </li>
                            </AdminOnlyLink>

                    </ul>

                    <div className="header-right">
                        <span className="links">

                            <ShowOnLogin>
                            <Link to={"profile"}>
                                <FaRegUser size={16}/>
                                <UserName />
                            </Link>
                            </ShowOnLogin>

                            <ShowOnLogout>
                            <NavLink to={"login"} className={activeLink}>
                                Connexion
                            </NavLink>
                            </ShowOnLogout>

                            <ShowOnLogin>
                                <Link to={"/wishlist"}>
                                <FaRegHeart size={17}/>
                                </Link>
                            </ShowOnLogin>

                            <ShowOnLogin>
                            <Link to={"/"} onClick={logoutUser}>
                                <MdOutlineLogout
                                size={17}/>
                            </Link>
                            </ShowOnLogin>

                        </span>
                        {cart}
                    </div>
                </nav>

                <div className="menu-icon">
                    {cart}
                    <IoIosMenu size={30} onClick={toggleMenu}/>
                </div>
            </div>
        </header>
    )
}

export default Header;