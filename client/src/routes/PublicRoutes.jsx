import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'

export const PublicRoutes = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      if(user.user_type === 1) navigate('/admin')
      if(user.user_type === 2) navigate('/employee')
      if(user.user_type === 3) navigate('/client')
    }
  },[user])

  return (
    <>
    {!user && <Outlet />}
    </>
  )
}
