import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelpers';
import { Button, Col, Container, Form, FormCheck, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import eye from '../../../assets/icons/eye.png';

import './clientList.css';

const AdminClientList = () => {
  const [clientList, setClientList] = useState([]);
  const { token } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [clientResults, setClientResults] = useState([]);
  const clientsToDisplay = search.length >= 3 ? clientResults : clientList;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const resClients = await fetchData(
          'admin/clientList',
          'get',
          null,
          token
        );

        setClientList(resClients.data.clients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
  }, [token]);

  useEffect(() => {
    const fetchClients = async () => {
      if (search.length >= 3) {
        try {
          const res = await fetchData(
            `admin/clientListSearch?search=${search}`,
            'get',
            null,
            token
          );

          setClientResults(res.data.clients || []);
        } catch (error) {
          console.log('Error al buscar clientes', error);
        }
      } else {
        setClientResults([]);
      }
    };

    fetchClients();
  }, [search, token]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const enableSwitch = async (id) => {
    const isSearching = search.length >= 3;

    const updateList = (list) =>
      list.map((e) =>
        e.user_id === id
          ? { ...e, user_is_enabled: e.user_is_enabled === 1 ? 0 : 1 }
          : e
      );

    const updatedList = isSearching
      ? updateList(clientResults)
      : updateList(clientList);

    if (isSearching) {
      setClientResults(updatedList);
    } else {
      setClientList(updatedList);
    }

    const updatedClient = updatedList.find((e) => e.user_id === id);
    const status = updatedClient.user_is_enabled;

    try {
      await fetchData(
        `admin/enabledClient/${id}`,
        'put',
        {
          user_is_enabled: status,
        },
        token
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewProfile = (id) => {
    navigate(`/admin/clientProfile/${id}`);
  };

  return (
    <section className="padding-y-section">
      <Container fluid="xxl">
        <div className="d-flex flex-column align-items-center justify-content-center py-4">
          <h3 className="text-center">Clientes</h3>
          <div className="blue-line"></div>
        </div>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <div className="clients-table d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center align-items-center">
                <div className="search">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control
                        id="searchInput"
                        className="search-input"
                        type="text"
                        placeholder="Buscar"
                        value={search}
                        onChange={handleSearch}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </div>
              <div className="table-scroll-wrapper">
                <table>
                  <tbody>
                    {clientsToDisplay.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="text-center py-3">
                          {search.length >= 3
                            ? 'No se encontraron resultados.'
                            : 'No hay clientes registrados.'}
                        </td>
                      </tr>
                    ) : (
                      clientsToDisplay.map((e) => (
                        <tr className="tr" key={e.user_id}>
                          <td className="px-4">
                            {e.user_name} {e.lastname}
                          </td>
                          <td>
                            <div className="d-flex">
                              <img
                                src={eye}
                                onClick={() => handleViewProfile(e.user_id)}
                                alt="ver perfil"
                              />
                              <Form className="d-flex justify-content-center align-items-center">
                                <Form.Check
                                  className="enabled"
                                  type="switch"
                                  id="custom-switch"
                                  checked={e.user_is_enabled === 0}
                                  onChange={() => enableSwitch(e.user_id)}
                                />
                              </Form>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminClientList;
