import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UserIcon } from '../../../components/userIcon/UserIcon';
import CompleteRegister from '../../../components/completeRegister/CompleteRegister';
import { fetchData } from '../../../helpers/axiosHelpers';
import './clientDashboard.css';

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCortes, setTotalCortes] = useState(0);
  const [serviciosTotales, setServiciosTotales] = useState(0);
  const [isBirthday, setIsBirthday] = useState(false);


  const perfilIncompleto =
    !user?.user_name || !user?.lastname || !user?.phone || !user?.birth_date;

  useEffect(() => {
    if (perfilIncompleto) {
      setMostrarModal(true);
    }
  }, [perfilIncompleto]);

  const handleCompletado = () => {
    setMostrarModal(false);
  };

  useEffect(() => {
  if (!user?.user_id) return;

  const fetchAppointments = async () => {
    try {
      const res = await fetchData(
        `client/appointments/${user.user_id}`,
        'get',
        null,
        token
      );

      const resCortes = await fetchData(
        `client/cortes-count/${user.user_id}`,
        'get',
        null,
        token
      );

      const { totalCortes = 0 } = resCortes.data || resCortes;
      setTotalCortes(totalCortes);

      const citas = res.data || res;

      // Mapeo para asignar tipoVisible según status
      const citasMapeadas = citas.map((cita) => ({
        ...cita,
        tipoVisible:
          cita.status === 2
            ? 'Cancelada'
            : cita.status === 3
            ? 'No presentado'
            : cita.tipo_cita,
      }));

      setAppointments(citasMapeadas);

      const citasValidas = citas.filter(
        (cita) => cita.status !== 2 && cita.status !== 3
      );
      setServiciosTotales(citasValidas.length);

      if (user?.birth_date) {
        const today = new Date();
        const birthDate = new Date(user.birth_date);
        const cumple =
          birthDate.getDate() === today.getDate() &&
          birthDate.getMonth() === today.getMonth();
        setIsBirthday(cumple);
      }

    } catch (err) {
      console.error("Error cargando citas:", err);
    }
  };

  fetchAppointments();
}, [user?.user_id]);

// Lógica del buscador
const filteredAppointments = appointments.filter((cita) => {
  const search = searchTerm.toLowerCase();
  return (
    cita.start_date.toLowerCase().includes(search) ||
    cita.tipoVisible.toLowerCase().includes(search) || 
    cita.empleado.toLowerCase().includes(search) ||
    cita.precio.toString().includes(search)
  );
});

const cortesRestantes = 10 - (totalCortes % 10);
const tieneCorteGratis = totalCortes !== 0 && totalCortes % 10 === 0;





  if (!user) return null;

  return (
    <>
      {mostrarModal && (
        <div>
          <CompleteRegister onCompletar={handleCompletado} />
        </div>
      )}

      <Container>
        <section className="titulo-wrapper mt-5">
          <Row>
            <Col className="pb-4">
              <h2 className="titulomvl text-center">
                Perfil de {user.user_name} {user.lastname}
              </h2>
              <div className="blue-line"></div>
            </Col>
          </Row>
        </section>

        <section>
          <Row className="tablet-row mb-5 align-items-stretch justify-content-center">
            <Col md={5} className="col-profile">
              <div className="client-profile p-4 rounded">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <UserIcon />
                    <div>
                      <h3>
                        {user.user_name} {user.lastname}
                      </h3>
                      <span>{user.phone}</span>
                    </div>
                    <Button
                      className="button d-none d-lg-inline-block"
                      onClick={() => navigate('/client/editClient')}
                    >
                      Editar
                    </Button>
                  </div>
                </div>

                <div className="contadores d-flex justify-content-between mt-3 summary-row">
                  <div className="text-center summary-box">
                    <h2>{totalCortes}</h2>
                    <p className="mb-0">Cortes totales</p>
                  </div>
                  <div className="text-center summary-box">
                    <h2>{serviciosTotales}</h2>
                    <p className="mb-0">Servicios totales</p>
                  </div>
                </div>

                <div className="btnmovil d-block d-lg-none text-center mt-3">
                  <Button
                    className="button"
                    onClick={() => navigate('/client/editClient')}
                  >
                    Editar
                  </Button>
                </div>

                <div className="text-center mt-3">
                  {tieneCorteGratis ? (
                    <p className="fw-bold">
                      ¡Felicidades! Has acumulado {totalCortes} cortes y tienes
                      un corte de pelo GRATIS.
                    </p>
                  ) : (
                    <p className="fw-bold">
                      Te faltan {cortesRestantes} cortes de pelo para conseguir
                      uno gratis.
                    </p>
                  )}
                  {isBirthday && (
                    <div className="fw-bold">
                       ¡Felicidades por tu cumpleaños! Hoy tienes un
                      corte gratis.
                    </div>
                  )}
                </div>
              </div>
            </Col>

            <Col md={7} className="col-history">
              <div className="history p-4 rounded">
                <h3>Historial</h3>
                <span>Tu historial de servicios</span>
                <div className="citas-box mb-3 mt-3 text-center">
                  <div className="search-bar-wrapper mb-3">
                    <input
                      type="text"
                      className="search-appointment-input"
                      placeholder="Buscar por fecha, tipo, empleado o precio"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="tabla-head mb-2 d-flex justify-content-between px-4">
                  <div className="col-fecha fw-semibold text-white text-center">
                    Fecha
                  </div>
                  <div className="col-tipo fw-semibold text-white text-center">
                    Tipo de cita
                  </div>
                  <div className="col-empleado fw-semibold text-white text-center">
                    Empleado
                  </div>
                  <div className="col-precio fw-semibold text-white text-center">
                    Precio
                  </div>
                </div>

                <div className="mt-3  rounded p-3 table-scroll-wrapper">
                  <table className="tabla-citas text-white mb-0">
                    <colgroup>
                      <col className="col-fecha" />
                      <col className="col-tipo" />
                      <col className="col-empleado" />
                      <col className="col-precio" />
                    </colgroup>
                    <tbody>
                      {(searchTerm ? filteredAppointments : appointments)
                        .length > 0 ? (
                        (searchTerm ? filteredAppointments : appointments).map(
                          (cita, index) => (
                            <tr key={index}>
                              <td data-label="Fecha:">{cita.start_date}</td>
                              <td data-label="Cita:">{cita.tipoVisible}</td>
                              <td data-label="Empleado:">{cita.empleado}</td>
                              <td data-label="Precio:">{cita.precio}€</td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td colSpan="4" className="fw-bold">
                            {searchTerm
                              ? 'No se han encontrado resultados para tu búsqueda'
                              : 'Este cliente no ha tenido ningún servicio todavía'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
};

export default ClientDashboard;
