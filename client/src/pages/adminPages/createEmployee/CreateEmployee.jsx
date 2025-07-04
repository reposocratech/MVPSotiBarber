import React, { useContext, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { fetchData } from '../../../helpers/axiosHelpers';
import image from "../../../assets/icons/uploadimage.svg"
import "./createemployee.css"
import {createEmployeeSchema} from "../../../schemas/createEmployeeSchema";
import { ZodError } from 'zod';
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../../context/AuthContextProvider';

const initialValue = {
  user_name: "",
  lastname: "",
  phone: "",
  email: "",
  password: "",
  description: "",
  avatar: ""
}

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState({});
  const [file, setFile] = useState();
  const navigate = useNavigate()
  const {token} = useContext(AuthContext)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEmployeeData({...employeeData, [name]: value})
  }

  const handleChangeFile = (e) => {
    setFile(e.target.files[0])
  }

  const onSubmit = async() => {
    try {

      createEmployeeSchema.parse(employeeData)

      const newFormData = new FormData();

      newFormData.append("data", JSON.stringify(employeeData));
      if(file) {
        newFormData.append("file", file)
      }

      
      const res = await fetchData("admin/createEmployee", "post", newFormData, token)

      navigate("/admin/employeeList")
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
              <h2 className='text-center'>Crear empleado</h2>
              <div className='blue-line'></div>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='NameTextInput'>
                  Nombre
                </Form.Label>
                <Form.Control 
                  id="NameTextImput"
                  name="user_name"
                  value={employeeData.user_name}
                  onChange={handleChange}
                  placeholder='Introduce el nombre'
                />
                {valErrors.user_name && <p className='error'>{valErrors.user_name}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='LastnameTextInput'>
                  Apellidos
                </Form.Label>
                <Form.Control 
                  id="LastnameTextImput"
                  name="lastname"
                  value={employeeData.lastname}
                  onChange={handleChange}
                  placeholder='Introduce los apellidos'
                />
                {valErrors.lastname && <p className='error'>{valErrors.lastname}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='PhoneTextInput'>
                  Teléfono
                </Form.Label>
                <Form.Control 
                  id="PhoneTextImput"
                  name="phone"
                  value={employeeData.phone}
                  onChange={handleChange}
                  placeholder='Introduce el teléfono'
                />
                {valErrors.phone && <p className='error'>{valErrors.phone}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='EmailTextInput'>
                  Email
                </Form.Label>
                <Form.Control 
                  id="EmailTextImput"
                  name="email"
                  value={employeeData.email}
                  onChange={handleChange}
                  placeholder='Introduce el email'
                />
                {valErrors.email && <p className='error'>{valErrors.email}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='PasswordTextInput'>
                  Contraseña
                </Form.Label>
                <Form.Control 
                  id="PasswordTextImput"
                  name="password"
                  value={employeeData.password}
                  onChange={handleChange}
                  placeholder='Introduce la contraseña'
                />
                {valErrors.password && <p className='error'>{valErrors.password}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='NameTextInput'>
                  Descripción
                </Form.Label>
                <Form.Control 
                  className='inputDesc'
                  id="DescriptionTextImput"
                  name="description"
                  value={employeeData.description}
                  onChange={handleChange}
                  placeholder='Introduce una descripción'
                  as='textarea'
                />
                {valErrors.description && <p className='error'>{valErrors.description}</p>}
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
              {/* <p>{errorMsg}</p> */}
              <div className='d-flex justify-content-center gap-3'>

                <button type="button" className='btn' onClick={()=>navigate("/admin/employeeList")}>Cancelar</button>
                <button type="button" className='btn' onClick={onSubmit}>Registrar</button>

              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CreateEmployee