import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import image from '../../../assets/icons/uploadimage.svg';
import './service.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelpers';
import ModalEditService from '../../../components/modalEditService/ModalEditService';
/* import { createServiceSchema } from '../../../schemas/createServiceSchema'; */
import { ZodError } from 'zod';
import deletebtn from '../../../assets/icons/deleteicon.png';
import editbtn from '../../../assets/icons/editicon.png';
import { FormCreateService } from '../../../components/formCreateService/FormCreateService';


const Service = () => {
  const { token, services, setServices } = useContext(AuthContext);

  const [isMobile, setIsMobile] = useState(false);
  const [modalService, setModalService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
 

  console.log("SERVICES EN EL SERVICE",services)

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
        navigate(`/admin/editService/${service.service_id}`);
      } else {
        //cierro y limpio el modal
        setShowModal(false);
        setModalService(null);

        //esto hace que espere un momento antes de volverlo abrir, para que una vez se abra de nuevo, ya lo haya reseteado y borrado los datos del modal anterior
        setTimeout(() => {
          setModalService(service);
          setShowModal(true);
        }, 0);
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
    setServices((prev) =>
      prev.map((service) =>
        service.service_id === updatedService.service_id
          ? updatedService
          : service
      )
    );
  };

  const onDelete = async (id) => {
    try {
      await fetchData('admin/deleteService', 'put', { id }, token);

      //seteo los servicios eliminando el que he borrado
      setServices((prev) =>
        prev.filter((service) => service.service_id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <section className="padding-y-section">
      <div className="d-flex flex-column align-items-center justify-content-center py-4">
        <h3>Servicios</h3>
        <div className="blue-line"></div>
      </div>
      <Row>
        {services.length !== 0 && (
          <Col className="d-flex justify-content-center align-items-center">
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
                            <button
                              className="btn-icon"
                              onClick={() => editService(e)}
                            >
                              <img src={editbtn} alt="Editar" />
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn-icon"
                              onClick={() => onDelete(e.service_id)}
                            >
                              <img src={deletebtn} alt="Eliminar" />
                            </button>
                          </td>
                          <td>
                            <Form>
                              <Form.Check
                                className='enabled' // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                checked={e.service_is_enabled === 0}
                                onChange={() => enableSwitch(e?.service_id)}
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
            <FormCreateService />
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
