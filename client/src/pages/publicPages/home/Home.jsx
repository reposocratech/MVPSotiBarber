import React, { useEffect } from 'react';
import './home.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Element } from 'react-scroll';
import { useLocation } from 'react-router-dom';

const Home = () => {
  
  const location = useLocation();

 useEffect(() => {
  const hash = location.hash;

  if (hash) {
 
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); 
  }
}, [location]);

  return (
    <div>
          {/* SECTION 1 */}
        <section className="section-logo d-flex align-items-center padding-y-section">
        <Container fluid="xxl">
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
        </Container>
      </section>
      {/* SECTION 2 */}
      <Container fluid="xxl">
        <section className="section-about padding-y-section">
          <Row>
            <Col xs={12} md={6} className='order-2 order-md-1'>
            <div className="d-flex flex-column align-items-start">
              <h2>Sobre SOTI</h2>
              <div className="blue-line ms-3"></div>
            </div>
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
                <Button className="btn-home">Contáctanos</Button>
              </article>
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-center order-1 order-md-2">
              Imagen
            </Col>
          </Row>
        </section>
      </Container>

      {/* SECTION 3 */}
        <section className="section-services padding-y-section">
        <Container fluid="xxl">
          <Row>
            <div className="d-flex flex-column align-items-start">
              <h3>Nuestros Servicios</h3>
              <div className="blue-line ms-3"></div>
            </div>
            <Col xs={12} md={6} className='order-2 order-md-1'>
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
            <Col xs={12} md={6} className="d-flex align-items-center justify-content-center order-1 order-md-2">
              Imagen
            </Col>
          </Row>
      </Container>
        </section>

      {/* SECTION 3 */}

        <section className="section-schedule padding-y-section" id='horarios'>
          <Container fluid="xxl"></Container>
        <Row>
          <Col xs={12} md={6} className="d-flex flex-column align-items-center justify-content-center">
            <h2>Información Importante</h2>
            <div className="blue-line"></div>
            <div className="information">
              <p>
                <span className="fw-bold">Reservas:</span> Te recomendamos
                reservar con antelación para garantizar disponibilidad.
              </p>
              <p>
                <span className="fw-bold">Cancelaciones:</span> Por favor,
                avísanos con al menos 24 horas de antelación si necesitas
                cancelar o reprogramar tu cita.
              </p>
              <p>
                <span className="fw-bold">Puntualidad:</span> Te recomendamos
                llegar 10 minutos antes de tu cita para prepararte
                adecuadamente.
              </p>
              <p>
                <span className="fw-bold">Días especiales:</span> En fechas
                señaladas como Navidad o Año Nuevo nuestro horario puede variar.
                Consulta nuestra web o redes sociales para información
                actualizada.
              </p>
            </div>
          </Col>

          {/* ESTO NO ESTA BIEN ASI */}
          <Col xs={12} md={6} className="d-flex flex-column align-items-center justify-content-center">
    

            <h2>Nuestro Horario</h2>
            <div className="blue-line"></div>
            <div className="information">
            <p>
              ¿Tienes alguna pregunta o deseas reservar una cita? No dudes en
              contactarnos.
            </p>
              <h3 className='text-center'>Horario Semanal</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Lunes</td>
                    <td>10:00 - 20:00</td>
                    <td>Viernes</td>
                    <td>10:00 - 20:00</td>
                  </tr>
                  <tr>
                    <td>Martes</td>
                    <td>10:00 - 20:00</td>
                    <td>Sábado</td>
                    <td>9:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>Miércoles</td>
                    <td>10:00 - 20:00</td>
                    <td>Domingo</td>
                    <td>Cerrado</td>
                  </tr>
                  <tr>
                    <td>Jueves</td>
                    <td>10:00 - 20:00</td>
                    <td>Festivos</td>
                    <td>A consultar</td>
                  </tr>
                </tbody>
              </table>
            </div>
   
          </Col>
        </Row>
      </section>

      
    </div>
  );
};
export default Home;
