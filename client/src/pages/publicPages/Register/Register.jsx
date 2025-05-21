import React, { useState } from 'react';
import { Container, Form, Row } from "react-bootstrap";


const Register = () => {
  const [registerData, setRegisterData] = useState(initialValue);

  const handleChange = (e) => {

  }

  return (
    <section>
      <Container>
        <Row>
          <Col md={12} lg={6}>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='NameTextInput'>
                  Nombre
                </Form.Label>
                <Form.Control 
                  id="NameTextImput"
                  name="name"
                  value={registerData.name}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register