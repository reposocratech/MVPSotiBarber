import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Form, Row } from "react-bootstrap"
import image from "../../../assets/icons/uploadimage.svg"
import "./editEmployee.css"
import { AuthContext } from '../../../context/AuthContextProvider'
import { fetchData } from '../../../helpers/axiosHelpers'
import { useLocation, useNavigate } from 'react-router-dom'
import { editEmployeeSchema } from '../../../schemas/editEmployeeSchema'
import { ZodError } from 'zod'

const EditEmployee = () => {
  const {user, token} = useContext(AuthContext)
  const [editEmpData, setEditEmpData] = useState({})
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState({});
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const employee = location.state?.employee;



  useEffect(()=>{
    if(employee) {
      setEditEmpData(employee)
    }
    else {
      navigate("/admin/employeeList")
    }
  },[employee, navigate])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEditEmpData({...editEmpData, [name]: value});
  }

  const handleChangeFile = (e) => {
    setFile(e.target.files[0])
  }

  const onCancel = async() => {
    navigate("/admin/employeelist")
  }

  const onSubmit = async() => {
    try {

      editEmployeeSchema.parse(editEmpData)

      const newFormData = new FormData();

      newFormData.append("data", JSON.stringify(editEmpData));
      if(file) {
        newFormData.append("file", file)
      }

      await fetchData("admin/editEmployee", "put", newFormData, token)

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
                {valErrors.user_name && <p className='error'>{valErrors.user_name}</p>}
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
                {valErrors.lastname && <p className='error'>{valErrors.lastname}</p>}
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
                {valErrors.phone && <p className='error'>{valErrors.phone}</p>}
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

                <button type="button" className='btn' onClick={onCancel}>Cancelar</button>
                <button type="button" className='btn' onClick={onSubmit}>Editar</button>


              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default EditEmployee