import React, { useState } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Register from "../component/Register.jsx";
import Login from "../component/Login.jsx";
import "../../styles/registerLogin.css";

export const RegisterLogin = () => {
    // el estado que guarda cual de los 2 formularios se muestran
    const [isRegister, setIsRegister] = useState(true);

    return (
        <Container
            className="mt-5">
            <Row
                className="justify-content-center">
                <Col md={8} lg={6}>
                    {/* estos son los botones que desencadenan la animacion y el cambio de formulario */}
                    <div
                        className="text-center mb-4">
                        <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => setIsRegister(true)}>
                            Regístrate
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => setIsRegister(false)}>
                            Inicia Sesión
                        </Button>
                    </div>

                    {/* SwitchTransition y CSSTransition de react-transition-group se usan aqui porfa acordarse de usar NPM install para que todas las dependencias funcionen */}
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={isRegister ? "register" : "login"} // la key cambia dependiendo del click a que boton
                            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)} // termina la animacion
                            classNames="fade" // esta es el classname para la animacion q puse en registerlogin.css
                        >
                            <Card>
                                <Card.Body>
                                    {isRegister ? (
                                        // aquii se muestra el formulario de registro o login según el estado isRegister usando ternario
                                        <>
                                            <div className="text-center mb-3">
                                                <h3>¡Por favor, regístrate aquí!</h3>
                                            </div>
                                            <Register />
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-center mb-3">
                                                <h3>¡Por favor, inicia sesión!</h3>
                                            </div>
                                            <Login />
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </CSSTransition>
                    </SwitchTransition>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterLogin;
