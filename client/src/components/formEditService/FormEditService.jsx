import React, { useContext, useEffect, useState } from 'react'
import { editServiceSchema } from '../../schemas/editServiceSchema';
import { ZodError } from 'zod';
import { AuthContext } from '../../context/AuthContextProvider';
import image from '../../assets/icons/uploadimage.svg'
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../helpers/axiosHelpers';
import { Button, Form, InputGroup } from 'react-bootstrap';

export const FormEditService = ({service, handleClose, onUpdated, cancel}) => {
  
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [file, setFile] = useState();
    const [valErrors, setValErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [editedService, setEditedService] = useState(service);

    useEffect(() => {
        if (editedService) {
          setEditedService(editedService);
        }
      }, [editedService]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log("EEE.TARGET",e.target.value)

    if(name === "promo_price" && value === ""){
      value = null
    }
    
    setEditedService({ ...editedService, [name]: value });
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async () => {

      try {
        editServiceSchema.parse(editedService);
  
        const newFormData = new FormData();
        let temporalService = {...editedService}
        if(editedService.promo_start_date === ""){
          temporalService = {...temporalService, promo_start_date:null}
        }
        if(editedService.promo_end_date === ""){
          temporalService = {...temporalService, promo_end_date:null}
        }
        newFormData.append("data", JSON.stringify(temporalService));
        if(file){
          newFormData.append("file", file)
        }
  
        let res = await fetchData(
          'admin/editService',
          'put',
          newFormData,
          token
        );
        console.log("RESSS", res)

        
        if(res.data.img){
          onUpdated({...editedService, service_avatar: res.data.img})
        }else{
          onUpdated(editedService)
        }
        handleClose();
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

    console.log("editedservice", editedService)


  return (
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
                {valErrors.service_name && <p className='error'>{valErrors.service_name}</p>}
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
                </InputGroup>
                  {valErrors.price && <p className='error'>{valErrors.price}</p>}
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
                {valErrors.estimated_time && <p className='error'>{valErrors.estimated_time}</p>}
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
                {valErrors.service_description && <p className='error'>{valErrors.service_description}</p>}
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

              </Form.Group>
              <Form.Group className="mb-3" controlId="promoPriceInput">
                <Form.Label>Precio Promoción</Form.Label>
                <InputGroup>
                  <InputGroup.Text>€</InputGroup.Text>
                  <Form.Control
                    name="promo_price"
                    value={editedService.promo_price?editedService.promo_price:""}
                    type="text"
                    onChange={handleChange}
                    placeholder="Precio Promoción"
                  />
                </InputGroup>
                {valErrors.promo_price && (
              <p className='error'>{valErrors.promo_price}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="promoStartDateInput">
                <Form.Label>Fecha Inicio Promoción</Form.Label>
                <Form.Control
                  type="date"
                  name="promo_start_date"
                  value={editedService.promo_start_date?editedService.promo_start_date:""}
                  onChange={handleChange}
                  autoFocus
                />
                {valErrors.promo_start_date && (
              <p className='error'>{valErrors.promo_start_date}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="promoEndDateInput">
                <Form.Label>Fecha Fin Promoción</Form.Label>
                <Form.Control
                  type="date"
                  name="promo_end_date"
                  value={editedService.promo_end_date?editedService.promo_end_date:""}
                  onChange={handleChange}
                  autoFocus
                />
                {valErrors.promo_end_date && (
              <p className='error'>{valErrors.promo_end_date}</p>
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
              <div>
                <div className="d-flex align-items-center justify-content-center">

                  <button className="btn me-3" onClick={cancel}>
                    Cancelar
                  </button>
                  <button type="button" className="btn" onClick={onSubmit}>
                    Guardar
                  </button>
                </div>
              </div>
            </Form>
  )
}
