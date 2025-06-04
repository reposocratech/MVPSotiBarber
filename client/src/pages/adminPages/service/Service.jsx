import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import image from '../../../assets/icons/uploadimage.svg';
import './service.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelpers';
import deletebtn from '../../../assets/icons/deleteicon.png';
import editbtn from '../../../assets/icons/editicon.png';
import { FormCreateService } from '../../../components/formCreateService/FormCreateService';

const Service = () => {
  const { token, services, setServices } = useContext(AuthContext);

  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResizeScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResizeScreen();
    window.addEventListener('resize', handleResizeScreen);
    return () => window.removeEventListener('resize', handleResizeScreen);
  }, []);

  const enableSwitch = async (id) => {
    const updatedServices = services.map((service) => {
      if (service.service_id === id) {
        return {
          ...service,
          service_is_enabled: service.service_is_enabled === 0 ? 1 : 0,
        };
      }
      return service;
    });

    setServices(updatedServices);

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

  const handleButton = () => {
    navigate('/admin/createService');
  };

  const onDelete = async (id) => {
    try {
      await fetchData('admin/deleteService', 'put', { id }, token);

      setServices((prev) => prev.filter((service) => service.service_id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="padding-y-section">
      <Container fluid="xxl">
        <div className="d-flex flex-column align-items-center justify-content-center py-4">
          <h3>Servicios</h3>
          <div className="blue-line"></div>
        </div>
        <Row>
          {services.length !== 0 && (
            <Col className="d-flex justify-content-center align-items-center">
              <div className="table-services d-flex flex-column align-items-center justify-content-center">
                <div className="table-scroll-wrapper">
                  {!isMobile ? (
                    <table>
                      <tbody>
                        {services.map((e) => (
                          <tr className="tr-responsive" key={e.service_id}>
                            <td>{e.service_name}</td>
                            <td>{e.price}€</td>
                            <td>{e.estimated_time}min</td>
                            <td>
                              <button
                                className="btn-icon"
                                onClick={() =>
                                  navigate(`/admin/oneService/${e.service_id}`)
                                }
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
                                  className="enabled"
                                  type="switch"
                                  id={`custom-switch-${e.service_id}`}
                                  checked={e.service_is_enabled === 1}
                                  onChange={() => enableSwitch(e.service_id)}
                                />
                              </Form>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="mobile-services-list">
                      {services.map((service) => (
                        <div key={service.service_id} className="service-card">
                          <div>
                            <span>Servicio:</span> {service.service_name}
                          </div>
                          <div>
                            <span>Precio:</span> {service.price}€
                          </div>
                          <div>
                            <span>Duración:</span> {service.estimated_time} min
                          </div>
                          <div className="actions">
                            <button
                              className="btn-icon"
                              onClick={() =>
                                navigate(`/admin/oneService/${service.service_id}`)
                              }
                            >
                              <img src={editbtn} alt="Editar" />
                            </button>
                            <button
                              className="btn-icon"
                              onClick={() => onDelete(service.service_id)}
                            >
                              <img src={deletebtn} alt="Eliminar" />
                            </button>
                            <Form.Check
                              className="enabled"
                              type="switch"
                              id={`custom-switch-${service.service_id}`}
                              checked={service.service_is_enabled === 1}
                              onChange={() => enableSwitch(service.service_id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="pt-4"></div>
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
      </Container>
    </section>
  );
};

export default Service;