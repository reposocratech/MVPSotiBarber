import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { UserIcon } from '../../../components/userIcon/UserIcon';
import './employeeClientProfile.css';

const EmployeeClientProfile = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`http://localhost:4000/employee/clientProfile/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setClient(data);
      } catch (error) {
        console.error("Error al obtener el perfil del cliente:", error);
      }
    };

    fetchClient();
  }, [id]);

  if (!client) return <p className="text-center">Cargando cliente...</p>;

  return (
    <Container>
      <section>
        <Row>
          <Col>
            <h2 className="text-center">Perfil de {client.user_name} {client.lastname}</h2>
            <div className="blue-line"></div>
          </Col>
        </Row>
      </section>

      <section>
        <Row className="mb-5 align-items-stretch">
          <Col>
            <div className="client-profile d-flex gap-4 justify-content-center align-items-center">
              <div className="d-flex align-items-center">
                <div>
                  <UserIcon />
                </div>
                <div>
                  <h3>{client.user_name} {client.lastname}</h3>
                  <span>{client.phone}</span>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="history">
              <h3>Historial</h3>
              <span>Tu historial de servicios</span>
              <Button className="button">Citas</Button>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default EmployeeClientProfile;