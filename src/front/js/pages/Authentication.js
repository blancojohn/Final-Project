import React, { useState } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Register from "../component/Register.jsx";
import Login from "../component/Login.jsx";
import "../../styles/registerLogin.css";

const Authentication = () => {
    /*   Este componente actúa como un gestor para el proceso de autenticación.
         Desencadena el renderizado de la animación de cual formulario mostrar para el proceso.
         En true  muestra el  formulario de registro y en false el de iniciar sesión. */
    const [registration, setRegistration] = useState(true);

    return (
        <Container
            className="mt-5">
            <Row
                className="justify-content-center">
                <Col md={8} lg={6}>
                    {/* Botones que desencadenan la animacion y el cambio de formulario */}
                    <div
                        className="text-center mb-4">
                        <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => setRegistration(true)}>
                            Regístrate
                        </Button>

                        <Button
                            variant="primary"
                            className="me-2"
                            onClick={() => setRegistration(false)}>
                            Inicia Sesión
                        </Button>
                    </div>

                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={registration ? "register" : "login"}
                            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)} // termina la animacion
                            classNames="fade" // esta es el classname para la animacion q puse en registerlogin.css
                        >
                            <Card>
                                <Card.Body>
                                    {registration ? (
                                        <>
                                            <div className="text-center mb-3">
                                                <h4>Regístrate aquí. Si ya tienes cuenta, haz click en el botón de inicia sesión en la parte de arriba arriba</h4>
                                            </div>
                                            <Register setResgistration={setRegistration} />
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-center mb-3">
                                                <h4>Inicia sesión aquí. Si no tienes una cuenta, haz click en el botón de iniciar sesión en la parte de arriba</h4>
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

export default Authentication;
