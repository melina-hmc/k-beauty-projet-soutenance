import { useEffect, useState } from "react";
import loginImg from "../../assets/images/login.png"
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from 'react-redux';
import { RESET_AUTH, register } from "../../redux/features/auth/authSlice";
import { validateEmail } from "../../utils/index.jsx"
import Loader from "../../components/loader/Loader.jsx";
import { toast } from "react-toastify";


const initialState = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
};

function Register(){
    const [formData, setFormData] = useState(initialState);
    const { name, email, password, cPassword} = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, isLoggedIn, isSuccess} = useSelector((state) => state.auth);


    const handleInputChange = (e) => {
        const { name, value} = e.target
        setFormData({ ...formData, [name]: value});
    }

  const registerUser = async (e) => {
    e.preventDefault();
    if (!email || !password){
        return toast.error("All fields are required")
    }
    if (password.length < 6){
        return toast.error("Password must be up to 6 characters")
    }
    if (!validateEmail(email)){
        return toast.error("Please enter a valid email")
    }
    if (password !== cPassword){
        return toast.error("Password do not match")
    }

    const userData = {
        name,
        email,
        password
    }

    await dispatch(register(userData));

  };

  useEffect(() => {
    if (isSuccess && isLoggedIn){
        navigate("/")
    }

    dispatch(RESET_AUTH())
  }, [isSuccess, isLoggedIn, dispatch, navigate])

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${"auth"}`}>
            <Card>
                <div className="form">
                    <h2>Inscription</h2>
                    <form onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                        <input
                        type="text"
                        placeholder="Email"
                        required
                        name= "email"
                        value={email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        name={"password"}
                        value={password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        name="cPassword"
                        value={cPassword}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="--btn --btn-primary --btn-block">
                        Inscription
                    </button>
                </form>
                <span className="register">
                    <p>Tu as déjà un compte ?</p>
                    <Link to="/login">Connexion</Link>
                </span>
                </div>
            </Card>

            <div className="img">
                    <img src={loginImg} alt="Login" width={350} />
                </div>
            </section>
        </>
    )
};

export default Register;