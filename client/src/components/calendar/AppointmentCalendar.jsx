import { Calendar } from 'react-big-calendar';
import { localizer } from '../../helpers/calendarLocalizer.js';
import { calendarMessages } from '../../helpers/calendarMessages.js';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './appointmentCalendar.css';
import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../helpers/axiosHelpers.js';
import { AuthContext } from '../../context/AuthContextProvider.jsx';
import CreateAppointment from '../createAppointment/CreateAppointment.jsx';


const events = [
  {title: "evento 1",
    start: new Date("2025-05-28T12:00:00"),
    end: new Date("2025-05-28T12:30:00"),
    description: "descripcion evento 1"

  },
    {title: "evento 2",
    start: new Date("2025-05-29T12:00:00"),
    end: new Date("2025-05-29T12:30:00"),
    description: "descripcion evento 2"

  }
]

const AppointmentCalendar = ({show, setShow, handleClose, setEmployeeList, employeeList}) => {
 
  const [currentView, setCurrentView] = useState('day');
  const [currentDate, setCurrentdate] = useState("");
  const [appointmentDate, setAppointmentDate] = useState({start:"", end:""})
  

  const handleNavigate = (newDate)=>{
    setCurrentdate(newDate)
  }

  const selectEvent = (event) => {
    console.log(event);
    
  }

  const selectSlot = (event) => {
    setAppointmentDate({start:event.start, end:event.end})
    setShow(true)
  }

  return (
    <div className="calendario-citas">
      <Calendar
        culture='es'
        messages={calendarMessages()}
        localizer={localizer}
        defaultView="day"
        views={['week', 'day']}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={currentView}
        onView={view => setCurrentView(view)}
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
      <CreateAppointment appointmentDate={appointmentDate} employeeList={employeeList} handleClose={handleClose} show={show} setEmployeeList={setEmployeeList}  />
    </div>
  );
};

export default AppointmentCalendar;
