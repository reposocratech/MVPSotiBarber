import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminEmployeFooter } from '../components/Footers/AdminEmployeFooter';
import { AdminNavbar } from '../components/Navbars/adminNavbar/AdminNavbar';

import './commonLayout.css';

export const AdminLayout = () => {
  return (
    <div className="prueba">
      <header>
        <AdminNavbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <AdminEmployeFooter />
      </footer>
    </div>
  );
};
