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
    <section className='padding-y-section'>
      <div className='d-flex flex-column align-items-center justify-content-center mt-3'>
        <h2>Perfil del Administrador</h2>
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
  );
};

export default AdminDashboard;
