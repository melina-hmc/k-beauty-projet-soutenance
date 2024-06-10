import { useEffect, useState } from "react";
import loginImg from "../../assets/images/login.png"
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, login } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import { getCartDB } from "../../redux/features/cart/cartSlice";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth);

  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password){
        return toast.error("All fields are required")
    }
    if (!validateEmail(email)){
        return toast.error("Please enter a valid email")
    }
    const userData = {
        email,
        password
    }
    // console.log(userData);
    await dispatch(login(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn){
        // navigate("/")
        dispatch(getCartDB())
    }
    dispatch(RESET_AUTH())
  }, [isSuccess, isLoggedIn, dispatch, navigate])

    return (

        <>
            {isLoading && <Loader />}
                <section className={`container ${"auth"}`}>
                    <div className="img">
                        <img src={loginImg} alt="Login" width={400} />
                    </div>
                <Card>
                    <div className="form">
                        <h2>Connexion</h2>
                        <form onSubmit={loginUser}>
                            <input
                            type="text"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="--btn --btn-primary --btn-block">
                            Connexion
                        </button>
                    </form>
                    <span className="register">
                        <p>Tu n'as pas de compte ?</p>
                        <Link to="/register">Inscription</Link>
                    </span>
                    </div>
            </Card>
            </section>
    </>
    )
};

export default Login;