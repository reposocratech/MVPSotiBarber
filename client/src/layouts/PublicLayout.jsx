import React from 'react'
import { Outlet } from 'react-router-dom'

export const PublicLayout = () => {
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
