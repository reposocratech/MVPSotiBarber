import React from 'react'
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import phoneIcon from '../../../assets/icons/phone.png';
import mailIcon from '../../../assets/icons/mail.png';
import ubicationIcon from '../../../assets/icons/ubication.png';
import "./contact.css"

const Contact = () => {
  return (
    <div className="contact-section">
      <Container>
        <h2 className="text-center mb-2">Contacto</h2>
        <hr className="contact-divider" />
        <p className="text-center mb-5">
          ¿Tienes alguna pregunta o deseas reservar una cita? No dudes en
          contactarnos
        </p>

        <Row className="mb-5">
          <Col md={6}>
            <Card className="contact-form">
              <h5 className="mb-4">Envíanos un mensaje</h5>
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escribe tu nombre..."
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Escribe tu email..."
                  />
                </Form.Group>

                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Escribe tu mensaje..."
                  />
                </Form.Group>

                <Button variant="secondary" className="w-100">
                  Enviar mensaje
                </Button>
              </Form>
            </Card>
          </Col>

          <Col md={6}>
            <Row className="gy-4">
              <Col xs={12}>
                <Card className="contact-card">
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
                </Card>
              </Col>

              <Col xs={12}>
                <Card className="contact-card">
                  <div className="d-flex align-items-center gap-3">
                    <img src={mailIcon} alt="Email" className="contact-icon" />
                    <div>
                      <p className="mb-0 fw-bold">Email</p>
                      <p className="mb-0">info@soti.com</p>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={12}>
                <Card className="contact-card">
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
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="text-center mb-3">
          <h4>Nuestra Ubicación</h4>
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