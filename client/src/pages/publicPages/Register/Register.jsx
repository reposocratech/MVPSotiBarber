import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from '../../../schemas/registerSchema';
import { fetchData } from '../../../helpers/axiosHelpers';
import { ZodError } from "zod";
import "./register.css"

const initialValue = { 
  email: "",
  password: "",
  repPassword: ""
}

const Register = () => {
  const [registerData, setRegisterData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegisterData({...registerData, [name]: value})
  }

  const onSubmit = async() => {
    try {
        setErrorMsg("");
        setValErrors("");
        registerSchema.parse(registerData);
        let res = await fetchData ("client/register", "post", registerData);
    
        navigate("/login")
    } 
    
    catch (error) {
      if(error instanceof ZodError){
        let objTemp = {}
        error.errors.forEach((er)=>{
          objTemp[er.path[0]]=er.message
        })
        setValErrors(objTemp)
      }

      if(error.response){
        setErrorMsg(error.response.data.message)
      }else{
        setErrorMsg("ups, ha habido un error")
      }
    }
  }

  return (
    <section className='register'>
      <Container>
        <Row className='engloba'>
          <Col md={12} lg={6} className='cols'>
            <Form className='formRegister'>
              <h2 className='text-center'>Regístrate</h2>
              <div className='blue-line'></div>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='EmailTextInput'>
                  Email
                </Form.Label>
                <Form.Control 
                  id="EmailTextImput"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                  placeholder='ejemplo@ejemplo.com'
                />
                {valErrors.email && <p>{valErrors.email}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='PasswordTextInput'>
                  Contraseña
                </Form.Label>
                <Form.Control 
                  id="PasswordTextImput"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                  placeholder='Escribe tu contraseña'
                />
                {valErrors.password && <p>{valErrors.password}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='RepPasswordTextInput'>
                  Repite Contraseña
                </Form.Label>
                <Form.Control 
                  id="RepPasswordTextImput"
                  name="repPassword"
                  value={registerData.repPassword}
                  onChange={handleChange}
                  placeholder='Repite tu contraseña'
                />
                {valErrors.repPassword && <p>{valErrors.repPassword}</p>}
              </Form.Group>
              <p>{errorMsg}</p>
              <div className='d-flex justify-content-center'>
                <Button className='boton' onClick={onSubmit}>Registrar</Button>
              </div>
            </Form>
            <p className='pe-5 text-center'>¿Ya estás registrado? <Link className='inicio' to="/login">Inicia sesión aquí</Link></p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register