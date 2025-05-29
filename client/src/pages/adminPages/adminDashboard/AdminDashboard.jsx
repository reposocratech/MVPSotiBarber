import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import AppointmentCalendar from '../../../components/calendar/AppointmentCalendar.jsx';

import { fetchData } from '../../../helpers/axiosHelpers.js';
import { AuthContext } from '../../../context/AuthContextProvider.jsx';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <section>
      <h2>Perfíl del Administrador</h2>
      <div className="blue-line"></div>
      <div className="d-flex justify-content-center">
        <Button onClick={() => navigate('/admin/createAppointment')}>
          Añadir cita
        </Button>
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
      <div></div>
    </section>
  );
};

export default AdminDashboard;
