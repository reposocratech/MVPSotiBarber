import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './serviceprofile.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import defaultService from '../../../assets/images/defaultservice.jpg';
import { fetchData } from '../../../helpers/axiosHelpers';
import editbtn from '../../../assets/icons/editicon.png';
import ModalEditService from '../../../components/modalEditService/ModalEditService';
import deletecross from '../../../assets/icons/deletecross.png';
import ImagesDragList from '../../../components/imagesDragList/ImagesDragList';
import addImage from '../../../assets/icons/add_image.png';

const ServiceProfile = () => {
  const { services, setServices, token } = useContext(AuthContext);
  const [service, setService] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [modalService, setModalService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);

  console.log("SERVICESSS", services)
  const service_id = useParams();

  //PARA MEJORA EN EL FUTURO; EN LUGAR DE PINTAR MODALES EN MOVIL, CAMBIAR A VISTA NUEVA
  // useEffect(() => {
  //   const handleResizeScreen = () => {
  //     if (window.innerWidth <= 768) {
  //       setIsMobile(true);
  //     }
  //   };

  //   handleResizeScreen();
  //   window.addEventListener('resize', handleResizeScreen);
  //   return () => window.removeEventListener('resize', handleResizeScreen);
  // }, []);

  useEffect(() => {
    if (services) {
      const updatedService = services.find(
        (service) => service.service_id == service_id.id
      );
      setService(updatedService);
    }
  }, [services, service_id.id]);

  const fetchImages = async () => {
    try {
      let result = await fetchData(
        `admin/getImages/${service_id.id}`,
        'get',
        null,
        token
      );
      setImages(result.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [service_id.id, services]);

  const editService = async (service) => {
    try {
      /* if (isMobile) {
        navigate(`/admin/editService/${service.service_id}`); */
      /* } else { */
      //cierro y limpio el modal
      setShowModal(false);
      setModalService(null);

      //esto hace que espere un momento antes de volverlo abrir, para que una vez se abra de nuevo, ya lo haya reseteado y borrado los datos del modal anterior
      setTimeout(() => {
        setModalService(service);
        setShowModal(true);
      }, 0);
      /* } */
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async () => {
    setShowModal(false);
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

  //PARA LA GALERIA
  const handleChange = async (e, service_id) => {
    let uploadImgs = e.target.files;

    const newFormData = new FormData();
    if (uploadImgs && uploadImgs.length) {
      for (const elem of uploadImgs) {
        newFormData.append('file', elem);
      }
      newFormData.append('data', JSON.stringify(service_id));

      try {
        let res = await fetchData(
          'admin/addImages',
          'post',
          newFormData,
          token
        );
        fetchImages();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cancel = () => {
    setShowModal(false);
  };

  const promoIsActive = (service) => {
    if (
      service?.promo_name &&
      service?.promo_price &&
      service?.promo_start_date &&
      service?.promo_end_date
    ) {
      const today = new Date();
      const start = new Date(service.promo_start_date);
      const end = new Date(service.promo_end_date);
      return today >= start && today <= end;
    }
    return false;
  };

  const deleteImg = async (image_id, file_name) => {
    try {
      await fetchData(
        `admin/delImage/${service_id.id}/${image_id}/${file_name}`,
        'delete',
        null,
        token
      );
      setImages(images.filter((elem) => elem.image_id !== image_id));
    } catch (error) {
      console.log(error);
    }
  };

  const hasPromo = promoIsActive(service);

  return (
    <section className="padding-y-section">
      <Container fluid="xxl">
        <Row>
          <div className="d-flex flex-column align-items-center justify-content-center mb-3">
            <h3>{service?.service_name}</h3>
            <div className="blue-line"></div>
          </div>
          <Col className='d-flex align-items-center justify-content-center'>
            <div className="service-list d-flex justify-content-center align-items-center">
              <table>
                <thead></thead>
                <tbody>
                  <tr className="tabla" key={service?.service_id}>
                    <td>{service?.service_name}</td>
                    <td>
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        <span className={hasPromo ? 'line-through' : ''}>
                          {service?.price}€
                        </span>
                        {hasPromo && (
                          <div className="d-flex flex-column align-items-center">
                            <span>{service?.promo_name}</span>
                            <span className="text-success fw-bold">
                              {service?.promo_price}€
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                        {service?.estimated_time} min
                      </div>
                    </td>
                    <td>
                      <img
                        src={
                          service?.service_avatar
                            ? `${
                                import.meta.env.VITE_SERVER_URL
                              }images/service/${service?.service_avatar}`
                            : defaultService
                        }
                        alt="servicio"
                      />
                    </td>
                    <td>
                      <button type="button" className='btn' onClick={editService}>Editar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
        {showModal && (
          <ModalEditService
            cancel={cancel}
            show={showModal}
            handleClose={handleClose}
            service={service}
            onUpdated={onUpdated}
          ></ModalEditService>
        )}
        {service && (
          <section className="padding-y-section">
            <div className="d-flex flex-column justify-content-center align-items-center mb-3">
              <h3>Conoce nuestros trabajos</h3>
              <div className="blue-line"></div>
            </div>
            <Row className="gallery justify-content-center align-items-center">
             
                {images.length ? (
                  <ImagesDragList
                    service={service}
                    handleChange={handleChange}
                    images={images}
                    setImages={setImages}
                    deleteImg={deleteImg}
                  />
                ) : (
                  <div className="d-flex gap-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="m-0">Agrega algunas fotos</p>
                    </div>
                    <label htmlFor="imgId">
                      {' '}
                      <img src={addImage} alt="añadir imagen servicios" />{' '}
                    </label>
                    <input
                      type="file"
                      id="imgId"
                      hidden
                      multiple
                      onChange={(event) =>
                        handleChange(event, service.service_id)
                      }
                    />
                  </div>
                )}
               
            </Row>
          </section>
        )}
      </Container>
    </section>
  );
};

export default ServiceProfile;
