import React, { useContext, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BackendURL } from "./component/backendURL";
import { ToastContainer } from 'react-toastify';
import injectContext, { Context } from "./store/appContext";

import { ChewyNavbar } from "./component/navbar";
import { Home } from "./pages/home";
import { RegisterLogin } from "./pages/registerLogin.js";
import { Footer } from "./component/footer.js";
import ScrollToTop from "./component/scrollToTop.js";

// INSTANCIAS QUE NO SON PRIORIDAD DE CARGA INICIAL AL INGRESAR A LA APLICACIÓN
const Categoriap = lazy(() => import("./component/Categoriap.jsx"));
const Categoriag = lazy(() => import("./component/Categoriag.jsx"));
const Offer = lazy(() => import("./component/Offer.jsx"));
const Single = lazy(() => import("./pages/single"));
const ProductDetails = lazy(() => import("./component/ProductDetails.jsx"));
const ForgotPassword = lazy(() => import("./component/ForgotPassword.jsx"));
const Cart = lazy(() => import("./component/Cart.jsx"));
const Me = lazy(() => import("./component/Me.jsx"));
const Demo = lazy(() => import("./pages/demo"));


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
                    <Suspense fallback={<div>Cargando contenido...</div>}>
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
                    </Suspense>
                    <ToastContainer />
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
