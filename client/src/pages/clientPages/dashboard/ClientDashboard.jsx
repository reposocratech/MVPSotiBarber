import CompleteRegister from '../../../components/completeRegister/CompleteRegister';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UserIcon } from '../../../components/userIcon/UserIcon';
import './clientDashboard.css';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false)
  const [appointments, setAppointments] = useState([]);

  const perfilIncompleto = !user.user_name || !user.lastname || !user.phone || !user.birth_date;

  useEffect(()=>{
    if(perfilIncompleto) {
      setMostrarModal(perfilIncompleto);
    }
  },[perfilIncompleto]);

  const handleCompletado = () => {
    setMostrarModal(false);
  }

  useEffect(() => {
  if (!user?.user_id) return;

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`http://localhost:4000/client/appointments/${user.user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Error al obtener las citas");

      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Error cargando citas:", err);
    }
  };

  fetchAppointments();
}, [user?.user_id]);

  console.log('+++++++++', user);

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
            <Col>
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
                  <Button
                    className="button"
                    onClick={() => navigate('/client/editClient')}
                  >
                    Editar
                  </Button>
                </div>

                <div className="d-flex justify-content-between mt-4  summary-row">
                  <div className="text-center summary-box">
                    <h2>5</h2>
                    <p className="mb-0">Cortes totales</p>
                  </div>
                  <div className="text-center summary-box">
                    <h2>1</h2>
                    <p className="mb-0">Cortes este mes</p>
                  </div>
                </div>
              </div>
            </Col>

            <Col md={7}>
              <div className="history p-4 rounded">
                <h3>Historial</h3>
                <span>Tu historial de servicios</span>
                <div className="citas-box mb-3 mt-3 text-center">
                  <p className="mb-0">Citas</p>
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
                      {appointments.map((cita, index) => (
                        <tr key={index}>
                          <td>{cita.start_date}</td>
                          <td>{cita.tipo_cita}</td>
                          <td>{cita.empleado}</td>
                          <td>{cita.precio}€</td>
                        </tr>
                      ))}
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
