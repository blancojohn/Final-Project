import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Context } from '../store/appContext';
import "../../styles/navbar.css";

export const ChewyNavbar = () => {
  const { store, actions } = useContext(Context);
  /* const navigate = useNavigate(); */
  //ESTE CODIGO ES PARA EL LOGOUT, VUELVE A LA PANTALLA PRINCIPAL Y REMUEVE EL TOKEN DE ACCESO
  /* const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    actions.logout(); // Actualiza el estado de login utilizando la acción logout
    navigate("/");
  }; */

  const cartItemCount = store.cartItems?.length || 0; //cuantos item hy en el carrito

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="me-2 custom-brand">
          Mascotienda
        </Navbar.Brand>
        {
          !!store.user ? (
            <>

              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav.Link as={NavLink} to="/Perros" className="nav-link custom-link" activeclassname="active">
                    Perros
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/Gatos" className="nav-link custom-link" activeclassname="active">
                    Gatos
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/Ofertas" className="nav-link custom-link" activeclassname="active">
                    Ofertas
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/cart" className="nav-link custom-link">
                  <i className="fa fa-shopping-cart custom-icon" aria-hidden="true"></i>
                  <span className="cart-count">{cartItemCount}</span>
                </Nav.Link>
                <span className="nav-link text-decoration-none text-light"> Bienvenido, {store?.user?.name || ''}</span>
                <Nav.Link as={NavLink} to="/me" className="nav-link custom-link" activeclassname="active">
                  Mi Cuenta
                </Nav.Link>
                <button type='button' className='nav-link btn-danger text-light' onClick={actions.logOut}>Cerrar Sesión</button>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/Perros" className="nav-link custom-link" activeclassname="active">
                    Perros
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/Gatos" className="nav-link custom-link" activeclassname="active">
                    Gatos
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/Ofertas" className="nav-link custom-link" activeclassname="active">
                    Ofertas
                  </Nav.Link>
                </Nav>
                <Nav.Link as={NavLink} to="/register" className="nav-link custom-link" activeclassname="active">
                  Regístrate / Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/cart" className="nav-link custom-link">
                  <i className="fa fa-shopping-cart custom-icon" aria-hidden="true"></i>
                  <span className="cart-count">{cartItemCount}</span>
                </Nav.Link>
              </Navbar.Collapse>

            </>
          )
        }
      </Container>
    </Navbar>
  );
};









