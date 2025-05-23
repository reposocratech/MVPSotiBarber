import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelpers';

const initialValue = {
  email: ""
}

const ForgetPassword = () => {
  const [changePasswordEmail, setChangePasswordEmail] = useState(initialValue)
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setChangePasswordEmail({...changePasswordEmail, [name]: value});
  }

  const onSubmit = async() => {
    await fetchData("client/forgetPassword", "post", changePasswordEmail)
  }

  return (
    <section className='register'>
      <Container>
        <Row className='engloba'>
          <Col md={12} lg={6} className='cols'>
            <Form className='formRegister'>
              <h3 className='text-center'>¿Has olvidado tu contraseña?</h3>
              <p>Introduce tu email y te enviaremos un enlace para reestablecer tu contraseña</p>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='EmailTextInput'>
                  Email
                </Form.Label>
                <Form.Control 
                  id="EmailTextImput"
                  name="email"
                  value={changePasswordEmail.email}
                  onChange={handleChange}
                  placeholder='Introduce tu email'
                />
                {valErrors.email && <p>{valErrors.email}</p>}
              </Form.Group>
              <p>{errorMsg}</p>
              <div className='d-flex justify-content-center'>
                <Button className='boton' onClick={onSubmit}>Enviar</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ForgetPassword