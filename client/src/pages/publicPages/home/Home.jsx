import React from 'react';
import './home.css';
import { Button, Col, Container, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <Container fluid="xxl">
        {/* SECTION 1 */}
        <section className="section-logo d-flex align-items-center padding-y-section">
          <Row>
            <Col>
              <article className="text-start">
                <h1>SOTI BARBER STUDIO</h1>
                <p>
                  Una experiencia única de extilo y elegancia para tu cabello
                </p>
              </article>
            </Col>
          </Row>
        </section>
        {/* SECTION 2 */}
        <section className="section-about padding-y-section">
          <Row>
                <div className="d-flex flex-column align-items-start">
                  <h2>Sobre SOTI</h2>
                  <div className="blue-line"></div>
                </div>
            <Col>
              <article>
                <p>
                  En Soti, Creemos que cada persona merece un estilo único que
                  refleje si individualidad. Nuestro equipo de profesionales
                  altamente capacitados está dedicado a brindarte una
                  experiencia de peluquería excepcional en un ambiente elegante
                  y acogedor.
                </p>
                <p>
                  Utilizamos productos de primera calidad y técnicas innovadoras
                  para garantizar resultados perfectos en cada visita. Nos
                  enorgullece ofrecer un servicio personalizado adaptado a las
                  necesidades especificas de tu cabello.
                </p>
                <Button className="btn">Contáctanos</Button>
              </article>
            </Col>
            <Col className="d-flex align-items-center justify-content-center">
              Imagen
            </Col>
          </Row>
        </section>
        {/* SECTION 3 */}
        <section className="section-services padding-y-section">
          <Row>
                <div className="d-flex flex-column align-items-start">
                  <h2>Nuestros Servicios</h2>
                  <div className="blue-line"></div>
                </div>
            <Col>
              <article>
                <p>
                  En nuestra barbería nos especializamos en cortes de cabello
                  modernos y clásicos, arreglo de barba y perfilado. Nos
                  enfocamos en ofrecer un servicio personalizado, cuidando cada
                  detalle para que salgas con el look que te representa.
                </p>

                <Button className="btn">Ir a servicios</Button>
              </article>
            </Col>
            <Col className="d-flex align-items-center justify-content-center">
              Imagen
            </Col>
          </Row>
        </section>
        {/* SECTION 3 */}
        <section className='section-schedule padding-y-section'>
        <Row>
          <Col className='d-flex flex-column align-items-center justify-content-center'>
          <h2>Información Importante</h2>
          <div className='blue-line'></div>
          <div className='information'>
            <p><span className='fw-bold'>Reservas:</span> Te recomendamos reservar con antelación para garantizar disponibilidad.</p>
            <p><span className='fw-bold'>Cancelaciones:</span> Por favor, avísanos con al menos 24 horas de antelación si necesitas cancelar o reprogramar tu cita.</p>
            <p><span className='fw-bold'>Puntualidad:</span> Te recomendamos llegar 10 minutos antes de tu cita para prepararte adecuadamente.</p>
            <p><span className='fw-bold'>Días especiales:</span> En fechas señaladas como Navidad o Año Nuevo nuestro horario puede variar. Consulta nuestra web o redes sociales para información actualizada.</p>
          </div>
          </Col>
          <Col className='d-flex flex-column align-items-center justify-content-center'>
          <h2>Nuestro Horario</h2>
          <div className='blue-line'></div>
          <p>¿Tienes alguna pregunta o deseas reservar una cita? No dudes en contactarnos.</p>
          <div className='information'>
            <h3>Horario Semanal</h3>


          </div>
          </Col>
        </Row>
        </section>
      </Container>
    </div>
  );
};
export default Home;
