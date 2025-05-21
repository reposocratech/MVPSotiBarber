import React from 'react'
import { Outlet } from 'react-router-dom'

export const AdminLayout = () => {
  return (
    <>
    <header>
    </header>

     <main>
     <Outlet />
    </main>

    <footer>

    </footer>
    
    </>
  )
}
