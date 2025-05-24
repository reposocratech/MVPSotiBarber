import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
/* import image from '../../../assets/icons/uploadimage.svg'; */
import './service.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelpers';
import ModalEditService from '../../../components/modalEditService/ModalEditService';

const initialValue = {
  service_name: '',
  estimated_time: '',
  price: '',
  service_description: '',
};

const Service = () => {
  const navigate = useNavigate();
  const [service, setService] = useState(initialValue);
  const [isMobile, setIsMobile] = useState(false)
  const [modalEditService, setModalEditService] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const { token, services, setServices } = useContext(AuthContext);

  //comprobar anchura de pantalla para elegir modal o vista neuva en el editService
  useEffect(()=>{
    const handleResizeScreen = ()=>{
      if(window.innerWidth <= 768){
        setIsMobile(true)
      }
    }

    handleResizeScreen();
    window.addEventListener('resize', handleResizeScreen);
    return ()=> window.removeEventListener('resize', handleResizeScreen)
  }, []);
  console.log("anchura pantalla",window.innerWidth)


  const handleChange = (e) => {
    const { name, value } = e.target;

    setService({ ...service, [name]: value });
  };
  console.log('SERVICIO', service);

  //NO HEMOS METIDO IMAGEN EN LA TABLA SERVICE

  /* const handleChangeFile = (e) => {
    const {name} = e.target;
    setService({...service, [name]: e.target.files[0] })
  }; */

  const onSubmit = async () => {
    try {
      if (service) {
        let res = await fetchData(
          'admin/createService',
          'post',
          service,
          token
        );
        console.log('reees', res);
      }
      //seteo services con el nuevo servicio y le pongo el campo de habilitado
      setServices([...services, {...service, service_is_enabled:0}])
      setService(initialValue);
    } catch (error) {
      console.log(error);
    }
  };

  const enableSwitch = async(id)=>{

    //me busca el servicio que quiero cambiar y le cambia el estado
    const updatedServices = services.map((service)=>{
      if(service.service_id === id){
        return {...service, service_is_enabled: service.service_is_enabled === 0 ? 1 : 0}
      };
      return service;
    })

    // actualizo services con el servicio que he cambiado
    setServices(updatedServices);

    //cojo el servicio que he actualizado y le guardo el estado para pasarselo al back por la data en la petición put
    const updatedService = updatedServices.find(e => e.service_id === id);
    const status = updatedService.service_is_enabled;

    try {
      await fetchData(`admin/enabledService/${id}`, "put", {service_is_enabled:status}, token);
    } catch (error) {
      console.log(error)      
    }
  }

  const editService = async(service)=>{
    if(isMobile){
      navigate(`/admin/editService/${service.service_id}`)
    }else{
      setShowModal(true)
      setModalEditService(service)
    }
  }

  const handleClose = async()=>{
    setShowModal(false)
  }

  return (
    <section className="padding-y-section">
      <div className="d-flex flex-column align-items-center justify-content-center py-4">
        <h3>Servicios</h3>
        <div className="blue-line"></div>
      </div>
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="table-services d-flex align-items-center justify-content-center">
          <div className="table-scroll-wrapper">
            <table>
              <tbody>
                {services.map((e) => {
                  return (
                    <tr key={e.service_id}>
                      <td>{e.service_name}</td>
                      <td>{e.price}€</td>
                      <td>{e.estimated_time}min</td>
                      <td>
                        <Button className='btn' onClick={()=>editService(e)}>Editar</Button>
                      </td>
                      <td>
                        <Form>
                          <Form.Check className='enabled' // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            checked={e.service_is_enabled === 0}
                            onChange={()=>enableSwitch(e.service_id)}
                          />
                        </Form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </Col>
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
            {/* <p className='text-center'>{errorMsg}</p> */}   
            <div className="d-flex justify-content-center align-items-center">
              <Button className="btn" onClick={onSubmit}>
                Añadir
              </Button>
            </div>
          </Form>
        </Col>
      </Row>

    {!isMobile && modalEditService && <ModalEditService show={showModal} handleClose={handleClose}></ModalEditService>}

    </section>
  );
};

export default Service;
