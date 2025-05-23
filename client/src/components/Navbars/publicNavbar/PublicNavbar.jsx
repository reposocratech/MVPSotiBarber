import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';

import "./publicNavbar.css"
import { Link, useNavigate } from 'react-router-dom';


export const PublicNavbar = () => {
  
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();

  return (
    <>
      <Navbar  className='navPublic'  expand="lg" expanded={isOpen} onToggle={()=> setIsOpen(!isOpen)} collapseOnSelect>
      <Container>
        <Navbar.Brand className='titleNav' onClick={()=>navigate("/")}>SOTI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav d-flex gap-2">
            <Nav.Link as={Link} to="/" onClick={()=>setIsOpen(false)} >Inicio</Nav.Link>
            <Nav.Link as={Link} to="/services" onClick={()=>setIsOpen(false)}>Servicios</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={()=>setIsOpen(false)}>Horario</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={()=>setIsOpen(false)}>Contacto</Nav.Link>
              <Button className='btn-nav' onClick={() => { navigate("/register"); setIsOpen(false); }}>Registro</Button>
            <Button className='btn-nav' onClick={() => { navigate("/login"); setIsOpen(false); }}>Acceder</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  
    </>
  )
}
