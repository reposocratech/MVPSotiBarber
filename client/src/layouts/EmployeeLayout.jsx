import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminEmployeFooter } from '../components/Footers/AdminEmployeFooter'

export const EmployeeLayout = () => {
  return (
    <>
    <header>
    </header>
      
     <main>
     <Outlet/>
    </main>

    <footer>
      <AdminEmployeFooter />
    </footer>
    
    </>
  )
}
