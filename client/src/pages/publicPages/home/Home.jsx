import React, { useEffect } from 'react';
import './home.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Element } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';
import soti_barber from "../../../assets/images/soti-barber.webp"
import services from "../../../assets/images/servicios-2.jpg"

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    <>
      {/* SECTION 1 */}
      <section className="section-logo d-flex align-items-center pt-5 padding-y-section">
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
        </Container>,
      </section>
      {/* SECTION 2 */}
      <Container fluid="xxl">
        <section className="section-about pt-5 padding-y-section">
          <Row>
            <Col xs={12} md={6} className="order-2 order-md-1 d-flex flex-column justify-content-center xs align-items-center text-center text-md-start">
              <div className="d-flex flex-column align-items-center align-items-md-start">
                <h2 className="pt-4 pt-md-0">Sobre SOTI</h2>
                <div className="blue-line"></div>
              </div>
              <article>
                <p>
                  En Soti, creemos que cada persona merece un estilo único que
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
                <button onClick={()=>navigate("/contact")} className="btn">Contáctanos</button>
              </article>
            </Col>
            <Col
              xs={12}
              md={6}
              className="d-flex align-items-center justify-content-center order-1 order-md-2"
            >
              <img src={soti_barber} alt="" />
            </Col>
          </Row>
        </section>
      </Container>

      {/* SECTION 3 */}
      <section className="section-services pt-5 padding-y-section">
        <Container fluid="xxl">
          <Row>
            <Col xs={12} md={6} className="order-2 order-md-1 d-flex flex-column justify-content-center align-items-center text-center text-md-start">
              <div className="d-flex flex-column align-items-start align-items-md-start">
                <h3 className="pt-4 pt-md-0">Nuestros Servicios</h3>
                <div className="blue-line"></div>
              </div>
              <article>
                <p>
                  En nuestra barbería nos especializamos en cortes de cabello
                  modernos y clásicos, arreglo de barba y perfilado. Nos
                  enfocamos en ofrecer un servicio personalizado, cuidando cada
                  detalle para que salgas con el look que te representa.
                </p>

                <button onClick={()=>navigate("/services")} className="btn">Ir a servicios</button>
              </article>
            </Col>
            <Col
              xs={12}
              md={6}
              className="d-flex align-items-center justify-content-center order-1 order-md-2"
            >
              <img src={services} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* SECTION 3 */}

      <section className="section-schedule pt-5 mx-2 padding-y-section" id="horarios">
        <Container fluid="fluid">

        <Row className="align-items-start">
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column align-items-center justify-content-center pb-md-5"
            >
            <div className='d-flex flex-column align-items-center justify-content-center mb-3'>
              <h2>Información Importante</h2>
              <div className="blue-line"></div>
            </div>
            <div className="information d-flex flex-column align-items-start justify-content-center">
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
              <p className='m-0'>
                <span className="fw-bold">Días especiales:</span> En fechas
                señaladas como Navidad o Año Nuevo nuestro horario puede variar.
                Consulta nuestra web o redes sociales para información
                actualizada.
              </p>
            </div>
          </Col>

          <Col
            xs={12}
            md={6}
            className="d-flex flex-column justify-content-center horario-col pb-5 mx-0"
            >
            <div className='d-flex flex-column align-items-center justify-content-center mb-3'>
              <h2 className="pt-5 pt-md-0">Nuestro Horario</h2>
              <div className="blue-line"></div>
            </div>
            <div className="information d-flex flex-column align-items-center justify-content-center">
              <p className='text-center mb-0'>
                ¿Tienes alguna pregunta o deseas reservar una cita?
              </p>
              <p className='text-center'>No dudes en
              contactarnos.</p>
              <div className="schedule-table row w-100 text-center">
                <div className="col-6 col-md-6">
                  <p>Lunes: 10:00 - 20:00</p>
                  <p>Martes: 10:00 - 20:00</p>
                  <p>Miércoles: 10:00 - 20:00</p>
                  <p>Jueves: 10:00 - 20:00</p>
                </div>
                <div className="col-6 col-md-6">
                  <p>Viernes: 10:00 - 20:00</p>
                  <p>Sábado: 9:00 - 18:00</p>
                  <p>Domingo: Cerrado</p>
                  <p>Festivos: A consultar</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
            </Container>
      </section>
    </>
  );
};
export default Home;
