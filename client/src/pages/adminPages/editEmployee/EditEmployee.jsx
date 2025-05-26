import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import image from "../../../assets/icons/uploadimage.svg"
import "./editEmployee.css"
import { AuthContext } from '../../../context/AuthContextProvider'
import { fetchData } from '../../../helpers/axiosHelpers'
import { useLocation, useNavigate } from 'react-router-dom'

const EditEmployee = () => {
  const {user, token} = useContext(AuthContext)
  const [editEmpData, setEditEmpData] = useState(user)
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState({});
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if(user) {
      setEditEmpData(user)
    }
  },[user])

  console.log("usermimimi", user)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEditEmpData({...editEmpData, [name]: value});
  }

  const handleChangeFile = (e) => {
    setFile(e.target.files[0])
  }

  const onSubmit = async() => {
    try {
      await fetchData("admin/editEmployee", "put", editEmpData, token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='register'>
      <Container>
        <Row className='engloba'>
          <Col md={12} lg={6} className='cols'>
            <Form className='formRegister'>
              <h2 className='text-center'>Editar empleado</h2>
              <div className='blue-line'></div>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='NameTextInput'>
                  Nombre
                </Form.Label>
                <Form.Control 
                  id="NameTextImput"
                  name="user_name"
                  value={editEmpData.user_name ? editEmpData.user_name : ""}
                  onChange={handleChange}
                />
                {valErrors.user_name && <p>{valErrors.user_name}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='LastnameTextInput'>
                  Apellidos
                </Form.Label>
                <Form.Control 
                  id="LastnameTextImput"
                  name="lastname"
                  value={editEmpData.lastname ? editEmpData.lastname : ""}
                  onChange={handleChange}
                />
                {valErrors.lastname && <p>{valErrors.lastname}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='PhoneTextInput'>
                  Teléfono
                </Form.Label>
                <Form.Control 
                  id="PhoneTextImput"
                  name="phone"
                  value={editEmpData.phone ? editEmpData.phone : ""}
                  onChange={handleChange}
                />
                {valErrors.phone && <p>{valErrors.phone}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='DescriptionTextInput'>
                  Descripción
                </Form.Label>
                <Form.Control 
                  className='inputDesc'
                  id="DescriptionTextImput"
                  name="description"
                  value={editEmpData.description ? editEmpData.description : ""}
                  onChange={handleChange}
                  as='textarea'
                />
                {valErrors.description || ""}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='ImageInput' className='cursor-pointer'>
                  <img src={image}/> Subir Imagen
                </Form.Label>
                <Form.Control 
                  id="ImageInput"
                  type='file'
                  hidden
                  onChange={handleChangeFile}
                />
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

export default EditEmployee