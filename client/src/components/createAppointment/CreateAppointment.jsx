import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./createappointment.css"
import { fetchData } from '../../helpers/axiosHelpers';
import { AuthContext } from '../../context/AuthContextProvider';

const initialValue = {
  date: "",
  hour: "",
  client_name: "",
  client_lastname: "",
  employee: "",
  phone: "",
  observations: ""
}

const CreateAppointment = ( {appointmentDate, show, handleClose, setEmployeeList, employeeList}) => {
  const [appointmentData, setAppointmentData] = useState(initialValue);
/*   const [employeeList, setEmployeeList] = useState([]) */
  const [errorMsg, setErrorMsg] = useState("");
  const [valErrors, setValErrors] = useState({});
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const {token} = useContext(AuthContext);
  const [clientResults, setClientResults] = useState([]);

  const startDate = String(new Date(appointmentDate.start).toISOString().split("T")[0])
  const endDate =  String(new Date(appointmentDate.end).toISOString().split("T")[0])
  const startHours = String(new Date(appointmentDate.start).getHours()).padStart(2,"0")
  const startMinutes = String(new Date(appointmentDate.start).getMinutes()).padStart(2,"0")
  const startTime = `${startHours}:${startMinutes}`

  const endHours = String(new Date(appointmentDate.end).getHours()).padStart(2,"0")
  const endMinutes = String(new Date(appointmentDate.end).getMinutes()).padStart(2,"0")
  const endTime = `${endHours}:${endMinutes}`


  useEffect(()=>{
    const fetchEmployees = async() => {
      try {
        const resEmployees = await fetchData("admin/employeeList", "get", null, token)

        setEmployeeList(resEmployees.data.employees)

        console.log("empleatesssss", employeeList)
      } catch (error) {
        console.log(error)
      }
    }

    fetchEmployees();
  },[token])

  useEffect(() => {
  console.log("empleados actualizados:", employeeList);
}, [employeeList]);

  useEffect(()=>{
    const fetchClients = async () => {
      if(search.length >= 3){
        try {
          const res = await fetchData(`admin/clientListAppointment?search=${search}`, "get", null, token)
          
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

  const handleChange = (e) => {
    const {name, value} = e.target;
    setAppointmentData({...appointmentData, [name]: value});
  }

  const onSubmit = async() => {
    try {
      await fetchData ("admin/createAppointment", "post", appointmentData)
      // navigate("/admin")
    } catch (error) {
      console.log(error)
    }
  }

  const onCancel = async() => {
    setAppointmentData(initialValue);
    handleClose()
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  

  
  const handleClientSelect = (client) => {
    setAppointmentData({
      ...appointmentData,
      client_name: client.user_name,
      client_lastname: client.lastname,
      phone: client.phone || ""
    })
    setSearch(`${client.user_name} ${client.lastname}`)
    setClientResults([])
  }

  return (
    <section className='register'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
        <Row className='engloba'>
          <Col md={12} lg={6} className='cols'>
          <Form>
            <Form.Group className='mb-5'>
              <Form.Label htmlFor='searchInput'>
                Buscar cliente: 
              </Form.Label>
              <Form.Control
                            id='searchInput'
                            type="text"
                            placeholder="Buscar"
                            value={search}
                            onChange={handleSearch}
                          />
              {clientResults.length > 0 && (
                <div className='dropdown-client-list'>
                  {clientResults.map((client)=>(
                    <div
                      key={client.user_id}
                      className='dropdown-item'
                      onClick={()=>handleClientSelect(client)}
                    >
                      {client.user_name} {client.lastname}
                    </div>
                  ))}
                </div>
              )}            
            </Form.Group>
          </Form>
            
            <Form className='form-create-appoinment'>
              <h2 className='text-center'>Añadir cita</h2>
              <div className='blue-line'></div>
              <div className='separate'>
                {/* <Form.Group className='mb-3'>
                  <Form.Label htmlFor='DateTextInput'>
                    Fecha
                  </Form.Label>
                  <Form.Control
                    id="DateTextImput"
                    name="date"
                    value={date}
                    onChange={handleChange}
                    type='date'
                  />
                  {valErrors.date && <p>{valErrors.date}</p>}
                </Form.Group> */}
                <Form.Group className='mb-3 hour'>
                  <Form.Label htmlFor='StartHourTextInput'>
                    Hora de inicio
                  </Form.Label>
                  <Form.Control
                    id="StartHourTextInput"
                    name="startHour"
                    value={startTime}
                    onChange={handleChange}
                    type='time'
                  />
                  {valErrors.hour && <p>{valErrors.hour}</p>}
                </Form.Group>
                <Form.Group className='mb-3 hour'>
                  <Form.Label htmlFor='EndHourTextInput'>
                    Hora de fin
                  </Form.Label>
                  <Form.Control
                    id="EndHourTextInput"
                    name="endHour"
                    value={endTime}
                    onChange={handleChange}
                    type='time'
                  />
                  {valErrors.hour && <p>{valErrors.hour}</p>}
                </Form.Group>
              </div>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='ClientNameTextInput'>
                  Nombre del cliente
                </Form.Label>
                <Form.Control 
                  id="ClientNameTextImput"
                  name="client_name"
                  value={appointmentData.client_name || ""}
                  onChange={handleChange}
                />
                {valErrors.client_name && <p>{valErrors.client_name}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='ClientLastnameTextInput'>
                  Apellidos del cliente
                </Form.Label>
                <Form.Control 
                  id="ClientLastnameTextImput"
                  name="client_lastname"
                  value={appointmentData.client_lastname || ""}
                  onChange={handleChange}
                />
                {valErrors.client_lastname && <p>{valErrors.client_lastname}</p>}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor='EmpleadoTextInput'>
                  Empleado
                </Form.Label>
                <Form.Select 
                  aria-label="Default select example"   id='EmpleadoTextInput'  className='inputDesc'
                  name='employee'
                  value={appointmentData.employee || ""}
                  onChange={handleChange}
                >
                  <option>Selecciona un empleado</option>
                  {employeeList.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.user_name} {emp.lastname}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='PhoneTextInput'>
                  Teléfono
                </Form.Label>
                <Form.Control 
                  id="PhoneTextImput"
                  name="phone"
                  value={appointmentData.phone || ""}
                  onChange={handleChange}
                />
                {valErrors.phone && <p>{valErrors.phone}</p>}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label htmlFor='ObservationsTextInput'>
                  Observaciones
                </Form.Label>
                <Form.Control 
                  className='inputDesc'
                  id="ObservationsTextImput"
                  name="observations"
                  value={appointmentData.observations || ""}
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
          <Button className='boton' onClick={onCancel}>
            Cancelar
          </Button>
          <Button className='boton' onClick={onSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default CreateAppointment