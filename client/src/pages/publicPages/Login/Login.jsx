import React, { useContext, useState } from 'react'
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './login.css'
import { AuthContext } from '../../../context/AuthContextProvider';

const initialValue = {
  email:"",
  password:""
}
const Login = () => {
  const [loginData, setLoginData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");

  const {logIn} = useContext(AuthContext)

  const handleChange = (e)=>{
    const {name, value} = e.target
    setLoginData({...loginData, [name]:value})
  }
  
  
  const onSubmit = async()=>{
    try {
      logIn(loginData)
    } catch (error) {
      console.log("LOOGIN", error);
    }
  }

  console.log("LOGINDATA", loginData)



  return (
    <section>
      <Container>
        <Row>
          <Col>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="emailInput">
                  Email
                </Form.Label>
                <Form.Control
                  id="emailInput"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="passwordInput">
                  Password
                </Form.Label>
                <Form.Control
                  id="passwordInput"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  />
              </Form.Group>
              <p>{errorMsg}</p>
              <Button onClick={onSubmit}>Entrar</Button>
              <p>¿No estas registrado? <Link to="/register">Registrate aquí</Link></p>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login