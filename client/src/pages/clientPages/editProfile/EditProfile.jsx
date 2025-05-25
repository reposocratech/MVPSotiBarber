import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import './editProfile.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchData } from '../../../helpers/axiosHelpers';

const EditProfile = () => {
  const [imagenPreview, setImagenPreview] = useState(null);
  const { user, setUser, token } = useContext(AuthContext);
  const [editData, setEditData] = useState(user);
  const [file, setFile] = useState();

  console.log("----------", token);
  

  const navigate = useNavigate();

  console.log('editdataaa', editData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const cancelEdit = () => {
    setEditData(user);
    navigate('/client');
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = () => {
    try {
      const newFormData = new FormData();

      newFormData.append('editData', JSON.stringify(editData));
      newFormData.append('file', file);
      let res = fetchData("client/editClient", "put", newFormData, {Authorization: `Bearer ${token}`});

      console.log("reeeeeeeesssss", res);
      

      setUser(editData);
      navigate('/client');
    } catch (error) {

    }
  };

  return (
    <section className="edit-user">
      <Container>
        <Row className="engloba">
          <Col md={12} lg={6} className="cols">
            <Form className="form-editUser">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="NameInput">Nombre:</Form.Label>
                <Form.Control
                  id="NameImput"
                  name="user_name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={editData.user_name ? editData.user_name : ''}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="NameInput">Apellidos:</Form.Label>
                <Form.Control
                  id="LastNameImput"
                  name="lastname"
                  placeholder="Enter your lastname"
                  onChange={handleChange}
                  value={editData.lastname ? editData.lastname : ''}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="NameInput">
                  Fecha de nacimiento:
                </Form.Label>
                <Form.Control
                  id="DateImput"
                  type="date"
                  name="birth_date"
                  onChange={handleChange}
                  value={editData.birth_date ? editData.birth_date : ''}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="NameInput">Teléfono:</Form.Label>
                <Form.Control
                  id="PhoneImput"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  value={editData.phone ? editData.phone : ''}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="ImageInput">Subir imagen</Form.Label>
                <Form.Control
                  id="ImageImput"
                  name="avatar"
                  type="file"
                  onChange={handleChangeFile}
                />
              </Form.Group>
              <div className="d-flex gap-2 justify-content-center">
                <Button onClick={onSubmit}>Editar</Button>
                <Button type="button" onClick={cancelEdit}>
                  Cancelar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditProfile;
