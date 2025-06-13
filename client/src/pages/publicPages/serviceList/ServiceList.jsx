import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './servicelist.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Link } from 'react-router-dom';
import defaultService from '../../../assets/images/servicios-2.jpg';
import { fetchData } from '../../../helpers/axiosHelpers';

const ServiceList = () => {
  const { services } = useContext(AuthContext);
  const [enabledServices, setEnabledServices] = useState(services);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState(images);

  useEffect(() => {
    const filtered = services.filter(
      (service) => service.service_is_enabled === 0
    );
    setEnabledServices(filtered);
  }, [services]);

  const fetchImages = async () => {
    try {
      let result = await fetchData(`client/allImages`, 'get', null);
      setImages(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [services]);

  useEffect(() => {
    setFilteredImages(images);
  }, [images]);


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

  const filterImages = (id) => {
    let result = images.filter((image) => image.service_id === id);
    setFilteredImages(result);
  };

  const shuffledPhotos = [...images].sort(() => Math.random() - 0.5);

  return (
    <section className="padding-y-section">
      <Container fluid="xxl">
        {services.length !== 0 && (
          <Row>
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
              <h3>Precios y Servicios</h3>
              <div className="blue-line"></div>
            </div>
            <Col className="d-flex justify-content-center align-items-center">
              <div className="service-list d-flex justify-content-center align-items-center">
                <table>
                  <thead></thead>
                  <tbody>
                    {enabledServices.map((service) => {
                      const hasPromo = promoIsActive(service);

                      return (
                        <tr className="tabla" key={service.service_id}>
                          <td>{service.service_name}</td>
                          <td>
                            <div className="d-flex flex-column align-items-center justify-content-center">
                              <span className={hasPromo ? 'line-through' : ''}>
                                {service.price}€
                              </span>
                              {hasPromo && (
                                <div className="d-flex flex-column align-items-center justify-content-center">
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
              <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                <h3>Conoce nuestros trabajos</h3>
                <div className="blue-line"></div>
              </div>

              <div className="filter-container">
                <button
                  className="filter"
                  onClick={() => setFilteredImages(shuffledPhotos)}
                >
                  Todas
                </button>

                {enabledServices.map((service) => {
                  return (
                    <button
                      onClick={() => filterImages(service.service_id)}
                      className="filter"
                      key={service.service_id}
                    >
                      {service.service_name}
                    </button>
                  );
                })}
              </div>
              <div className="gallery d-flex align-items-center justify-content-center">
                {filteredImages.length ? (
                  filteredImages.map((image) => {
                    return (
                      <img
                        key={`${image.image_id}-${image.image_name}`}
                        className="photo mt-4"
                        src={`${
                          import.meta.env.VITE_SERVER_URL
                        }images/servicesImages/${image.image_name}`}
                        alt="foto servicio"
                      />
                    );
                  })
                ) : (
                  <div className="d-flex align-items-center justify-content-center">
                    <p className="pt-5">No hay fotos todavía</p>
                  </div>
                )}
              </div>
            </section>
          </Row>
        )}
        {services.length === 0 && (
          <section className='text-center'>
            <h3>En construcción</h3>
          </section>
        )}
      </Container>
    </section>
  );
};

export default ServiceList;
