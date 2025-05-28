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

  const perfilIncompleto = !user.user_name || !user.lastname || !user.phone || !user.birth_date;

  useEffect(()=>{
    if(perfilIncompleto) {
      setMostrarModal(perfilIncompleto);
    }
  },[perfilIncompleto]);

  const handleCompletado = () => {
    setMostrarModal(false);
  }

  console.log('+++++++++', user);

  return (
    <>
      {mostrarModal && <div>
        <CompleteRegister onCompletar={handleCompletado}/>
      </div>}

      <Container>
      <section>
        <Row>
          <Col>
            <h2 className="text-center">Perfil de {user.user_name} {user.lastname}</h2>
            <div className="blue-line"></div>
          </Col>
        </Row>
      </section>

      <section>
        <Row className="mb-5 align-items-stretch">
          <Col md={6}>
            <div className="client-profile p-4 rounded">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <UserIcon />
                  <div>
                    <h3>{user.user_name} {user.lastname}</h3>
                    <span>{user.phone}</span>
                  </div>
                </div>
                <Button className="button">Editar</Button>
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

          <Col md={6}>
            <div className="history p-4 rounded">
              <h3>Historial</h3>
              <span>Tu historial de servicios</span>
              <Button className="button mt-3 mb-3">Citas</Button>
              <div className="mt-3 bg-dark rounded p-3">
                <table borderless size="sm" className="text-white mb-0">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Tipo de cita</th>
                      <th>Empleado</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>15/04/2025</td>
                      <td>Ceja</td>
                      <td>José García</td>
                      <td>2,00€</td>
                    </tr>
                    <tr>
                      <td>15/04/2025</td>
                      <td>Recorte de la barba</td>
                      <td>María Pérez</td>
                      <td>5,00€</td>
                    </tr>
                    <tr>
                      <td>15/04/2025</td>
                      <td>Corte caballero</td>
                      <td>Cristian Sánchez</td>
                      <td>16,15€</td>
                    </tr>
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
