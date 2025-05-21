import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'; 
import "./publicfooter.css"

export const AdminEmployeFooter = () => {
  return (

    <footer>
      <Container className="public-footer text-light pt-5 pb-3 mt-5">
        <Row>
              <Col className="text-center">
                  <small>© 2025 Soti Peluquería. Todos los derechos reservados.</small>
              </Col>
              </Row>
      </Container>
    </footer>
  )
}
