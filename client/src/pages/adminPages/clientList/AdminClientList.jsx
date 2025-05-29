import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelpers';
import { Button, Col, Form, FormCheck, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './clientList.css';

const AdminClientList = () => {
  const [clientList, setClientList] = useState([]);
  const { token } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [clientResults, setClientResults] = useState([]);
  const clientsToDisplay = search.length >= 3 ? clientResults : clientList;
  const navigate = useNavigate();

   console.log("searrrchhhhhh", clientResults);
   

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const resClients = await fetchData(
          'admin/clientList',
          'get',
          null,
          token
        );
        console.log('listaClienteeeesss', resClients);

        setClientList(resClients.data.clients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClients();
  }, [token]);

  useEffect(()=>{
    const fetchClients = async () => {
      if(search.length >= 3){
        try {
          const res = await fetchData(`admin/clientListSearch?search=${search}`, "get", null, token)
          
          console.log("respuesta del backend:", res)
          setClientResults(res.data.clients || [])
        } catch (error) {
          console.log("Error al buscar clientes", error)
        }
      } else {
        setClientResults([])
      }
    }

    fetchClients();
  },[search, token])

    const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const enableSwitch = async (id) => {
    const updateClients = clientList.map((e) => {
      if(e.user_id === id){
        return {
          ...e, 
          user_is_enabled: e.user_is_enabled === 1 ? 0 : 1,
        };
      }
      return e;
    });

    setClientList(updateClients);

    const updatedClient = updateClients.find((e)=> e.user_id === id);
    const status = updatedClient.user_is_enabled;

    try {
      await fetchData(
        `admin/enabledClient/${id}`, 'put', {
          user_is_enabled: status,
        }, token
      );
    } catch (error) {
      console.log(error);
            
    }
  };

  const handleViewProfile = (id) => {
    navigate(`/admin/clientProfile/${id}`);
  };

  return (
    <>
      <section className="padding-y-section">
        <div className="d-flex flex-column align-items-center justify-content-center py-4">
          <h2 className="text-center">Clientes</h2>
          <div className="blue-line"></div>
          <div>
             <Form>
                            <Form.Group className="mb-3">
                              <Form.Control
                                id="searchInput"
                                type="text"
                                placeholder="Buscar"
                                value={search}
                                onChange={handleSearch}
                              />
                              
                            </Form.Group>
                          </Form>
          </div>
        </div>
        <Row>
          {clientList.length === 0 ? (
            <p>No hay clientes registrados</p>
          ) : (
            <Col className="d-flex justify-content-center align-items-center">
              <div className="clients-table d-flex flex-column align-items-center justify-content-center">
                <div className="table-scroll-wrapper">
                  <table>
                    <tbody>
          
                      {clientsToDisplay.map((e) => (
                        <tr key={e.user_id}>
                          <td>
                            {e.user_name} {e.lastname}
                          </td>
                          <td>
                            <div className="d-flex">
                              <Button 
                               onClick={()=> handleViewProfile(e.user_id)}
                               >Ver más</Button>
                              <Form>
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </section>
    </>
  );
};

export default AdminClientList;
