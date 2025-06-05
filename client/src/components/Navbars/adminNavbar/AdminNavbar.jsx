import React, { useContext, useState } from 'react';

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';
import { UserIcon } from '../../userIcon/UserIcon';

export const AdminNavbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar
      className="navPublic"
      expand="lg"
      expanded={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand className="titleNav" onClick={() => navigate('/admin')}>
          <img src="/images/logo/logo_recortado.png" alt="logo Soti" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav d-flex  align-items-center gap-4">
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : '')}
              to="/admin/clientlist"
              onClick={() => setIsOpen(false)}
            >
              Clientes
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : '')}
              to="/admin/employeelist"
              onClick={() => setIsOpen(false)}
            >
              Empleados
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : '')}
              to="/admin/service"
              onClick={() => setIsOpen(false)}
            >
              Servicios
            </NavLink>

            <NavLink
              className={({ isActive }) => (isActive ? 'active' : '')}
              to="/admin/calendar"
              onClick={() => setIsOpen(false)}
            >
              Calendario
            </NavLink>

            <div
              className="nav-icon nav-icon d-flex justify-content-center align-content-center d-none d-lg-flex"
              onClick={() => navigate('/admin')}
            >
              <UserIcon />
            </div>
            <button className="btn" onClick={logOut}>
              Salir
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
