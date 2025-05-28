import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
/* import image from '../../../assets/icons/uploadimage.svg'; */
import './service.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelpers';
import ModalEditService from '../../../components/modalEditService/ModalEditService';
import { createServiceSchema } from '../../../schemas/createServiceSchema';
import { ZodError } from 'zod';

const initialValue = {
  service_name: '',
  estimated_time: '',
  price: '',
  service_description: '',
};

const Service = () => {
  const { token, services, setServices } = useContext(AuthContext);
  const [service, setService] = useState(initialValue);
  const [isMobile, setIsMobile] = useState(false);
  const [modalService, setModalService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [valErrors, setValErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [maxLength, setMaxLength] = useState(0)

  //comprobar anchura de pantalla para elegir modal o vista neuva en el editService
  useEffect(() => {
    const handleResizeScreen = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      }
    };

    handleResizeScreen();
    window.addEventListener('resize', handleResizeScreen);
    return () => window.removeEventListener('resize', handleResizeScreen);
  }, []);
  console.log('anchura pantalla', window.innerWidth);


  const handleChange = (e) => {
    let { name, value } = e.target;
    
    const regex = /^\d*([.,]?\d{0,2})?$/;
    if(name !== "price" || name === "price" && regex.test(value) || name==="price" && value === ""){
      if(name === "price" ){
        value = value.trim().replace(",",".")
      }else{
        value = value.trim()
      }
      if(name === "service_description" && value.length < 251){
        setMaxLength(value.length)
        setService({ ...service, [name]: value });
      }else if (name !== "service_description"){
        setService({ ...service, [name]: value });
      }
    }
  };
  console.log('SERVICIO', service);

  //NO HEMOS METIDO IMAGEN EN LA TABLA SERVICE

  /* const handleChangeFile = (e) => {
    const {name} = e.target;
    setService({...service, [name]: e.target.files[0] })
  }; */

  const onSubmit = async () => {
    try {
      createServiceSchema.parse(service);
      let res = await fetchData('admin/createService', 'post', service, token);

      console.log('REEEESSSSSSS', res.data.service);

      //seteo services con el nuevo servicio y le pongo el campo de habilitado
      setErrorMsg(res.data.message);
      setValErrors({});
      //seteo servicios con el servicio nuevo que ya tiene el id incluido (me lo traigo del return de la query)
      setServices([...services, res.data.service]);
      setService(initialValue);
    } catch (error) {
      if (error instanceof ZodError) {
        let objTemp = {};
        error.errors.forEach((er) => {
          objTemp[er.path[0]] = er.message;
        });
        setValErrors(objTemp);
      } else if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('error');
      }
      console.log(error);
    }
  };

  const enableSwitch = async (id) => {
    //me busca el servicio que quiero cambiar y le cambia el estado
    const updatedServices = services.map((service) => {
      if (service.service_id === id) {
        return {
          ...service,
          service_is_enabled: service.service_is_enabled === 0 ? 1 : 0,
        };
      }
      return service;
    });

    // actualizo services con el servicio que he cambiado
    setServices(updatedServices);

    //cojo el servicio que he actualizado y le guardo el estado para pasarselo al back por la data en la petición put
    const updatedService = updatedServices.find((e) => e.service_id === id);
    const status = updatedService.service_is_enabled;

    try {
      await fetchData(
        `admin/enabledService/${id}`,
        'put',
        { service_is_enabled: status },
        token
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editService = async (service) => {
    try {
      if (isMobile) {
      navigate(`/admin/editService/${service.service_id}`, {
        state: { service },
      });
    } else {
      setShowModal(true);
      setModalService(service);
    }
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleClose = async () => {
    setShowModal(false);
  };

  const handleButton = () => {
    navigate('/admin/createService');
  };

  const cancel = () => {
    navigate('/admin/service');
  };

  const onUpdated = (updatedService) => {
    setServices(prev =>
      prev.map(service =>
        service.service_id === updatedService.service_id ? updatedService : service
      )
    );
  };

  const delete = async()=>{
    try {
      let res = await fetchData("admin/deleteService", "put", )
    } catch (error) {
      
    }

  }

  return (
    <section className="padding-y-section">
      <div className="d-flex flex-column align-items-center justify-content-center py-4">
        <h3>Servicios</h3>
        <div className="blue-line"></div>
      </div>
      <Row>
        {services.length !== 0 && (
          <Col  className="d-flex justify-content-center align-items-center">
            <div className="table-services d-flex flex-column align-items-center justify-content-center">
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
                            <Button
                              className="btn"
                              onClick={() => editService(e)}
                            >
                              Editar
                            </Button>
                          </td>
                          <td>
                            <Button onClick={delete}>
                              Borrar
                            </Button>
                          </td>
                          <td>
                            <Form>
                              <Form.Check
                                className='enabled' // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                checked={e.service_is_enabled === 0}
                                onChange={() => enableSwitch(e.service_id)}
                              />
                            </Form>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {isMobile && (
                <Button onClick={handleButton} className="mt-3">
                  Añadir servicio
                </Button>
              )}
              
            </div>
          </Col>
        )}
        {isMobile && services.length === 0 && (
          <Button onClick={handleButton} className="mt-3">
            Añadir servicio
          </Button>
        )}
        {!isMobile && (
          <Col className="d-flex justify-content-center align-items-center my-4">
            <Form className="form-create-service">
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
                  type="text"
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
                    type="text"
                    onChange={handleChange}
                    placeholder="Precio"
                  />
                </InputGroup>
                {valErrors.price && <p>{valErrors.price}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="descriptionInput">Descripción {maxLength}/250</Form.Label>
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
                {valErrors.service_description && (
                  <p>{valErrors.service_description}</p>
                )}
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
                <p className="text-center">{errorMsg}</p>

                <div className="d-flex justify-content-center align-items-center">
                 
                  <Button className="btn" onClick={onSubmit}>
                    Añadir
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        )}
      </Row>

      {!isMobile && modalService && (
        <ModalEditService
          cancel={cancel}
          show={showModal}
          handleClose={handleClose}
          service={modalService}
          onUpdated={onUpdated}
        ></ModalEditService>
      )}
    </section>
  );
};

export default Service;
