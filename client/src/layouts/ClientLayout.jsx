import React from 'react'
import { Outlet } from 'react-router-dom'
import { PublicClientFooter } from '../components/Footers/PublicClientFooter'

export const ClientLayout = () => {
  return (
    <>
    <header>
    </header>

     <main>
     <Outlet />
    </main>

    <footer>
    <PublicClientFooter />
    </footer>
    
    </>
  )
}
