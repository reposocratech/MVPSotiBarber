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
  const [selectionEvent, setSelectionEvent] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let result = await fetchData(
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
            employee_name: `${e.employee_name} ${e.employee_lastname}`,
            service: e.service_name
          },
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, [token]);

 
  const handleNavigate = (newDate) => {
    setCurrentdate(newDate);
  };

   //Sirve para abrir la cita del calendario
  const selectEvent = (event) => {
    setSelectionEvent(event)
    setShowModal(true)
  };

  const closeModal = () => {
    setSelectionEvent(null);
    setShowModal(false)
  }

  const selectSlot = (event) => {
    setAppointmentDate({ start: event.start, end: event.end });
    setShow(true);
  };

  return (
    <div className="calendario-citas">
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
      />
      <ModalCita 
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
