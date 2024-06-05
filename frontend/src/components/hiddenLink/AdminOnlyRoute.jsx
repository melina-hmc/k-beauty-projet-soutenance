import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";


function AdminOnlyRoute({ children }) {

    const user = useSelector(selectUser);
    const userRole = user?.role;


    if (userRole === "admin") {
        return children;
    }

    return(
        <section style={{ height: "80vh" }}>
            <div className="container">
                <h2>Permission refusée</h2>
                <p>Cette page est seulement accessible pour les utilisateurs admin !</p>
                <br />

                <Link to={"/"}>
                    <button className="--btn">
                        Back to Home
                    </button>
                </Link>
            </div>
        </section>
    )
};

export const AdminOnlyLink = ({children}) => {
    const user = useSelector(selectUser);
    const userRole = user?.role;


    if (userRole === "admin") {
        return children;
    }
    return null
}

export default AdminOnlyRoute;