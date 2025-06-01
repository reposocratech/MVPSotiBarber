import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'; 
import "./adminfooter.css"

export const AdminEmployeFooter = () => {
  return (
    <footer className="admin-footer text-light pt-3 pb-3">
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
