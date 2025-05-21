import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { PublicRoutes } from './PublicRoutes'
import { PublicLayout } from '../layouts/PublicLayout'
import Home from '../pages/publicPages/home/Home'
import Register from '../pages/publicPages/Register/Register'
import Login from '../pages/publicPages/Login/Login'
import Contact from '../pages/publicPages/contact/Contact'
import ServiceList from '../pages/publicPages/serviceList/ServiceList'
import ForgetPassword from '../pages/publicPages/forgetPassword/ForgetPassword'
import ChangePassword from '../pages/publicPages/changePassword/ChangePassword'




//componentes públicos

//componentes Client

//componentes Empleado

//componentes Admin





export const AppRoutes = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes/>}>
            <Route element={<PublicLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/services' element={<ServiceList />} />
              <Route path='/forgetPassword' element={<ForgetPassword />} />
              <Route path='/changePassword' element={<ChangePassword />} />
            </Route>
          </Route>
        </Routes>
    
    
    
    
    
    
    </BrowserRouter>
    
    
    
    </>
  )
}
