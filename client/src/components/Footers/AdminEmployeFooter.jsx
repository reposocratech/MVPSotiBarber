import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'; 
import "./publicfooter.css"

export const AdminEmployeFooter = () => {
  return (
    <footer className="public-footer text-light pt-3 pb-3 mt-5">
      <Container fluid>
        <Row>
          <Col className="footer-copy text-center">
            <small>© 2025 Soti Peluquería. Todos los derechos reservados.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
