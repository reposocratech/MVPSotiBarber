import React, { useContext, useState } from 'react'
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { loginSchema } from "../../../schemas/loginSchema.js"
import './login.css'
import { AuthContext } from '../../../context/AuthContextProvider';
import { ZodError } from "zod";

const initialValue = {
  email:"",
  password:""
}
const Login = () => {
  const [loginData, setLoginData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState("");

  const {logIn} = useContext(AuthContext)

  const handleChange = (e)=>{
    const {name, value} = e.target
    setLoginData({...loginData, [name]:value})
  }
  
  
  const onSubmit = async()=>{
    try {
      if(!loginData.email || !loginData.password){
        setErrorMsg("Rellena todos los campos")
      }else{
        setErrorMsg("");
        setValErrors("");
        loginSchema.parse(loginData)
        logIn(loginData)
      }

    }catch (error) {
      if(error instanceof ZodError){
            let objTemp = {}
            error.errors.forEach((er)=>{
              objTemp[er.path[0]]=er.message
            })
            setValErrors(objTemp)

            if(error.response){
              setErrorMsg(error.response.data.message)
            }else{
              setErrorMsg("")
            }
      }    
    }
  }

  console.log("LOGINDATA", loginData)



  return (
    <section>
      <Container>
        <Row>
          <Col>
            <Form className="formLogin">
              <div className='d-flex flex-column align-items-center justify-content-center'>
                <h2 >Inicia sesión</h2>
                <div className='blue-line'></div>
              </div>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="emailInput">
                  Email
                </Form.Label>
                <Form.Control
                  id="emailInput"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder='ejemplo@ejemplo.com'
                  />
                  {valErrors.email && <p>{valErrors.email}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="passwordInput">
                  Contraseña
                </Form.Label>
                <Form.Control
                  id="passwordInput"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder='Introduce contraseña'
                  />
                  {valErrors.password && <p>{valErrors.password}</p>}                  
              </Form.Group>
              <Link className='text-decoration-none' to="/forgetPassword"> <p className='text-end forgot-password'>¿Has olvidado tu contraseña?</p></Link>
              <p className='text-center'>{errorMsg}</p>
              <div className='d-flex justify-content-center align-items-center'>
                <Button className='btn' onClick={onSubmit}>Entrar</Button>
              </div>
            </Form>
              <p className='text-center'>¿No estas registrado? <Link className='register-here' to="/register">Registrate aquí</Link></p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login