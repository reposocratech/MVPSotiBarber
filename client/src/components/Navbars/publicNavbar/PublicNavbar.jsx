import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';


import "./publicNavbar.css"
import { Link, NavLink, useNavigate } from 'react-router-dom';


export const PublicNavbar = () => {
  
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();

  return (
    <>
      <Navbar  className='navPublic'  expand="lg" expanded={isOpen} onToggle={()=> setIsOpen(!isOpen)} collapseOnSelect>
      <Container>
        <Navbar.Brand className='titleNav' onClick={()=>navigate("/")}>
          <img src="/images/logo/logo_recortado.png" alt="logo Soti" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav d-flex align-items-center gap-2">
            <NavLink className={({isActive})=>isActive ? "active": ""} as={Link} to="/" onClick={()=>setIsOpen(false)} >Inicio</NavLink>
            <NavLink className={({isActive})=>isActive ? "active": ""} to="/services" onClick={()=>setIsOpen(false)}>Servicios</NavLink>
            <Nav.Link className={({isActive})=>isActive ? "active": ""} onClick={() => navigate("/#horarios")}>Horario</Nav.Link>
            <NavLink className={({isActive})=>isActive ? "active": ""}  to="/contact" onClick={()=>setIsOpen(false)}>Contacto</NavLink>
              <Button className='btn-nav' onClick={() => { navigate("/register"); setIsOpen(false); }}>Registro</Button>
            <Button className='btn-nav' onClick={() => { navigate("/login"); setIsOpen(false); }}>Acceder</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


  
    </>
  )
}
