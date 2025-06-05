import React, { useContext, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { fetchData } from '../../helpers/axiosHelpers'
import { AuthContext } from '../../context/AuthContextProvider'
import { completeRegisterSchema } from "../../schemas/completeRegisterSchema"
import { ZodError } from 'zod'

const initialValue = {
  user_name: "",
  lastname: "",
  birth_date: "",
  phone: "",
  description: ""
}

const CompleteRegister = ({onCompletar}) => {
  const [completeRegister, setCompleteRegister] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState({});
  const {token, setUser} = useContext(AuthContext);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCompleteRegister({...completeRegister, [name]:value});
  }

  const onSubmit = async() => {
    try {
      setErrorMsg("");
      setValErrors("");

      completeRegisterSchema.parse(completeRegister)

      await fetchData("client/completeFormRegister", "put", completeRegister, token);
      //actualizo el contexto sumando los nuevos datos del cliente
      setUser(prevUser => ({...prevUser, ...completeRegister}))

      onCompletar()
    } catch (error) {
      console.log(error)
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
    <section className='sectForm'>
      <Container>
        <Row className='engloba'>
          <Col md={12} lg={6} className='cols'>
            <Form className='formularios'>
              <h2 className='text-center'>Completa tus datos</h2>
              <div className='blue-line'></div>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='NameTextInput'>
                  Nombre:
                </Form.Label>
                <Form.Control 
                  id="NameTextImput"
                  name="user_name"
                  value={completeRegister.user_name}
                  onChange={handleChange}
                  placeholder='Introduce tu nombre'
                />
                {valErrors.user_name && <p className='error'>{valErrors.user_name}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='LastNameTextInput'>
                  Apellidos:
                </Form.Label>
                <Form.Control 
                  id="LastNameTextImput"
                  name="lastname"
                  value={completeRegister.lastname}
                  onChange={handleChange}
                  placeholder='Introduce tus apellidos'
                />
                {valErrors.lastname && <p className='error'>{valErrors.lastname}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='BirthdateTextInput'>
                  Fecha de nacimiento:
                </Form.Label>
                <Form.Control 
                  id="BirthdateTextInput"
                  name="birth_date"
                  value={completeRegister.birth_date}
                  onChange={handleChange}
                  type='date'
                />
                <div className='d-flex justify-content-end'>
                  <p>y tendrás un regalo el día de tu cumpleaños</p>
                </div>
                {valErrors.birth_date && <p className='error'>{valErrors.birth_date}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='PhoneTextInput'>
                  Teléfono:
                </Form.Label>
                <Form.Control 
                  id="PhoneTextImput"
                  name="phone"
                  value={completeRegister.phone}
                  onChange={handleChange}
                  placeholder='Introduce tu número de teléfono'
                />
                {valErrors.phone && <p className='error'>{valErrors.phone}</p>}
              </Form.Group>
              {/* <p>{errorMsg}</p> */}
              <div className='d-flex justify-content-center'>
                <button type="button" className='btn' onClick={onSubmit}>Editar</button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CompleteRegister