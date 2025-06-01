import React, { useState } from 'react'
import AppointmentCalendar from '../../../components/calendar/AppointmentCalendar';

const EmployeeDashboard = () => {
  const [show, setShow] = useState(false);
  const [employeeList, setEmployeeList] = useState([])

  const handleClose = () => {
    setShow(false);
  }

  return (
    <section>
      <div className='d-flex flex-column align-items-center justify-content-center mt-3'>
        <h2>Perfil del Empleado</h2>
        <div className="blue-line"></div>
      </div>
      <div>
        <AppointmentCalendar
          employeeList={employeeList}
          setEmployeeList={setEmployeeList}
          show={show}
          setShow={setShow}
          handleClose={handleClose}
        />
      </div>
    </section>
  )
}

export default EmployeeDashboard   