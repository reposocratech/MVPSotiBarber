import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./clientlist.css";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredClients = clients.filter(client =>
    `${client.user_name} ${client.lastname}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="padding-y-section">
      <div className="d-flex flex-column align-items-center justify-content-center py-4">
        <h3>Clientes</h3>
        <div className="blue-line"></div>
      </div>

        <Row>
          <Col xs={12}>
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
              <div className="table-scroll-wrapper w-100">
                <table className="w-100">
                  <thead></thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.user_id}>
                        <td className="client-name">{client.user_name} {client.lastname}</td>
                        <td className="text-end">
                          <Button className="view-button">Ver más</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </Col>
        </Row>
      
    </section>
  );
};

export default ClientList;