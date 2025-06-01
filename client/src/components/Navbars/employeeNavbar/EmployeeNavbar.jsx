import React, { useContext, useState } from 'react';

import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';

export const EmployeeNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logOut, user } = useContext(AuthContext);

  return (
    <Navbar className="navPublic" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand className="titleNav" onClick={() => navigate('/')}>
          <img src="/images/logo/logo_recortado.png" alt="logo Soti" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav d-flex gap-2">
            <Nav.Link as={Link} to="/employee" onClick={() => setIsOpen(false)}>
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/employee/clientList"
              onClick={() => setIsOpen(false)}
            >
              Clientes
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/employee/calendar"
              onClick={() => setIsOpen(false)}
            >
              Citas
            </Nav.Link>

            <div className="profile-icon">
              <h2>CR</h2>
            </div>
            <Button
              className="btn-nav"
              onClick={() => {
                setIsOpen(false);
                logOut();
              }}
            >
              Salir
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
