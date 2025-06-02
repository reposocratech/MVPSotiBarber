import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import './clientNavbar.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { UserIcon } from '../../userIcon/UserIcon';

export const ClientNavbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
   <Navbar  className='navPublic'  expand="lg" expanded={isOpen} onToggle={()=> setIsOpen(!isOpen)} collapseOnSelect>
      <Container>
        <Navbar.Brand className="titleNav" onClick={() => navigate('/')}>
          <img src="/images/logo/logo_recortado.png" alt="logo Soti" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <NavLink className="ms-auto custom-nav d-flex align-items-center gap-3">
            <NavLink className={({isActive})=>isActive ? "active": ""} to="/client/inicio"  onClick={()=>setIsOpen(false)} >
              Inicio
            </NavLink>
            <NavLink className={({isActive})=>isActive ? "active": ""} to="/client/services" onClick={()=>setIsOpen(false)} >
              Servicios
            </NavLink>
            <Nav.Link onClick={() => {navigate('/client/inicio#horarios');setIsOpen(false)}}>
              Horario
            </Nav.Link>
            <NavLink className={({isActive})=>isActive ? "active": ""} to="/client/contact" onClick={()=>setIsOpen(false)} >
              Contacto
            </NavLink>

            <div
              className="nav-icon nav-icon d-none d-lg-flex"
              onClick={() => navigate('/client')}
            >
              <UserIcon />
            </div>

            <Button className="btn-nav" onClick={logOut}>
              Salir
            </Button>
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
