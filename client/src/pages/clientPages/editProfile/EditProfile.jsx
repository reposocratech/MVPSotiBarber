import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import './editProfile.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelpers';
import { ZodError } from 'zod';

const EditProfile = () => {
  const { user, setUser, token } = useContext(AuthContext);
  const [editData, setEditData] = useState(user);
  const [file, setFile] = useState();
  const [valErrors, setValErrors] = useState({})

  const navigate = useNavigate();

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

  const onSubmit = async () => {
    try {
      const newFormData = new FormData();

      newFormData.append('editData', JSON.stringify(editData));
      newFormData.append('file', file);

      let res = await fetchData('client/editClient', 'put', newFormData, token);

      if (!res.data.img) {
        setUser(editData);
      } else {
        setUser({ ...editData, avatar: res.data.img });
      }

      navigate('/client');
    } catch (error) {
      if (error instanceof ZodError) {
        let objTemp = {};
        error.errors.forEach((er) => {
          objTemp[er.path[0]] = er.message;
        });
        setValErrors(objTemp);
      }
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
                 {valErrors.user_name && <p>{valErrors.user_name}</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="LastNameInput">Apellidos:</Form.Label>
                <Form.Control
                  id="LastNameImput"
                  name="lastname"
                  placeholder="Enter your lastname"
                  onChange={handleChange}
                  value={editData.lastname ? editData.lastname : ''}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="DateInput">
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
                <Form.Label htmlFor="PhoneInput">Teléfono:</Form.Label>
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
