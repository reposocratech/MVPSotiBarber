import React from 'react'
import { Outlet } from 'react-router-dom'
import { ClientNavbar } from '../components/Navbars/clientNavbar/ClientNavbar'

export const ClientLayout = () => {
  return (
    <>
    <header>
    </header>
      <ClientNavbar/>
     <main>
     <Outlet />
    </main>

    <footer>

    </footer>
    
    </>
  )
}
