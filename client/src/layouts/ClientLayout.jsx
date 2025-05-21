import React from 'react'
import { Outlet } from 'react-router-dom'
import { ClientNavbar } from '../components/Navbars/clientNavbar/ClientNavbar'
import { PublicClientFooter } from '../components/Footers/PublicClientFooter'

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
    <PublicClientFooter />
    </footer>
    
    </>
  )
}
