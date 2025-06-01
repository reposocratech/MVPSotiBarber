import React from 'react';
import { Outlet } from 'react-router-dom';
import { ClientNavbar } from '../components/Navbars/clientNavbar/ClientNavbar';
import { ClientFooter } from '../components/Footers/ClientFooter';

import './commonLayout.css';

export const ClientLayout = () => {
  return (
    <>
      <div className='prueba' >
        <header>
          <ClientNavbar />
        </header>
        <main>
          <Outlet />
        </main>

        <footer>
          <ClientFooter/>
        </footer>
      </div>
    </>
  );
};
