import React, {useContext, useState} from 'react';
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import phoneIcon from '../../../assets/icons/phone.png';
import mailIcon from '../../../assets/icons/mail.png';
import ubicationIcon from '../../../assets/icons/ubication.png';
import { AuthContext } from '../../../context/AuthContextProvider';
import "./contact.css"



const Contact = () => {

  const {user} = useContext(AuthContext)

 const [confirmMessage, setconfirmMessage] = useState("");
 const [formData, setFormData] = useState({
    name: user?.user_name || "",
    email: user?.email || "",
    message: ""
  });

  const handleChange = (e) => {
     const {name, value} = e.target
    setFormData({...formData, [name]:value})
  };


const onSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post("http://localhost:4000/client/contact", formData);
    setconfirmMessage(data.message);
    setFormData({ name: user?.user_name || "", email: user?.email || "", message: "" });
  } catch (error) {
    console.error("Error:", error);
    setconfirmMessage("Error al enviar el mensaje");
  }
};



  return (
    <div className="contact-section">
      <Container>
        <h2 className="text-center ">Contacto</h2>
        <div className='blue-line'></div>
        <p className="text-center contact-separation">
           {user
            ? `Hola ${user.user_name}, ¿en qué podemos ayudarte?`
            : "¿Tienes alguna pregunta o deseas reservar una cita? No dudes en contactarnos"}
        </p>

        <Row className="mb-5 align-items-stretch">
          <Col md={6}>
            <div className="contact-form">
              <h5 className="mb-4">Envíanos un mensaje</h5>
              <Form>
                <Form.Group  className="mb-3">
                  <Form.Label htmlFor='NameTextInput'>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Escribe tu nombre..."
                  />
                </Form.Group>

                <Form.Group  className="mb-3">
                  <Form.Label htmlFor='EmailTextInput'>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Escribe tu email..."
                  />
                </Form.Group>

                <Form.Group  className="mb-3">
                  <Form.Label htmlFor='TextareaTextInput'>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Escribe tu mensaje..."
                  />
                </Form.Group>

                 <div className="d-flex justify-content-center">
                  <Button className="boton" onClick={onSubmit}>Enviar mensaje</Button>
                </div>
                {confirmMessage && (<p className="text-center mt-3">{confirmMessage}</p>)}
              </Form>
            </div>
          </Col>

          <Col md={6}>
            <Row className="gy-4">
              <Col xs={12}>
                <div className="contact-card">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={phoneIcon}
                      alt="Teléfono"
                      className="contact-icon"
                    />
                    <div>
                      <p className="mb-0 fw-bold">Teléfono</p>
                      <p className="mb-0">601530639</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12}>
                <div className="contact-card">
                  <div className="d-flex align-items-center gap-3">
                    <img src={mailIcon} alt="Email" className="contact-icon" />
                    <div>
                      <p className="mb-0 fw-bold">Email</p>
                      <p className="mb-0">info@soti.com</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12}>
                <div className="contact-card">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={ubicationIcon}
                      alt="Ubicación"
                      className="contact-icon"
                    />
                    <div>
                      <p className="mb-0 fw-bold">Dirección</p>
                      <p className="mb-0">
                        Calle Daniel Vázquez Díaz, 5 (Huelva)
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="text-center contact-separation">
          <h3>Nuestra Ubicación</h3>
          <div className='blue-line'></div>
          <p>
            Nos encontramos en una ubicación de fácil acceso, ¡ven a visitarnos!
          </p>
        </div>

        <div className="ubicacion">
          <iframe
            title="mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.787430443898!2d-6.9489872!3d37.2559381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0d8854ae9fa391%3A0x100c738ef3196e2f!2sC.%20Daniel%20V%C3%A1zquez%20D%C3%ADaz%2C%205%2C%2021005%20Huelva!5e0!3m2!1ses!2ses!4v1716371433685!5m2!1ses!2ses"
            loading="lazy"
          ></iframe>
        </div>
      </Container>
    </div>
  );
};
 
export default Contact