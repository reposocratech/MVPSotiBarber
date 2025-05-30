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
  const [cortesEsteMes, setCortesEsteMes] = useState(0);


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

        const citas = res.data || res;
        setAppointments(citas);

        // Cortes totales
        setTotalCortes(citas.length);

        // Cortes de este mes
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const cortesMesActual = citas.filter((cita) => {
          const citaDate = new Date(cita.start_date);
          return (
            citaDate.getMonth() === currentMonth &&
            citaDate.getFullYear() === currentYear
          );
        });

        setCortesEsteMes(cortesMesActual.length);
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
      cita.tipo_cita.toLowerCase().includes(search) ||
      cita.empleado.toLowerCase().includes(search) ||
      cita.precio.toString().includes(search)
    );
  });

  if (!user) return null;

  return (
    <>
      {mostrarModal && (
        <div>
          <CompleteRegister onCompletar={handleCompletado} />
        </div>
      )}

      <Container>
        <section>
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

                <div className="contadores d-flex justify-content-between mt-4 summary-row">
                  <div className="text-center summary-box">
                    <h2>{totalCortes}</h2>
                    <p className="mb-0">Cortes totales</p>
                  </div>
                  <div className="text-center summary-box">
                    <h2>{cortesEsteMes}</h2>
                    <p className="mb-0">Cortes este mes</p>
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

                {totalCortes !== 0 && totalCortes % 10 === 0 && (
                  <div className="text-center mt-3">
                    <p className="fw-bold">
                      ¡Felicidades! Has acumulado {totalCortes} cortes y tienes
                      un corte de pelo GRATIS.
                    </p>
                  </div>
                )}
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

                <div className="mt-3  rounded p-3 table-scroll-wrapper">
                  <table className="tabla-citas text-white mb-0">
                    <colgroup>
                      <col className="col-fecha" />
                      <col className="col-tipo" />
                      <col className="col-empleado" />
                      <col className="col-precio" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Tipo de cita</th>
                        <th>Empleado</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(searchTerm ? filteredAppointments : appointments)
                        .length > 0 ? (
                        (searchTerm ? filteredAppointments : appointments).map(
                          (cita, index) => (
                            <tr key={index}>
                              <td data-label="Fecha:">{cita.start_date}</td>
                              <td data-label="Cita:">{cita.tipo_cita}</td>
                              <td data-label="Empleado:">{cita.empleado}</td>
                              <td data-label="Precio:">{cita.precio}€</td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td colSpan="4" className="fw-bold">
                            Este cliente no ha tenido ningún servicio todavía
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
