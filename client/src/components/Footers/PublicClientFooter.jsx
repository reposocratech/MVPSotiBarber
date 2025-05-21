import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import "./publicfooter.css"

export const PublicClientFooter = () => {

  return (
  <footer className="public-footer text-light pt-5 pb-3 mt-5">
      <Container>
        <Row className="mb-4 text-center text-md-start">
          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold">SOTI</h5>
            <p>Estilo y elegancia para tu cabello en un ambiente exclusivo.</p>
          </Col>

          <Col xs={12} md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold">Enlaces Rápidos</h5>
            <ul className="enlaces">
              <li><Nav.Link as={Link} to="/" className="text-light text-decoration-none">Inicio</Nav.Link></li>
              <li><Nav.Link as={Link} to="/services" className="text-light text-decoration-none">Servicios</Nav.Link></li>
              <li><Nav.Link as={Link} to="/contact" className="text-light text-decoration-none">Contacto</Nav.Link></li>
            </ul>
          </Col>

          <Col xs={12} md={4}>
            <h5 className="fw-bold">Contacto</h5>
            <p>
              Calle Daniel Vázquez Díaz, 5<br />
              Teléfono: 601530639<br />
              Email: info@sotti.com
            </p>
          </Col>
        </Row>

        <hr className="border-light" />

        <Row>
          <Col className="text-center">
            <small>© 2025 Soti Peluquería. Todos los derechos reservados.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};





   
  