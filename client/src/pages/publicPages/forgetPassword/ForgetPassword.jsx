import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { fetchData } from '../../../helpers/axiosHelpers';
import { forgetPasswordSchema } from '../../../schemas/forgetPasswordSchema';
import { ZodError } from "zod"
import { useNavigate } from "react-router-dom"

const initialValue = {
  email: ""
}

const ForgetPassword = () => {
  const [changePasswordEmail, setChangePasswordEmail] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState({});
  const navigate = useNavigate();
  const [showMsg, setShowMsg] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setChangePasswordEmail({...changePasswordEmail, [name]: value});
  }

  const onSubmit = async() => {
    try {
      setErrorMsg("");
      setValErrors("");

      forgetPasswordSchema.parse(changePasswordEmail);

      setShowMsg(true)
      await fetchData("client/forgetPassword", "post", changePasswordEmail)

    } catch (error) {
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
  
  return (
    <section className='sectForm'>
      <Container>
        <Row className='engloba'>
          <Col md={12} lg={6} className='cols'>
            <Form className='formularios'>
              <h3 className='text-center'>¿Has olvidado tu contraseña?</h3>
              <div className='blue-line'></div>
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
                {valErrors.email && <p className='error'>{valErrors.email}</p>}
              </Form.Group>
              <p>{errorMsg}</p>
              <div className='d-flex justify-content-center gap-3'>
                <button type="button" className='btn' onClick={onSubmit}>Enviar</button>
                <button type="button" className='btn' onClick={()=>navigate("/login")}>Cancelar</button>
              </div>
              {showMsg && <p className='text-center pt-3 text'>Revisa tu email</p>}
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ForgetPassword