import React, { useContext, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import { ToastContainer } from 'react-toastify';
import injectContext, { Context } from "./store/appContext";

import ChewyNavbar from "./component/Navbar.jsx";
import Authentication from "./pages/authentication.js";
import Home from "./pages/home";
import Footer from "./component/Footer.jsx";
import ScrollToTop from "./component/scrollToTop.js";

// INSTANCIAS QUE NO SON PRIORIDAD DE CARGA INICIAL AL INGRESAR A LA APLICACIÓN
const CategoryDog = lazy(() => import("./pages/productDog"));
const CategoryCat = lazy(() => import("./pages/productCat"));
const Offer = lazy(() => import("./component/Offer.jsx"));
const Single = lazy(() => import("./pages/single"));
const ProductDetail = lazy(() => import("./component/ProductDetail.jsx"));
const ForgotPassword = lazy(() => import("./component/ForgotPassword.jsx"));
const Cart = lazy(() => import("./component/Cart.jsx"));
const Me = lazy(() => import("./component/Me.jsx"));
const Demo = lazy(() => import("./pages/demo"));


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
                    <Suspense fallback={<div>Cargando contenido...</div>}>
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<CategoryDog />} path="/products-dogs" />
                            <Route element={<CategoryCat />} path="/products-cats" />
                            <Route element={<Offer />} path="/Offers" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<ProductDetail />} path="/product/:id" />
                            <Route element={<Authentication />} path="/authentication" />
                            <Route element={<ForgotPassword />} path="/forgotpassword" />
                            <Route element={<Cart />} path="/cart" />
                            <Route element={<Me />} path="/me" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                    </Suspense>
                    <ToastContainer />
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
