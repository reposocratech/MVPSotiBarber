import { Calendar } from 'react-big-calendar';
import { localizer } from '../../helpers/calendarLocalizer.js';
import { calendarMessages } from '../../helpers/calendarMessages.js';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './appointmentCalendar.css';
import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../helpers/axiosHelpers.js';
import { AuthContext } from '../../context/AuthContextProvider.jsx';
import CreateAppointment from '../createAppointment/CreateAppointment.jsx';
import ModalCita from '../ModalCita/ModalCita.jsx';
import { Button, Form } from 'react-bootstrap';

const AppointmentCalendar = ({
  show,
  setShow,
  handleClose,
  setEmployeeList,
  employeeList,
}) => {
  const [currentView, setCurrentView] = useState('day');
  const [currentDate, setCurrentdate] = useState('');
  const [appointmentDate, setAppointmentDate] = useState({
    start: '',
    end: '',
  });
  const [events, setEvents] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [selectionEvent, setSelectionEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { token } = useContext(AuthContext);
  const [filterAppointmentBy, setFilterAppointmentBy] = useState();
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      let result = await fetchData(
        'admin/getAllAppointments',
        'get',
        null,
        token
      );
      const appointments = result.data.result;
      setAllAppointments(appointments);

      const coloresEmpleado = [
  '#00ACC1', '#00897B', '#3949AB', '#5C6BC0', '#9575CD', '#26C6DA'
];

      const colorMap = {};

      const formattedEvents = appointments.map((e) => {
        if (!colorMap[e.employee_user_id]) {
          const colorIndex = Object.keys(colorMap).length % coloresEmpleado.length;
          colorMap[e.employee_user_id] = coloresEmpleado[colorIndex];
        }

        return {
          id: e.appointment_id,
          start: new Date(`${e.start_date}T${e.start_hour}`),
          end: new Date(`${e.end_date}T${e.end_hour}`),
          title: `${e.client_name} ${e.client_lastname}`,
          description: e.observation,
          employee_user_id: e.employee_user_id,
          bgColor: colorMap[e.employee_user_id],
          resource: {
            created_by: `${e.created_by_name} ${e.created_by_lastname}`,
            employee_name: `${e.employee_name} ${e.employee_lastname}`,
            service: e.service_name,
          },
        };
      });
      setEvents(formattedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  useEffect(() => {
    const coloresEmpleado = [
  '#00ACC1', '#00897B', '#3949AB', '#5C6BC0', '#9575CD', '#26C6DA'
];
    const colorMap = {};

    const source = filterAppointmentBy
      ? allAppointments.filter((e) => e.employee_user_id == filterAppointmentBy)
      : allAppointments;

    const formattedEvents = source.map((e) => {
      if (!colorMap[e.employee_user_id]) {
        const colorIndex = Object.keys(colorMap).length % coloresEmpleado.length;
        colorMap[e.employee_user_id] = coloresEmpleado[colorIndex];
      }

      return {
        id: e.appointment_id,
        start: new Date(`${e.start_date}T${e.start_hour}`),
        end: new Date(`${e.end_date}T${e.end_hour}`),
        title: `${e.client_name} ${e.client_lastname} (${e.employee_name})`,
        description: e.observation,
        employee_user_id: e.employee_user_id,
        bgColor: colorMap[e.employee_user_id],
        resource: {
          created_by: `${e.created_by_name} ${e.created_by_lastname}`,
          employee_name: `${e.employee_name} ${e.employee_lastname}`,
          service: e.service_name,
        },
      };
    });

    setEvents(formattedEvents);
  }, [allAppointments, filterAppointmentBy]);

  const handleNavigate = (newDate) => {
    setCurrentdate(newDate);
  };

  const selectEvent = (event) => {
    setSelectionEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectionEvent(null);
    setShowModal(false);
  };

  const selectSlot = (event) => {
    setAppointmentDate({ start: event.start, end: event.end });
    setShow(true);
  };

  const handleChange = (e) => {
    setFilterAppointmentBy(e.target.value);
  };

  return (
    <div className="calendario-citas">
      <Form>
        <Form.Group>
          <Form.Label htmlFor="EmpleadoTextInput">Filtrar citas por:</Form.Label>
          <Form.Select
            aria-label="Default select example"
            id="EmpleadoTextInput"
            className="inputDesc"
            name="employee_id"
            onChange={handleChange}
          >
            <option value="">Todas las citas</option>
            {employeeList.map((emp) => (
              <option key={emp.user_id} value={emp.user_id}>
                {emp.user_name} {emp.lastname}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>

      <Calendar
        culture="es"
        messages={calendarMessages()}
        localizer={localizer}
        defaultView="day"
        views={['week', 'day']}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={currentView}
        onView={(view) => setCurrentView(view)}
        onNavigate={handleNavigate}
        date={currentDate}
        min={new Date(2025, 1, 1, 10, 0)}
        max={new Date(2025, 1, 1, 21, 0)}
        step={30}
        timeslots={2}
        onSelectEvent={selectEvent}
        selectable
        onSelectSlot={selectSlot}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.bgColor || 'var(--color-azul)',
            color: '#ffffff',
            borderRadius: '0.5rem',
            padding: '0.1rem 0.4rem',
            fontSize: '0.8rem',
          }
        })}
      />

      <ModalCita
        onUpdate={fetchAppointments}
        setShowModal={setShowModal}
        showModal={showModal}
        closeModal={closeModal}
        event={selectionEvent}
      />
      <CreateAppointment
        events={events}
        setEvents={setEvents}
        appointmentDate={appointmentDate}
        employeeList={employeeList}
        handleClose={handleClose}
        show={show}
        setEmployeeList={setEmployeeList}
      />
    </div>
  );
};

export default AppointmentCalendar;
