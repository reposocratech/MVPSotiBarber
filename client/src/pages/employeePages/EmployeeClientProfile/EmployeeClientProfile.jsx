import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { UserIcon } from '../../../components/userIcon/UserIcon';
import { fetchData } from '../../../helpers/axiosHelpers';
import './employeeClientProfile.css';

const EmployeeClientProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCortes, setTotalCortes] = useState(0);
  const [cortesEsteMes, setCortesEsteMes] = useState(0);
  const [totalGasto, setTotalGasto] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchDataCliente = async () => {
      try {
        const userRes = await fetchData(
          `employee/clientProfile/${id}`,
          'get',
          null,
          localStorage.getItem("token")
        );
        setUser(userRes.data || userRes);

        const res = await fetchData(
          `client/appointments/${id}`,
          'get',
          null,
          localStorage.getItem("token")
        );
        const citas = res.data || res;
        setAppointments(citas);

        setTotalCortes(citas.length);

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

          const totalGasto = citas.reduce((contador, cita) => contador + parseFloat(cita.precio || 0), 0);
          setTotalGasto(totalGasto);


        setCortesEsteMes(cortesMesActual.length);
      } catch (err) {
        console.error("Error cargando citas o cliente:", err);
      }
    };

    fetchDataCliente();
  }, [id]);

  const filteredAppointments = appointments.filter((cita) => {
    const search = searchTerm.toLowerCase();
    return (
      cita.start_date.toLowerCase().includes(search) ||
      cita.tipo_cita.toLowerCase().includes(search) ||
      cita.empleado.toLowerCase().includes(search) ||
      cita.precio.toString().includes(search)
    );
  });

  if (!user || !user.user_name) return <p className="text-center">Cargando cliente...</p>;

  return (
    <Container>
      <section>
        <Row>
          <Col className="pb-4">
            <h2 className="text-center">
              Perfil de {user.user_name} {user.lastname}
            </h2>
            <div className="blue-line"></div>
          </Col>
        </Row>
      </section>

      <section>
        <Row className="mb-5 align-items-stretch">
          <Col md={5}>
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
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4 summary-row">
                <div className="text-center summary-box">
                  <h2>{totalCortes}</h2>
                  <p className="mb-0">Cortes totales</p>
                </div>
                <div className="text-center summary-box">
                  <h2>{cortesEsteMes}</h2>
                  <p className="mb-0">Cortes este mes</p>
                </div>
              </div>

              <div className="text-center mt-4">
                <div className="summary-box">
                  <h2>
                     <h2>{totalGasto.toFixed(2)}€</h2>
                  </h2>
                  <p className="mb-0">Gasto total</p>
                </div>
              </div>
            </div>
          </Col>

          <Col md={7}>
            <div className="history p-4 rounded">
              <h3>Historial</h3>
              <span>Historial de servicios del cliente</span>
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
              <div className="mt-3 bg-dark rounded p-3 table-scroll-wrapper">
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
                    {(searchTerm ? filteredAppointments : appointments).length >
                    0 ? (
                      (searchTerm ? filteredAppointments : appointments).map(
                        (cita, index) => (
                          <tr key={index}>
                            <td>{cita.start_date}</td>
                            <td>{cita.tipo_cita}</td>
                            <td>{cita.empleado}</td>
                            <td>{cita.precio}€</td>
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
  );
};

export default EmployeeClientProfile;