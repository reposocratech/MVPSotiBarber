import React, { useContext, useState } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/icons/uploadimage.svg';
import { createServiceSchema } from '../../schemas/createServiceSchema';
import { AuthContext } from '../../context/AuthContextProvider';
import { fetchData } from '../../helpers/axiosHelpers';

const initialValue = {
  service_name: '',
  estimated_time: '',
  price: '',
  service_description: '',
  service_avatar:''
};

export const FormCreateService = () => {
  const [service, setService] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const { token, services, setServices } = useContext(AuthContext);
  const navigate = useNavigate();
  const [maxLength, setMaxLength] = useState(0);
    const [file, setFile] = useState();

  const handleChange = (e) => {
    let { name, value } = e.target;

    const regex = /^\d*([.,]?\d{0,2})?$/;
    if (
      name !== 'price' ||
      (name === 'price' && regex.test(value)) ||
      (name === 'price' && value === '')
    ) {
      if (name === 'price') {
        value = value.replace(',', '.');
      } 
      else if (name !== 'service_description' && name !== 'service_name') {
        value = value.trim();
      }

      if (name === 'service_description' && value.length < 251) {
        setMaxLength(value.length);
        setService({ ...service, [name]: value });
      } else if (name !== 'service_description') {
        setService({ ...service, [name]: value });
      }
    }
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0])
  }

  const cancel = () => {
    navigate('/admin/service');
  };

  const onSubmit = async () => {
    try {
      createServiceSchema.parse(service);

      const newFormData = new FormData();

      newFormData.append("data", JSON.stringify(service));
      if(file){
        newFormData.append("file", file)
      }

      const res = await fetchData('admin/createService', 'post', newFormData, token);

    console.log("RESSSS:DATA", res.data)

      //seteo services con el nuevo servicio y le pongo el campo de habilitado
      setErrorMsg(res.data.message);
      setValErrors({});
      //seteo servicios con el servicio nuevo que ya tiene el id incluido (me lo traigo del return de la query)
      setServices([...services, res.data.service]);

      setService(initialValue);
      navigate("/admin/service")
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

  console.log("LSADFJLSKDFJ", service)

  return (
    <Form className="formularios form-add-service">
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
        {valErrors.service_name && <p className='error' >{valErrors.service_name}</p>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="durationInput">Duración (minutos)</Form.Label>
        <Form.Control
          id="durationInput"
          name="estimated_time"
          value={service.estimated_time}
          type="text"
          onChange={handleChange}
          placeholder="Duración"
        />
        {valErrors.estimated_time && <p className='error'>{valErrors.estimated_time}</p>}
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
        {valErrors.price && <p className='error'>{valErrors.price}</p>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="descriptionInput">
          Descripción {maxLength}/250
        </Form.Label>
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
          <p className='error'>{valErrors.service_description}</p>
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
      <div className="d-flex flex-column justify-content-center align-items-center">
        {/* <p className="text-center">{errorMsg}</p> */}

        <div className="d-flex justify-content-center align-items-center">
          <button  onClick={cancel} className="btn me-3">
            Cancelar
          </button>
          <button type="button" className="btn" onClick={onSubmit}>
            Añadir
          </button>
        </div>
      </div>
    </Form>
  );
};
