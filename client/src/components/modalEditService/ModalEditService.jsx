import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { fetchData } from '../../helpers/axiosHelpers';
import { AuthContext } from '../../context/AuthContextProvider';
import image from '../../assets/icons/uploadimage.svg'
import { editServiceSchema } from '../../schemas/editServiceSchema';
import { ZodError } from 'zod';
import { FormEditService } from '../formEditService/FormEditService';

const ModalEditService = ({ service, show, handleClose, onUpdated, cancel}) => {

  return (
    <Modal
      dialogClassName="modal-edit-service"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Editar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormEditService cancel={cancel} onUpdated={onUpdated} service={service} handleClose={handleClose}/>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditService;
