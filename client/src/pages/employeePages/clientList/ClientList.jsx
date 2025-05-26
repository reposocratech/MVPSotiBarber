import React from 'react'
import { Container, Row, Col, Form } from "react-bootstrap";
import "./clientlist.css"


const ClientList = () => {
  return (
    <div className="client-section">
      <Container>
        <h2 className="text-center">Clientes</h2>
        <div className='blue-line'></div>

        <Row className="justify-content-center mb-4">
          <Col md={6} className="position-relative">
            <Form.Control
              type="text"
              placeholder="Buscar"
              className="search-input"
            />
      
          </Col>
        </Row>

        <div className="client-list-scroll">
        </div>
      </Container>
    </div>
  );
  
}

export default ClientList