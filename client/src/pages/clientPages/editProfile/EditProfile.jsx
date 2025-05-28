import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import './editProfile.css';
import { AuthContext } from '../../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelpers';
import { ZodError } from 'zod';

import image from "../../../assets/icons/uploadimage.svg"
import { editClientSchema } from '../../../schemas/editClientSchema';

const EditProfile = () => {
  const { user, setUser, token } = useContext(AuthContext);
  const [editData, setEditData] = useState(user);
  const [errorMsg, setErrorMsg] = useState("")
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
      
      editClientSchema.parse(editData)

      const newFormData = new FormData();
      
      newFormData.append('data', JSON.stringify(editData));
      newFormData.append('file', file);


      let res = await fetchData('client/editClient', 'put', newFormData, token);

      if (!res.data.img) {
        setUser(editData);
      } else {
        setUser({ ...editData, avatar: res.data.img });
      }

      navigate('/client');
    } catch (error) {
      console.log("errooooorr", error);
      
      if (error instanceof ZodError) {
        let objTemp = {};
        error.errors.forEach((er) => {
          objTemp[er.path[0]] = er.message;
        });
        setValErrors(objTemp);
        if(error.response){
              setErrorMsg(error.response.data.message)
            }else{
              setErrorMsg("")
            }
      }
    }
  };

  return (
    <section className="edit-user padding-y-section">
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
                {valErrors.lastname && <p>{valErrors.lastname}</p>}
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
                {valErrors.phone && <p>{valErrors.phone}</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="ImageInput" className='cursor-pointer'> <img src={image}/>Subir imagen</Form.Label>
                <Form.Control
                  id="ImageInput"
                  // name="avatar"
                  type="file"
                  hidden
                  onChange={handleChangeFile}
                />
              </Form.Group>
              <p>{errorMsg}</p>
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
