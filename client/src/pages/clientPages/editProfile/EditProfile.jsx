import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import './editProfile.css';
import { AuthContext } from '../../../context/AuthContextProvider';

const EditProfile = () => {
  
   const [imagenPreview, setImagenPreview] = useState(null);
   const [archivo, setArchivo] = useState(null);
   const {user, setUser} = useContext(AuthContext);
   const [editData, setEditData] = useState(user);
  
   console.log("editdataaa", editData);
   

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setArchivo(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      } ;
      reader.readAsDataURL(file)
    }
   }

   const guardarArchivo = (e) => {
    console.log('imagen lista para subir', archivo);
    
   }

   const handleChange = (e) => {
     const {name, value} = e.target;
     setEditData({...editData, [name]: value})
   }
  
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
                  value={editData.user_name? editData.user_name : ""}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="NameInput">Apellidos:</Form.Label>
                <Form.Control
                  id="LastNameImput"
                  name="lastname"
                  placeholder="Enter your lastname"
                  onChange={handleChange}
                  value={editData.lastname? editData.lastname : ""}
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
                    value={editData.birth_date? editData.birth_date : ""} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="NameInput">Teléfono:</Form.Label>
                <Form.Control
                  id="PhoneImput"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  value={editData.phone? editData.phone : ""}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="ImageInput">Subir imagen</Form.Label>
                <Form.Control
                  id="ImageImput"
                  name="avatar"
                  type='file'
                />
              </Form.Group>

              <Button type="submit">Editar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EditProfile;
