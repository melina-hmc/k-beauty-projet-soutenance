import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile"
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser } from "./redux/features/auth/authSlice";
import Admin from "./pages/admin/Admin";
import AdminOnlyRoute from "./components/hiddenLink/AdminOnlyRoute";
import NotFound from "./pages/404/NotFound";
import Product from "./pages/shop/Product";

axios.defaults.withCredentials = true;

function App() {

    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLoginStatus())
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn && user === null){
            dispatch(getUser());
        }
    }, [dispatch, isLoggedIn, user]);
    
  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop" element={<Product />} />

            <Route path="/admin/*" element={
            <AdminOnlyRoute>
                <Admin />
            </AdminOnlyRoute>
            } />

            <Route path="*" element={<NotFound />} />

       </Routes> 
        
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;