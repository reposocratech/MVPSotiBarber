import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { fetchData } from '../../helpers/axiosHelpers';
import { AuthContext } from '../../context/AuthContextProvider';
import './modalcita.css';
import { editAppointmentSchema } from '../../schemas/editAppointmentSchema';
import { ZodError } from 'zod';

const ModalCita = ({ setShowModal, showModal, event, closeModal, onUpdate }) => {
  const [appointmentData, setAppointmentData] = useState();
  const [editData, setEditData] = useState({});
  const { token, services } = useContext(AuthContext);
  const [enabledServices, setEnabledServices] = useState(services);
  const [employeeList, setEmployeeList] = useState([]);
  const [valErrors, setValErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');


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
          `admin/getOneAppointment/${event?.id}`,
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

        editAppointmentSchema.parse(editData);

        await fetchData('admin/editAppointment', 'put', editData, token);
        onUpdate(); //NO ACTUALIZA NADA MAS GUARDARR!!!!!
        setErrorMsg("");
        setValErrors("");
        closeModal();
      } catch (error) {
        if(error instanceof ZodError){
          let objTemp = {};
          error.errors.forEach((er)=>{
            objTemp[er.path[0]] = er.message;
          });
          setValErrors(objTemp);
        }else if (error.response){
          setErrorMsg(error.response.data.message);
        }else{
          setErrorMsg("error");
        }
        console.log(error);
      }

    }

    const cancelAppointment = async ()=>{

    try {
      await fetchData('admin/cancelAppointment', 'put', editData, token);
      onUpdate();
      setErrorMsg("");
      setValErrors("");
      closeModal();
    } catch (error) {

      console.log(error);
    }
  }

  console.log("ediiiit", editData)
  return (
    <section className='sectForm'>
      {event && (
        <Modal
          className='modal'
          show={showModal}
          onHide={closeModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className='background' closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Editar cita
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='background'>
            <Form className="form-create-appoinment mb-5">
              <div className='separate'>
                                    <Form.Group className="mb-3 hour">
                                      <Form.Label htmlFor="DayTextInput">
                                        Fecha inicio cita
                                      </Form.Label>
                                      <Form.Control
                                        id="DayTextInput"
                                        name='start_date'
                                        value={appointmentData?.start_date}
                                        onChange={handleChange}
                                        type="date"
                                      />
                                      {valErrors.start_date && <p>{valErrors.start_date}</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3 hour">
                                      <Form.Label htmlFor="FinDayTextInput">
                                        Fecha fin cita
                                      </Form.Label>
                                      <Form.Control
                                        id="FinDayTextInput"
                                        name='end_date'
                                        value={appointmentData?.end_date}
                                        onChange={handleChange}
                                        type="date"
                                      />
                                      {valErrors.start_date && <p>{valErrors.start_date}</p>}
                                    </Form.Group>
                                  </div>
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
                  {valErrors.start_hour && <p>{valErrors.start_hour}</p>}
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
                  {valErrors.end_hour && <p>{valErrors.end_hour}</p>}
                </Form.Group>
              </div>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="ClientNameTextInput">
                  Nombre del cliente
                </Form.Label>
                <Form.Control
                  className="input"
                  id="ClientNameTextImput"
                  value={editData?.client_name || ''}
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
                  value={editData?.client_lastname || ''}
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

                  name="employee_user_id"
                  // value={editData.employee_id || ''}
                  onChange={handleChange}
                >
                  {employeeList.map((emp) => (
                    <option selected key={emp.user_id} value={emp.user_id}>
                      {emp.user_name} {emp.lastname}
                    </option>
                  ))}
                </Form.Select>
                {valErrors.employee_user_id && <p>{valErrors.employee_user_id}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="ServicioTextInput">Servicio</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="ServicioTextInput"
                  name="service_id"
                  onChange={handleChange}
                >
                  {enabledServices.map((serv) => (
                    <option selected key={serv.service_id} value={serv.service_id}>
                      {serv.service_name}
                    </option>
                  ))}
                </Form.Select>
                {valErrors.service_id && <p>{valErrors.service_id}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="PhoneTextInput">Teléfono</Form.Label>
                <Form.Control
                  id="PhoneTextImput"
                  value={editData?.client_phone || ''}
                  onChange={handleChange}
                />
                {valErrors.client_phone && <p>{valErrors.client_phone}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="ObservationsTextInput">
                  Observaciones
                </Form.Label>
                <Form.Control
                  id="ObservationsTextImput"
                  name="observation"
                  value={editData?.observation || ''}
                  onChange={handleChange}
                  as="textarea"
                />
                {valErrors.observation && <p>{valErrors.observation}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="statusTextInput">Estado</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="statusTextInput"
                  name="status"
                  onChange={handleChange}
                >
                  <option selected value={1}>Reservada</option>
                  <option value={3}>No presentado</option>
                </Form.Select>
                {valErrors.status && <p>{valErrors.status}</p>}
              </Form.Group>
              <p className='text-center text-danger'>{errorMsg}</p>
            </Form>
          </Modal.Body>
          <Modal.Footer className='background justify-content-center'>
            <div className="botones d-flex justify-content-between w-100">
              <Button onClick={cancelAppointment} className='red-btn'>Cancelar cita</Button>
              <div>
                <Button className="boton ms-auto me-2" onClick={onSubmit}>Guardar</Button>
                <Button onClick={closeModal}>Salir</Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </section>
  );
};

export default ModalCita;
