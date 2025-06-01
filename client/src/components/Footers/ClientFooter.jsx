import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import "./clientfooter.css"

export const ClientFooter = () => {

  return (
  <footer className="client-footer text-light">
      <Container>
        <Row className="justify-content-center text-center">
          <Col xs={12} md={4}>
            <h5 className="fw-bold">SOTI</h5>
            <p>Estilo y elegancia para tu cabello en un ambiente exclusivo.</p>
          </Col>

          <Col xs={12} md={4} >
            <h5 className="fw-bold">Enlaces Rápidos</h5>
            <ul className="enlaces">
              <li><Nav.Link as={Link} to="/client/inicio" className="nav-link">Inicio</Nav.Link></li>
              <li><Nav.Link as={Link} to="/client/services" className="nav-link">Servicios</Nav.Link></li>
              <li><Nav.Link as={Link} to="/client/contact" className="nav-link">Contacto</Nav.Link></li>
            </ul>
          </Col>

          <Col xs={12} md={4} className="d-none d-md-block">
            <h5 className="contacto fw-bold">Contacto</h5>
              <p>Calle Daniel Vázquez Díaz, 5</p>
              <p>Teléfono: 601530639</p>
              <p>Email: info@soti.com</p>
          </Col>
        </Row>

        <div className="footer-divider"></div>

        <Row>
          <Col className="footer-copy">
            <small>© 2025 Soti Peluquería. Todos los derechos reservados.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};



