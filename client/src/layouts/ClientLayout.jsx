import React from 'react'
import { Outlet } from 'react-router-dom'

export const ClientLayout = () => {
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
