import React, { useContext, useState } from 'react'
import { Col, Container, Form, Row} from 'react-bootstrap';
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
      loginSchema.parse(loginData)
      await logIn(loginData)
      setErrorMsg("");
      setValErrors("");
      

    }catch (error) {
      console.log("++++++++++",error);
      
      if(error instanceof ZodError){
            let objTemp = {}
            error.errors.forEach((er)=>{
              objTemp[er.path[0]]=er.message
            })
            setErrorMsg("")
            setValErrors(objTemp)

            
      }
      
      //con esto me pinto los errores del back
      if(error.response && error.response.data?.message){
        setValErrors("")
        setErrorMsg(error.response.data.message)
      }
      
    }
  }




  return (
    <section className='padding-y-section'>
      <Container>
        <Row>
          <Col>
            <Form className="formLogin">
              <div className='d-flex flex-column align-items-center justify-content-center'>
                <h3 >Inicia sesión</h3>
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
                  {valErrors.email && <p className='error'>{valErrors.email}</p>}
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
                  {valErrors.password && <p className='error'>{valErrors.password}</p>}                  
              </Form.Group>
              <p className='text-end forgot-password'> <Link className='text-decoration-none link' to="/forgetPassword">¿Has olvidado tu contraseña?</Link></p>
              <p className='text-center error'>{errorMsg}</p>
              <div className='d-flex justify-content-center align-items-center'>
                <button type="button" className='btn' onClick={onSubmit}>Entrar</button>
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