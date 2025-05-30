import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './servicelist.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Link } from 'react-router-dom';
import defaultService from '../../../assets/images/defaultservice.jpg';

const ServiceList = () => {
  const { services } = useContext(AuthContext);
  const [enabledServices, setEnabledServices] = useState(services);
  const [hasActivePromo, setHasActivePromo] = useState(false);
  console.log('SERVICIOS EN LA LISTA', services);

  useEffect(() => {
    const filtered = services.filter(
      (service) => service.service_is_enabled === 0
    );
    setEnabledServices(filtered);
  }, [services]);
  //console.log('***********', enabledServices);

  const today = new Date();
  console.log('HOOOOOY', today);

  const promoIsActive = (service) => {
    if (
      service.promo_name &&
      service.promo_price &&
      service.promo_start_date &&
      service.promo_end_date
    ) {
      const today = new Date();
      const start = new Date(service.promo_start_date);
      const end = new Date(service.promo_end_date);
      return today >= start && today <= end;
    }
    return false;
  };

  return (
    <section className="padding-y-section">
      <Container fluid="xxl">
        {services.length !== 0 && (
          <Row>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h3>Precios y Servicios</h3>
              <div className="blue-line"></div>
            </div>
            <Col>
              <div className="service-list d-flex justify-content-center align-items-center">
                <table>
                  <thead></thead>
                  <tbody>
                    {enabledServices.map((service) => {
                      const hasPromo = promoIsActive(service);

                      return (
                        <tr key={service.service_id}>
                          <td>{service.service_name}</td>
                          <td>
                            <div className="d-flex flex-column">
                              <span className={hasPromo ? 'line-through' : ''}>
                                {service.price}€
                              </span>
                              {hasPromo && (
                                <div className="d-flex flex-column align-items-center">
                                  <span>{service.promo_name}</span>
                                  <span className="text-success fw-bold">
                                    {service.promo_price}€
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>

                          <td>
                            <div className="d-flex align-items-center justify-content-center">
                              {service.estimated_time} min
                            </div>
                          </td>
                          <td>
                            <img
                              src={
                                service.service_avatar
                                  ? `${
                                      import.meta.env.VITE_SERVER_URL
                                    }images/service/${service.service_avatar}`
                                  : defaultService
                              }
                              alt="servicio"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        )}
        {services.length !== 0 && (
          <Row>
            <section className="padding-y-section">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h3>Conoce nuestros trabajos</h3>
                <div className="blue-line"></div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {services.map((service) => {
                  return (
                    <Link className="filter" to="" key={service.service_id}>
                      {service.service_name}
                    </Link>
                  );
                })}
              </div>
            </section>
          </Row>
        )}
        {services.length === 0 && (
          <section>
            <h3>En construcción</h3>
          </section>
        )}
      </Container>
    </section>
  );
};

export default ServiceList;
