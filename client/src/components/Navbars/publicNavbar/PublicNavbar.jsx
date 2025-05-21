import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';

import "./publicNavbar.css"
import { Link, useNavigate } from 'react-router-dom';


export const PublicNavbar = () => {
  
  const navigate = useNavigate();

  return (
    <>
      <Navbar  className='navPublic'  expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand className='titleNav' onClick={()=>navigate("/")}>SOTI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav d-flex gap-2">
            <Nav.Link as={Link} to="/" >Inicio</Nav.Link>
            <Nav.Link as={Link} to="/services">Servicios</Nav.Link>
            <Nav.Link as={Link} to="/">Horario</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
            <Button className='btn-nav' onClick={()=>navigate("/register")}>Registro</Button>
            <Button className='btn-nav' onClick={()=>navigate("/login")} >Acceder</Button>
      
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  
    </>
  )
}
