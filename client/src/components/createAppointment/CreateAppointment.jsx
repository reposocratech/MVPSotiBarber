import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './createappointment.css';
import { fetchData } from '../../helpers/axiosHelpers';
import { AuthContext } from '../../context/AuthContextProvider';

const initialValue = {
  start_date: '',
  end_date: '',
  start_hour: '',
  end_hour: '',
  client_id: '',
  employee_id: '',
  service_id: '',
  created_by_user_id: '',
  observations: '',
};

const CreateAppointment = ({
  events,
  setEvents,
  appointmentDate,
  show,
  handleClose,
  setEmployeeList,
  employeeList,
}) => {
  const [appointmentData, setAppointmentData] = useState(initialValue);
  /*   const [employeeList, setEmployeeList] = useState([]) */
  const [errorMsg, setErrorMsg] = useState('');
  const [valErrors, setValErrors] = useState({});
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { token, services, user } = useContext(AuthContext);
  const [clientResults, setClientResults] = useState([]);
  const [enabledServices, setEnabledServices] = useState(services);

  useEffect(() => {
      const filtered = services.filter(
        (service) => service.service_is_enabled === 0
      );
      setEnabledServices(filtered);
    }, [services]);

  useEffect(() => {
    if (appointmentDate.start && appointmentDate.end) {
      const startDate = new Date(appointmentDate.start)
        .toISOString()
        .split('T')[0];
      const endDate = new Date(appointmentDate.end).toISOString().split('T')[0];

      const startHours = String(
        new Date(appointmentDate.start).getHours()
      ).padStart(2, '0');
      const startMinutes = String(
        new Date(appointmentDate.start).getMinutes()
      ).padStart(2, '0');
      const startTime = `${startHours}:${startMinutes}:00`;

      const endHours = String(
        new Date(appointmentDate.end).getHours()
      ).padStart(2, '0');
      const endMinutes = String(
        new Date(appointmentDate.end).getMinutes()
      ).padStart(2, '0');
      const endTime = `${endHours}:${endMinutes}:00`;

      setAppointmentData({
        ...appointmentData,
        start_hour: startTime,
        end_hour: endTime,
        start_date: startDate,
        end_date: endDate,
      });
    }
  }, [appointmentDate]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const resEmployees = await fetchData(
          'admin/employeeList',
          'get',
          null,
          token
        );

        let allEmployees = resEmployees.data.employees;

        let enabledEmployees = allEmployees.filter((emp) => emp.user_is_enabled === 0);

        setEmployeeList(enabledEmployees);

        console.log('empleatesssss', employeeList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, [token]);

  useEffect(() => {
    const fetchClients = async () => {
      if (search.length >= 3) {
        try {
          const res = await fetchData(
            `admin/clientListAppointment?search=${search}`,
            'get',
            null,
            token
          );

          setClientResults(res.data.clients || []);
          setAppointmentData({
            ...appointmentData,
            client_id: res.data.clients[0].user_id,
            created_by_user_id: user.user_id,
          });
        } catch (error) {
          console.log('Error al buscar clientes', error);
        }
      } else {
        setClientResults([]);
      }
    };

    fetchClients();
  }, [search, token]);

  console.log('dataaa', appointmentData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      await fetchData(
        'admin/createAppointment',
        'post',
        appointmentData,
        token
      );

      const result = await fetchData(
        'admin/getAllAppointments',
        'get',
        null,
        token
      );
      const appointments = result.data.result;

      const formattedEvents = appointments.map((e) => ({
        id: e.appointment_id,
        start: new Date(`${e.start_date}T${e.start_hour}`),
        end: new Date(`${e.end_date}T${e.end_hour}`),
        title: `${e.client_name} ${e.client_lastname} (${e.employee_name})`,
        description: e.observation,
        resource: {
          created_by: `${e.created_by_name} ${e.created_by_lastname}`,
        },
      }));

      setEvents(formattedEvents);

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onCancel = async () => {
    setAppointmentData(initialValue);
    handleClose();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClientSelect = (client) => {
    setAppointmentData({
      ...appointmentData,
      client_name: client.user_name,
      client_lastname: client.lastname,
      phone: client.phone || '',
    });
    setSearch(`${client.user_name} ${client.lastname}`);
    setClientResults([]);
  };

  return (
    <section className="register">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="engloba">
              <Col md={12} lg={6} className="cols">
                <Form>
                  <Form.Group className="mb-5">
                    <Form.Label htmlFor="searchInput">
                      Buscar cliente:
                    </Form.Label>
                    <Form.Control
                      id="searchInput"
                      type="text"
                      placeholder="Buscar"
                      value={search}
                      onChange={handleSearch}
                    />
                    {clientResults.length > 0 && (
                      <div className="dropdown-client-list">
                        {clientResults.map((client) => (
                          <div
                            key={client.user_id}
                            className="dropdown-item"
                            onClick={() => handleClientSelect(client)}
                          >
                            {client.user_name} {client.lastname}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.Group>
                </Form>

                <Form className="form-create-appoinment">
                  <h2 className="text-center">Añadir cita</h2>
                  <div className="blue-line"></div>
                  <div className="separate">
                    <Form.Group className="mb-3 hour">
                      <Form.Label htmlFor="StartHourTextInput">
                        Hora de inicio
                      </Form.Label>
                      <Form.Control
                        id="StartHourTextInput"
                        name="start_hour"
                        value={appointmentData?.start_hour}
                        onChange={handleChange}
                        type="time"
                      />
                      {valErrors.hour && <p>{valErrors.hour}</p>}
                    </Form.Group>
                    <Form.Group className="mb-3 hour">
                      <Form.Label htmlFor="EndHourTextInput">
                        Hora de fin
                      </Form.Label>
                      <Form.Control
                        id="EndHourTextInput"
                        name="end_hour"
                        value={appointmentData?.end_hour}
                        onChange={handleChange}
                        type="time"
                      />
                      {valErrors.hour && <p>{valErrors.hour}</p>}
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="ClientNameTextInput">
                      Nombre del cliente
                    </Form.Label>
                    <Form.Control
                      id="ClientNameTextImput"
                      value={appointmentData.client_name || ''}
                    />
                    {valErrors.client_name && <p>{valErrors.client_name}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="ClientLastnameTextInput">
                      Apellidos del cliente
                    </Form.Label>
                    <Form.Control
                      id="ClientLastnameTextImput"
                      value={appointmentData.client_lastname || ''}
                    />
                    {valErrors.client_lastname && (
                      <p>{valErrors.client_lastname}</p>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="EmpleadoTextInput">
                      Empleado
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      id="EmpleadoTextInput"
                      className="inputDesc"
                      name="employee_id"
                      onChange={handleChange}
                    >
                      <option>Selecciona un empleado</option>
                      {employeeList.map((emp) => (
                        <option key={emp.user_id} value={emp.user_id}>
                          {emp.user_name} {emp.lastname}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="ServicioTextInput">
                      Servicio
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      id="ServicioTextInput"
                      className="inputDesc"
                      name="service_id"
                      onChange={handleChange}
                    >
                      <option>Selecciona un servicio</option>
                      {enabledServices.map((serv) => (
                        <option key={serv.service_id} value={serv.service_id}>
                          {serv.service_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="PhoneTextInput">Teléfono</Form.Label>
                    <Form.Control
                      id="PhoneTextImput"
                      value={appointmentData.phone || ''}
                    />
                    {valErrors.phone && <p>{valErrors.phone}</p>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="ObservationsTextInput">
                      Observaciones
                    </Form.Label>
                    <Form.Control
                      className="inputDesc"
                      id="ObservationsTextImput"
                      name="observations"
                      value={appointmentData.observations || ''}
                      onChange={handleChange}
                      as="textarea"
                    />
                    {valErrors.observations && <p>{valErrors.observations}</p>}
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <p>{errorMsg}</p>
          <Button className="boton" onClick={onCancel}>
            Cancelar
          </Button>
          <Button className="boton" onClick={onSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default CreateAppointment;
