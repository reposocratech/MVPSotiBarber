import React, { useContext, useState } from 'react';

import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';
import { UserIcon } from '../../userIcon/UserIcon';

export const EmployeeNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logOut, user } = useContext(AuthContext);

  return (
    <Navbar
      className="navPublic"
      expand="lg"
      expanded={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand className="titleNav" onClick={() => navigate('/')}>
          <img src="/images/logo/logo_recortado.png" alt="logo Soti" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav d-flex align-items-center gap-3">
            <NavLink className={({isActive})=>isActive ? "active": ""} to="/employee" onClick={() => setIsOpen(false)}>
              Inicio
            </NavLink>
            <NavLink
              className={({isActive})=>isActive ? "active": ""}
              to="/employee/clientList"
              onClick={() => setIsOpen(false)}
            >
              Clientes
            </NavLink>
            <NavLink
              className={({isActive})=>isActive ? "active": ""}
              to="/employee/calendar"
              onClick={() => setIsOpen(false)}
            >
              Citas
            </NavLink>

            <div
              className="nav-icon nav-icon d-none d-lg-flex"
              onClick={() => navigate('/employee')}
            >
              <UserIcon />
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
