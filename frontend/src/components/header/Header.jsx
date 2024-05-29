import React, { useState } from "react";
import { NavLink , Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { RESET_AUTH, logout } from "../../redux/features/auth/authSlice";
import ShowOnLogin , { ShowOnLogout } from "../hiddenLink/hiddenLink";
import logoImg from "../../assets/images/whitelogo.png";
import { UserName } from "../../pages/profile/Profile";

export const logo = (
    <div className='logo'>
        <Link to="/">
            <h2>
                <img src={logoImg} alt="logo in white" />
            </h2>
        </Link>
    </div>
)

const activeLink = ({isActive}) => (isActive ?  `${'active'}` : "")

function Header(){

    const [showMenu, setShowMenu] = useState(false);
    const [scrollPage, setScrollPage] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function fixNavbar(){
        if (window.scrollY > 50) {
            setScrollPage(true)
        } else {
            setScrollPage(true) // ou false ? je sais pas si il s'est trompé en mettant true ici a la place de false mais ca marche pour les 2.
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
    

    const cart = (
        <span className="cart">
            <Link to={"cart"}>
                Panier
                <IoCartOutline size={20} />
                <p>0</p>
            </Link>
        </span>
    )
    return (
        <header className={scrollPage ? `${"fixed"}` : null}> 
        {/* si y'a un problème avec le haut de page/header, revient à 2h52 pour revoir le header fixé. Actuellement le header est fixé mais cache les images des swiper */}
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

                    </ul>

                    <div className="header-right">
                        <span className="links">

                            <ShowOnLogin>
                            <NavLink to={"login"} className={activeLink}>
                                <FaUserCircle size={16} color="#f5f5f5"/>
                                <UserName />
                            </NavLink>
                            </ShowOnLogin>

                            <ShowOnLogout>
                            <NavLink to={"register"} className={activeLink}>
                                Inscription
                            </NavLink>
                            </ShowOnLogout>

                            <ShowOnLogin>
                            <NavLink to={"order-history"} className={activeLink}>
                                Mes commandes
                            </NavLink>
                            </ShowOnLogin>

                            <ShowOnLogin>
                            <Link to={"/"} onClick={logoutUser}>
                                Déconnexion 
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