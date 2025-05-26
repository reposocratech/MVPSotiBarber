import React, { useContext } from 'react';

import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';

export const EmployeeNavbar = () => {
  const navigate = useNavigate();
  const {logOut, user} = useContext(AuthContext);

  return (
    <Navbar className="navPublic" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand className="titleNav" onClick={() => navigate('/')}>
          SOTI
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav d-flex gap-2">
            <Nav.Link as={Link} to="/employee">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/employee/clientList">
              Clientes
            </Nav.Link>
            <Nav.Link as={Link} to="/employee/calendar">
              Citas
            </Nav.Link>

            <div className="profile-icon">
              <h2>CR</h2>
            </div>
            <Button className="btn-nav" onClick={logOut}>
              Salir
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
