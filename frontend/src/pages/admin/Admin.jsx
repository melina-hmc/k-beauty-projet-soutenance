import React from "react";
import AdminHome from "../../components/admin/AdminHome/AdminHome";
import Navbar from "../../components/admin/navbar/Navbar";
import "../admin/_admin.scss";
import { Route, Routes } from "react-router";
import Category from "../../components/admin/category/Category";
import Brand from "../../components/admin/brand/Brand";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import AddProduct from "../../components/admin/addProduct/AddProduct";
import EditProduct from "../../components/admin/editProduct/EditProduct";


function Admin() {
    return(
        <div className="admin">
            <div className="navbar">
                <Navbar />
            </div>
            <div> 
                {/* y'avait dans la div du dessus une div "content" mais elle faisait disparaitre tout le texte donc je l'ai enlever, je verrais si je la remet ou pas */}
                <Routes>
                    <Route path="home" element={<AdminHome/>} />
                    <Route path="category" element={<Category/>} />
                    <Route path="brand" element={<Brand/>} />

                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="all-products" element={<ViewProducts/>} />
                    <Route path="edit-product/:id" element={<EditProduct/>} />




                </Routes>
            </div>
        </div>
    )
};

export default Admin;