import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminEmployeFooter } from '../components/Footers/AdminEmployeFooter';

import './commonLayout.css';

export const EmployeeLayout = () => {
  return (
    <>
      <div className="prueba">
        <header></header>

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
