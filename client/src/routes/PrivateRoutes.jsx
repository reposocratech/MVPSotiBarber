import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider';

export const PrivateRoutes = ({userType, requiredUser}) => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
   
  console.log("userPrivate", user);
  
  useEffect(()=>{
    if(userType !== requiredUser){
      navigate('/')
    }
  },[user])  

  return (
    <>
     {user && <Outlet />}
    </>
  )
}
