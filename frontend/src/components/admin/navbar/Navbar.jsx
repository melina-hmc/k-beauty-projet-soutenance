import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { selectUser } from "../../../redux/features/auth/authSlice";
import styles from "./_navbar.module.scss";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")

function Navbar() {
    const user = useSelector(selectUser);
    const username = user?.name;

  return (
    <div className={styles.navbar}>
        <div className={styles.user}>
            <FaUserCircle size={40} color="f5f5f5" />
            <h4>{username}</h4>
        </div>

        <nav>
            <ul>
                <li>
                    <NavLink to={"/admin/home"} className={activeLink}>
                        Accueil
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/all-products"} className={activeLink}>
                        Tout les produits
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/add-product"} className={activeLink}>
                        Ajouter des produits
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/order"} className={activeLink}>
                        Commandes
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/category"} className={activeLink}>
                        Catégories
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/brand"} className={activeLink}>
                        Marques
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
  );
};

export default Navbar;
