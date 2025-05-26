import React, { useContext, useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { createServiceSchema } from '../../../schemas/createServiceSchema';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelpers';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  service_name: '',
  estimated_time: '',
  price: '',
  service_description: '',
};
const CreateService = () => {
  const [service, setService] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("")
  const {token, services, setServices} = useContext(AuthContext)
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;

    setService({ ...service, [name]: value });
  };
  console.log('SERVICIO', service);

  const onSubmit = async () => {
      try {
        createServiceSchema.parse(service)
        let res = await fetchData('admin/createService', 'post', service, token)
         
          console.log('reees', res);
      
        //seteo services con el nuevo servicio y le pongo el campo de habilitado
        setErrorMsg(res.data.message)
        setValErrors({})
        setServices([...services, {...service, service_is_enabled:0}])
        setService(initialValue);
        navigate("/admin/service")
      } catch (error) {
        if(error instanceof ZodError){
          let objTemp = {}
          error.errors.forEach((er)=>{
            objTemp[er.path[0]]=er.message
          })
          setValErrors(objTemp)
        } else if(error.response){
          setErrorMsg(error.response.data.message)
        } else{
          setErrorMsg("error")
        }
        console.log(error);
      }
    };

  return (
    <section className='padding-y-section'>
      <Row>
      <Col className="d-flex justify-content-center align-items-center">
          <Form className="formLogin">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h3>Añade un servicio</h3>
            </div>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="nameInput">Nombre</Form.Label>
              <Form.Control
                id="nameInput"
                name="service_name"
                value={service.service_name}
                onChange={handleChange}
                placeholder="Nombre"
              />
              {valErrors.service_name && <p>{valErrors.service_name}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="durationInput">
                Duración (minutos)
              </Form.Label>
              <Form.Control
                id="durationInput"
                name="estimated_time"
                value={service.estimated_time}
                type="number"
                min="1"
                step="1"
                onChange={handleChange}
                placeholder="Duración"
              />
              {valErrors.estimated_time && <p>{valErrors.estimated_time}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="priceInput">Precio</Form.Label>
              <InputGroup>
                <InputGroup.Text>€</InputGroup.Text>
                <Form.Control
                  id="priceInput"
                  name="price"
                  value={service.price}
                  type="number"
                  step="0.50"
                  min="0"
                  onChange={handleChange}
                  placeholder="Precio"
                />
              </InputGroup>
                {valErrors.price && <p>{valErrors.price}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="descriptionInput">Descripción</Form.Label>
              <Form.Control
                id="descriptionInput"
                name="service_description"
                value={service.service_description}
                as="textarea"
                rows={3}
                maxLength={250}
                onChange={handleChange}
                placeholder="Descripción"
              />
              {valErrors.service_description && <p>{valErrors.service_description}</p>}
            </Form.Group>
            {/* <Form.Group className="mb-3">
              
              <Form.Label className='cursor-pointer' htmlFor="imageInput"> <img src={image} alt="" /> Subir imagen</Form.Label>
              <Form.Control
                id="imageInput"
                type="file"
                hidden
                onChange={handleChangeFile}
              />
            </Form.Group> */}
            <div className="d-flex flex-column justify-content-center align-items-center">
            <p className='text-center'>{errorMsg}</p>  

              <Button className="btn" onClick={onSubmit}>
                Añadir
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </section>
  )
}

export default CreateService