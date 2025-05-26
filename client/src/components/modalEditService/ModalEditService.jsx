import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { fetchData } from '../../helpers/axiosHelpers'
import { AuthContext } from '../../context/AuthContextProvider'

const ModalEditService = ({service, show, handleClose, onUpdated}) => {
  const [editedService, setEditedService] = useState(service)
  const {token} = useContext(AuthContext)

  useEffect(()=>{
    if(service){
      setEditedService(service)
    }
  }, [])



  const handleChange = (e)=>{
    const {name, value} = e.target;

    setEditedService({...editedService, [name]:value})
  }
  

  const onSubmit = async ()=>{
    try {
      let res = await fetchData('admin/editService', "put", editedService, token)
      console.log(res);
      onUpdated(editedService)
      handleClose();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal dialogClassName='modal-edit-service' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='modal-title'>Editar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                  value={editedService.promo_price}
                  type="number"
                  onChange={handleChange}
                  placeholder="Precio Promoción"
                />
              </InputGroup>
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className='btn' onClick={onSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ModalEditService