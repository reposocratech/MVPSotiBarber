import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import './clientNavbar.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { UserIcon } from '../../userIcon/UserIcon';

export const ClientNavbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const horarioActive = location.hash === "#horarios";

 const handleHorario = () => {
  setIsOpen(false);

  if (location.pathname !== "/client/inicio") {
    navigate("/client/inicio#horarios");
  } else {
    const horarioSection = document.getElementById("horarios");
    if (horarioSection) {
      horarioSection.scrollIntoView({ behavior: "smooth" });
    }
  }
};

useEffect(() => {
  if (location.hash === "#horarios") {
    const element = document.getElementById("horarios");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [location]);


  return (
    <Navbar className='navPublic' expand="lg" expanded={isOpen} onToggle={() => setIsOpen(!isOpen)} collapseOnSelect>
      <Container>
        <Navbar.Brand className="titleNav" onClick={() => navigate('/')}>
          <img src="/images/logo/logo_recortado.png" alt="logo Soti" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav d-flex align-items-center gap-4">
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/client/inicio" onClick={() => setIsOpen(false)}>
              Inicio
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/client/services" onClick={() => setIsOpen(false)}>
              Servicios
            </NavLink>
            <Nav.Link className={horarioActive ? "active" : ""} onClick={handleHorario}>
              Horario
            </Nav.Link>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/client/contact" onClick={() => setIsOpen(false)}>
              Contacto
            </NavLink>

            <div className="nav-icon d-none d-lg-flex" onClick={() => navigate('/client')}>
              <UserIcon />
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
