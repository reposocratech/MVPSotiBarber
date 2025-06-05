import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userIcon from '../../../assets/icons/userlogo.png';
import './clientlist.css';
import { fetchData } from '../../../helpers/axiosHelpers';
import { AuthContext } from '../../../context/AuthContextProvider';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetchData('employee/clientList', 'get', null, token);

        setClients(res.data);
      } catch (error) {
        console.error('Error al cargar clientes:', error);
      }
    };
    fetchClients();
  }, []);

  const handleViewProfile = (id) => {
    navigate(`/employee/clientProfile/${id}`);
  };

  const filteredClients = clients.filter((client) =>
    `${client.user_name} ${client.lastname}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="padding y section">
      <Container fluid="xxl">
        <div className="d-flex flex-column align-items-center justify-content-center py-4">
          <h3>Clientes</h3>
          <div className="blue-line"></div>
        </div>
        <Row>
          {clients.length !== 0 ? (
            <Col>
              <div className="table-clients">
                <div className="search-bar-wrapper mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Buscar"
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="table-scroll-wrapper">
                  <table>
                    <tbody>
                      {filteredClients.map((client) => (
                        <tr key={client.user_id}>
                          <td>
                            {client.user_name} {client.lastname}
                          </td>
                          <td>
                            <img
                              onClick={() => handleViewProfile(client.user_id)}
                              src={userIcon}
                              alt="Ver perfil"
                              className="btn-icon"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
          ) : (
            <Col className="text-center">
              <p>No hay clientes registrados.</p>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default ClientList;
