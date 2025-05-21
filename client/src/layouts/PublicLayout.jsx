import React from 'react'
import { Outlet } from 'react-router-dom'
import { PublicNavbar } from '../components/Navbars/publicNavbar/PublicNavbar'

export const PublicLayout = () => {
  return (
    <>
    <header>
      <PublicNavbar/>
    </header>

     <main>
     <Outlet />
    </main>

    <footer>

    </footer>
    
    </>
  )
}
