import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminEmployeFooter } from '../components/Footers/AdminEmployeFooter';

import './commonLayout.css';
import { EmployeeNavbar } from '../components/Navbars/employeeNavbar/EmployeeNavbar';

export const EmployeeLayout = () => {
  return (
    <>
      <div className="prueba">
        <header>
          <EmployeeNavbar/>
        </header>

        <main>
          <Outlet />
        </main>

        <footer>
          <AdminEmployeFooter />
        </footer>
      </div>
    </>
  );
};
