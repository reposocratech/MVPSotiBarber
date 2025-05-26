import React, { useContext } from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import './clientNavbar.css'
import { AuthContext } from '../../../context/AuthContextProvider';
import { UserIcon } from '../../userIcon/UserIcon';



export const ClientNavbar = () => {

  const {logOut, user} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
<Navbar className='navPublic' expand="lg" collapseOnSelect>
  <Container>
    <Navbar.Brand className='titleNav' onClick={() => navigate("/")}>SOTI</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto custom-nav d-flex align-items-center gap-3">
        <Nav.Link as={Link} to="/client/inicio">Inicio</Nav.Link>
        <Nav.Link as={Link} to="/client/services">Servicios</Nav.Link>
        <Nav.Link onClick={() => navigate("/client/inicio#horarios")}>Horario</Nav.Link>
        <Nav.Link as={Link} to="/client/contact">Contacto</Nav.Link>

 
        <div className='nav-icon nav-icon d-none d-lg-flex' onClick={() => navigate("/client")}>
          <UserIcon />
        </div>

        <Button className='btn-nav' onClick={logOut}>Salir</Button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
