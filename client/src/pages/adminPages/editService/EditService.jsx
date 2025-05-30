import React, { useContext, useEffect, useState} from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams} from 'react-router-dom';
import image from '../../../assets/icons/uploadimage.svg';
import { fetchData } from '../../../helpers/axiosHelpers';
import { AuthContext } from '../../../context/AuthContextProvider';
import {editServiceSchema} from '../../../schemas/editServiceSchema.js'

import './editservice.css';
import { ZodError } from 'zod';

const EditService = () => {
  const navigate = useNavigate();
  /* const [editedService, setEditedService] = useState(service); */
  const { token, setServices } = useContext(AuthContext);
  const [file, setFile] = useState();
  const [valErrors, setValErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [editedService, setEditedService] = useState({})

  const {id} = useParams();


  const fetchService = async()=>{
    try {
      let service = await fetchData(`admin/getOneService/${id}`, "get", null, token);
      setEditedService(service.data.result);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchService()
  },[id])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedService({ ...editedService, [name]: value });
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    try {

      editServiceSchema.parse(editedService);

      const newFormData = new FormData();

      newFormData.append('data', JSON.stringify(editedService));
      if (file) {
        newFormData.append('file', file);
      }
      

      let res = await fetchData('admin/editService', 'put', newFormData, token);

      //seteo el services del context con el servicio que he editado
      setServices((prev) =>
        prev.map((service) =>
          service.service_id === editedService.service_id
            ? res.data.result
            : service
        )
      );

      navigate('/admin/service');
    } catch (error) {

      if (error instanceof ZodError){
        let objTemp = {};
        error.errors.forEach((er)=>{
          objTemp[er.path[0]] = er.message;
        });
        setValErrors(objTemp);
      }else if (error.response){
        setErrorMsg(error.response.data.message);
      }else{
        setErrorMsg("error");
      }
      console.log(error);
    }
  };

  const cancel = async () => {
    navigate('/admin/service');
  };

  return (
    <section className="padding-y-section">
      <Container>
        <Row>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h3>Editar servicio</h3>
            <div className="blue-line"></div>
          </div>
          <Col>
            <Form className="edit-form">
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="service_name"
                  value={editedService.service_name}
                  onChange={handleChange}
                  placeholder="Nombre"
                  autoFocus
                />
                {valErrors.service_name && <p>{valErrors.service_name}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <InputGroup>
                  <InputGroup.Text>€</InputGroup.Text>
                  <Form.Control
                    name="price"
                    value={editedService.price}
                    type="number"
                    step="0.50"
                    min="0"
                    onChange={handleChange}
                    placeholder="Precio"
                  />
                  {valErrors.price && <p>{valErrors.price}</p>}
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="estimatedTimeInput">
                <Form.Label>Duración</Form.Label>
                <Form.Control
                  name="estimated_time"
                  value={editedService.estimated_time}
                  type="number"
                  min="1"
                  step="1"
                  onChange={handleChange}
                  placeholder="Duración"
                  autoFocus
                />
                {valErrors.estimated_time && <p>{valErrors.estimated_time}</p>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="descriptionInput">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name="service_description"
                  value={editedService.service_description}
                  as="textarea"
                  rows={3}
                  maxLength={250}
                  onChange={handleChange}
                  placeholder="Descripción"
                  autoFocus
                />
                {valErrors.service_description && <p>{valErrors.service_description}</p>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="promoInput">
                <Form.Label>Promoción</Form.Label>
                <Form.Control
                  type="text"
                  name="promo_name"
                  placeholder="Nombre Promoción"
                  value={editedService.promo_name}
                  onChange={handleChange}
                  autoFocus
                />
                {valErrors.service_description && (
              <p>{valErrors.service_description}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="promoPriceInput">
                <Form.Label>Precio Promoción</Form.Label>
                <InputGroup>
                  <InputGroup.Text>€</InputGroup.Text>
                  <Form.Control
                    name="promo_price"
                    value={editedService.promo_price}
                    type="number"
                    onChange={handleChange}
                    placeholder="Precio Promoción"
                  />
                </InputGroup>
                {valErrors.promo_price && (
              <p>{valErrors.promo_price}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="promoStartDateInput">
                <Form.Label>Fecha Inicio Promoción</Form.Label>
                <Form.Control
                  type="date"
                  name="promo_start_date"
                  value={editedService.promo_start_date}
                  onChange={handleChange}
                  autoFocus
                />
                {valErrors.promo_start_date && (
              <p>{valErrors.promo_start_date}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="promoEndDateInput">
                <Form.Label>Fecha Fin Promoción</Form.Label>
                <Form.Control
                  type="date"
                  name="promo_end_date"
                  value={editedService.promo_end_date}
                  onChange={handleChange}
                  autoFocus
                />
                {valErrors.promo_end_date && (
              <p>{valErrors.promo_end_date}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="cursor-pointer" htmlFor="imageInput">
                  <img src={image} alt="" /> Subir imagen
                </Form.Label>
                <Form.Control
                  id="imageInput"
                  type="file"
                  hidden
                  onChange={handleChangeFile}
                />
              </Form.Group>
              {/* <p className="text-center">{errorMsg}</p> */}
              <div className="d-flex align-items-center justify-content-center">
                <Button className="btn" onClick={cancel}>
                  Cancelar
                </Button>
                <Button className="btn" onClick={onSubmit}>
                  Guardar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditService;
