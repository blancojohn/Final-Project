import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Register from "../component/Register.jsx";
import Login from "../component/Login.jsx";

export const RegisterLogin = () => {
    return (
        <div className="container mt-4">
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="text-center mb-3">
                                <h3>¡Por favor, regístrate aquí!</h3>
                            </div>
                            <Register />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="text-center mb-3">
                                <h3>¡Por favor, inicia sesión!</h3>
                            </div>
                            <Login />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default RegisterLogin;
