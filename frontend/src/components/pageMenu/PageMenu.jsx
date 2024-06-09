import { NavLink } from "react-router-dom";

function PageMenu() {

    return (
        <div>
            <nav className="--bg-primary --p --mb">
                <ul className="home-links">
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order-history">Mes commandes</NavLink>
                    </li>
                    <li>
                        <NavLink to="/wishlist">Favoris</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default PageMenu;