import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import "./publicNavbar.css";

export const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const horarioActive = location.hash === "#horarios";

  const handleHorario = () => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/#horarios");
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
        <Navbar.Brand className='titleNav' onClick={() => navigate("/")}>
          <img src="/images/logo/logo_recortado.png" alt="logo Soti" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav d-flex align-items-center gap-4">
            <NavLink className={({ isActive }) => isActive ? "active" : ""} as={Link} to="/" onClick={() => setIsOpen(false)}>Inicio</NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/services" onClick={() => setIsOpen(false)}>Servicios</NavLink>
            <Nav.Link className={horarioActive ? "active" : ""} onClick={handleHorario}>Horario</Nav.Link>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/contact" onClick={() => setIsOpen(false)}>Contacto</NavLink>
            <Button className='btn-nav' onClick={() => { navigate("/register"); setIsOpen(false); }}>Registro</Button>
            <Button className='btn-nav' onClick={() => { navigate("/login"); setIsOpen(false); }}>Acceder</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
