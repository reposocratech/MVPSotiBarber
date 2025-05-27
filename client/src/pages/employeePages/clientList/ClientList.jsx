import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./clientlist.css";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("http://localhost:4000/employee/clientList", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setClients(data);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      }
    };
    fetchClients();
  }, []);


 const handleViewProfile = (id) => {
  navigate(`/employee/clientProfile/${id}`);
};



  const filteredClients = clients.filter(client =>
    `${client.user_name} ${client.lastname}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
  <div className="d-flex flex-column align-items-center justify-content-center py-4">
    <h3>Clientes</h3>
    <div className="blue-line"></div>
  </div>

  <Row>
    {clients.length !== 0 ? (
      <Col className="d-flex justify-content-center align-items-center">
        <div className="table-clients d-flex flex-column align-items-center justify-content-center">
          <div className="search-bar-wrapper mb-4 w-100 d-flex justify-content-center">
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
                    <td>{client.user_name} {client.lastname}</td>
                    <td>
                      <Button className="btn" onClick={() => handleViewProfile(client.user_id)}>Ver más</Button>
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
</section>
  );
};

export default ClientList;