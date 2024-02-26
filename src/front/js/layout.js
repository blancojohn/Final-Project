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
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route element={<RegisterLogin />} path="/register" />
                        <Route path="/cart" element={<Cart />} />
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
