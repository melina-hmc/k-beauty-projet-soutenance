import React, { useEffect } from "react";
// import dotenv from 'dotenv';
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
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authSlice";

axios.defaults.withCredentials = true;
// Deploy

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLoginStatus())
    }, [dispatch])
    
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;