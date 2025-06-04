import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Col, Container, Row } from 'react-bootstrap';
import { UserIcon } from '../../../components/userIcon/UserIcon';
import { fetchData } from '../../../helpers/axiosHelpers';
import './employeeClientProfile.css';

const EmployeeClientProfile = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCortes, setTotalCortes] = useState(0);
  const [serviciosTotales, setServiciosTotales] = useState(0);
  const [totalGasto, setTotalGasto] = useState(0);
  const [canceladas, setCanceladas] = useState(0);
  const [noPresentadas, setNoPresentadas] = useState(0);

  useEffect(() => {
  if (!id) return;

  const fetchDataCliente = async () => {
    try {
      const userRes = await fetchData(
        `employee/clientProfile/${id}`,
        'get',
        null,
        token
      );
      setUser(userRes.data || userRes);

      const res = await fetchData(
        `client/appointments/${id}`,
        'get',
        null,
        token
      );

      const resCortes = await fetchData(
        `client/cortes-count/${id}`,
        'get',
        null,
        token
      );

      const citasSimples = res.data || res;

      const citas = citasSimples.map((cita) => {
        const isCancelada = cita.status === 2;
        const isNoPresentada = cita.status === 3;

        return {
          ...cita,
          tipoVisible: isCancelada
            ? 'Cancelada'
            : isNoPresentada
            ? 'No presentado'
            : cita.tipo_cita,
          precio: isCancelada || isNoPresentada ? 0 : parseFloat(cita.precio) || 0
        };
      });

      setAppointments(citas);

      
      const citasValidas = citas.filter(cita => cita.status !== 2 && cita.status !== 3);
      setServiciosTotales(citasValidas.length);

      
      const gasto = citas.reduce((acc, cita) => {
        if (cita.status === 2) return acc; 
        if (cita.status === 3) return acc - cita.precio; 
        return acc + cita.precio;
      }, 0);
      setTotalGasto(gasto);

      const { totalCortes = 0 } = resCortes.data || resCortes;
      setTotalCortes(totalCortes);

      setCanceladas(citas.filter(cita => cita.status === 2).length);
      setNoPresentadas(citas.filter(cita => cita.status === 3).length);
    } catch (err) {
      console.error("Error cargando citas o cliente:", err);
    }
  };

  fetchDataCliente();
}, [id]);

  const filteredAppointments = appointments.filter((cita) => {
    const search = searchTerm.toLowerCase();
    const tipoMostrado =
      cita.status === 2
        ? 'Cancelada'
        : cita.status === 3
        ? 'No presentado'
        : cita.tipo_cita;

    return (
      cita.start_date.toLowerCase().includes(search) ||
      tipoMostrado.toLowerCase().includes(search) ||
      cita.empleado.toLowerCase().includes(search) ||
      cita.precio.toString().includes(search)
    );
  });

  if (!user || !user.user_name) return <p className="text-center">Cargando cliente...</p>;

  return (
    <Container>
      <section className="padding-y-section">
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
                </div>
              </div>

              <div className="contadores d-flex justify-content-between mt-4 summary-row">
                <div className="text-center summary-box">
                  <h2>{totalCortes}</h2>
                  <p className="mb-0">Cortes totales</p>
                </div>
                <div className="text-center summary-box">
                  <h2>{serviciosTotales}</h2>
                  <p className="mb-0">Servicios totales</p>
                </div>
              </div>

              <div className="gasto-total-wrapper mt-4">
                <div className="text-center summary-box">
                  <h2>{totalGasto.toFixed(2)}€</h2>
                  <p className="mb-0">Gasto total</p>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4 summary-row">
                <div className="text-center summary-box">
                  <h2>{canceladas}</h2>
                  <p className="mb-0">Citas canceladas</p>
                </div>
                <div className="text-center summary-box">
                  <h2>{noPresentadas}</h2>
                  <p className="mb-0">Citas no presentadas</p>
                </div>
              </div>
            </div>
          </Col>

          <Col md={7} className="col-history">
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

              <div className="mt-3 rounded p-3 table-scroll-wrapper">
                <table className="tabla-citas text-white mb-0">
                  <colgroup>
                    <col className="col-fecha" />
                    <col className="col-tipo" />
                    <col className="col-empleado" />
                    <col className="col-precio" />
                  </colgroup>
                  <tbody>
                    {(searchTerm ? filteredAppointments : appointments).length > 0 ? (
                      (searchTerm ? filteredAppointments : appointments).map((cita, index) => (
                        <tr key={index}>
                          <td data-label="Fecha:">{cita.start_date}</td>
                          <td data-label="Cita:">
                            {cita.status === 2
                              ? 'cancelada'
                              : cita.status === 3
                              ? 'no presentado'
                              : cita.tipo_cita}
                          </td>
                          <td data-label="Empleado:">{cita.empleado}</td>
                          <td data-label="Precio:">{parseFloat(cita.precio).toFixed(2)}€</td>
                        </tr>
                      ))
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
  );
};

export default EmployeeClientProfile;
