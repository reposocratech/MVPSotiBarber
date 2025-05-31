import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { fetchData } from '../../helpers/axiosHelpers';
import { AuthContext } from '../../context/AuthContextProvider';
import './modalcita.css';

const ModalCita = ({ setShowModal, showModal, event, closeModal }) => {
  const [valErrors, setValErrors] = useState({});
  const [appointmentData, setAppointmentData] = useState();
  const [editData, setEditData] = useState({});
  const { token, services } = useContext(AuthContext);
  const [enabledServices, setEnabledServices] = useState(services);
  const [employeeList, setEmployeeList] = useState([]);


  useEffect(() => {
    const filtered = services.filter(
      (service) => service.service_is_enabled === 0
    );
    setEnabledServices(filtered);
  }, [services]);

  useEffect(() => {
    const getOneAppointment = async () => {
      try {
        let result = await fetchData(
          `admin/getOneAppointment/${event.id}`,
          'get',
          null,
          token
        );
        const data = result.data.result[0];
        setAppointmentData(data);
        setEditData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getOneAppointment();
  }, [event]);

  

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

        let enabledEmployees = allEmployees.filter(
          (emp) => emp.user_is_enabled === 0
        );

        setEmployeeList(enabledEmployees);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      await fetchData('admin/editAppointment', 'put', editData, token);
      closeModal();
    } catch (error) {

      console.log(error);
    }
  };

  const cancelAppointment = async ()=>{

    try {
      await fetchData('admin/cancelAppointment', 'put', editData, token);
      /* onUpdate(); */
      closeModal();
    } catch (error) {

      console.log(error);
    }
  }

  return (
    <section>
      {event && (
        <Modal
          show={showModal}
          onHide={closeModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Cita para: {event?.title?.split('(')[0] || 'Sin título'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="form-create-appoinment">
              <h2 className="text-center">Editar cita</h2>
              <div className="blue-line"></div>
              <div className="separate">
                <Form.Group className="mb-3 hour">
                  <Form.Label htmlFor="StartHourTextInput">
                    Hora de inicio
                  </Form.Label>
                  <Form.Control
                    id="StartHourTextInput"
                    name="start_hour"
                    value={editData?.start_hour}
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
                    value={editData?.end_hour}
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
                  value={editData.client_name || ''}
                  onChange={handleChange}
                />
                {valErrors.client_name && <p>{valErrors.client_name}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="ClientLastnameTextInput">
                  Apellidos del cliente
                </Form.Label>
                <Form.Control
                  id="ClientLastnameTextImput"
                  value={editData.client_lastname || ''}
                  onChange={handleChange}
                />
                {valErrors.client_lastname && (
                  <p>{valErrors.client_lastname}</p>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="EmpleadoTextInput">Empleado</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="EmpleadoTextInput"
                  className="inputDesc"
                  name="employee_user_id"
                  // value={editData.employee_id || ''}
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
                <Form.Label htmlFor="ServicioTextInput">Servicio</Form.Label>
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
                  value={editData.client_phone || ''}
                  onChange={handleChange}
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
                  name="observation"
                  value={editData.observation || ''}
                  onChange={handleChange}
                  as="textarea"
                />
                {valErrors.observation && <p>{valErrors.observation}</p>}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-between w-100">
              <Button onClick={cancelAppointment} className='red-btn'>Cancelar cita</Button>
              <div>
                <Button className="ms-auto me-2" onClick={onSubmit}>Guardar</Button>
                <Button onClick={closeModal}>Cancelar</Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </section>
  );
};

export default ModalCita;
