import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { fetchData } from '../../../helpers/axiosHelpers'

const initialValue = {
  newPassword: "",
  repeatPassword: ""
}

const ChangePassword = () => {
  const [changePassword, setChangePassword] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState({});
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate()

  useEffect(()=>{
    console.log("token recibido desde la url", token)
  },[token])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setChangePassword({...changePassword, [name]: value});
  }

  const onSubmit = async() => {
    try {
      await fetchData("client/passRecovery", "put", changePassword, token)

      navigate("/login")
      
    } catch (error) {
      console.log(error)
    }
  }

  console.log()

  return (
    <section>
      <Container>
        <Row className='engloba'>
          <Col md={12} lg={6} className='cols'>
            <Form className='formRegister'>
              <h2 className='text-center'>Cambio de contraseña</h2>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='newPasswordTextInput'>
                  Contraseña nueva:
                </Form.Label>
                <Form.Control 
                  id="newPasswordTextImput"
                  name="newPassword"
                  value={changePassword.newPassword}
                  onChange={handleChange}
                  placeholder='Escribe tu contraseña'
                />
                {valErrors.email && <p>{valErrors.email}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='repeatPasswordTextInput'>
                  Repite contraseña:
                </Form.Label>
                <Form.Control 
                  id="repeatPasswordTextImput"
                  name="repeatPassword"
                  value={changePassword.repeatPassword}
                  onChange={handleChange}
                  placeholder='Repite contraseña'
                />
                {valErrors.password && <p>{valErrors.password}</p>}
              </Form.Group>
              <p>{errorMsg}</p>
              <div className='d-flex justify-content-center'>
                <Button className='boton' onClick={onSubmit}>Cambiar</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ChangePassword