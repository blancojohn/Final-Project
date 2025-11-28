import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import ProductDetails from "./component/ProductDetails.jsx";
import Cart from "./component/Cart.jsx";
import { Home } from "./pages/home";
import RegisterLogin from "./pages/registerLogin.js";
import Me from "./component/Me.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext, { Context } from "./store/appContext";

import { ChewyNavbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ToastContainer } from 'react-toastify';
import { Categoriap } from "./component/Categoriap.jsx";
import { Categoriag } from "./component/Categoriag.jsx";
import { Offer } from "./component/Offer.jsx";
import ForgotPassword from "./component/ForgotPassword.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <ChewyNavbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Categoriap />} path="/Perros" />
                        <Route element={<Categoriag />} path="/Gatos" />
                        <Route element={<Offer />} path="/Ofertas" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<ProductDetails />} path="/product/:id" />
                        <Route element={<RegisterLogin />} path="/register" />
                        <Route element={<ForgotPassword />} path="/forgotpassword" />
                        <Route element={<Cart />} path="/cart" />
                        <Route element={<Me />} path="/me" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <ToastContainer />
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
