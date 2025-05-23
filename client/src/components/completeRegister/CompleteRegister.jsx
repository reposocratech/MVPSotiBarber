import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { fetchData } from '../../helpers/axiosHelpers'
import { AuthContext } from '../../context/AuthContextProvider'

const initialValue = {
  name: "",
  lastname: "",
  birthdate: "",
  phone: ""
}

const CompleteRegister = () => {
  const [completeRegister, setCompleteRegister] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState({});
  const {token} = useContext(AuthContext);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCompleteRegister({...completeRegister, [name]:value});
  }

  const onSubmit = async() => {
    try {
      await fetchData("client/completeFormRegister", "put", completeRegister, token);
    } catch (error) {
      console.log(error)
    }
  }

  // console.log("completandoo datos", completeRegister);

  return (
    <section className='register'>
      <Container>
        <Row className='engloba'>
          <Col md={12} lg={6} className='cols'>
            <Form className='formRegister'>
              <h2 className='text-center'>Completa tus datos</h2>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='NameTextInput'>
                  Nombre:
                </Form.Label>
                <Form.Control 
                  id="NameTextImput"
                  name="name"
                  value={completeRegister.name}
                  onChange={handleChange}
                  placeholder='Introduce tu nombre'
                />
                {valErrors.name && <p>{valErrors.name}</p>}
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
                {valErrors.lastname && <p>{valErrors.lastname}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='BirthdateTextInput'>
                  Fecha de nacimiento:
                </Form.Label>
                <Form.Control 
                  id="BirthdateTextInput"
                  name="birthdate"
                  value={completeRegister.birthdate}
                  onChange={handleChange}
                  placeholder='DD/MM/AA'
                />
                <div className='d-flex justify-content-end'>
                  <p>y tendrás un regalo el día de tu cumpleaños</p>
                </div>
                {valErrors.birthdate && <p>{valErrors.birthdate}</p>}
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
                {valErrors.phone && <p>{valErrors.phone}</p>}
              </Form.Group>
              <p>{errorMsg}</p>
              <div className='d-flex justify-content-center'>
                <Button className='boton' onClick={onSubmit}>Editar</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CompleteRegister