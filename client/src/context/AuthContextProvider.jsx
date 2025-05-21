import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();

  const logIn = async(loginData)=>{

  }


  return (
    <AuthContext.Provider value={{logIn}}> 
      {children}
    </AuthContext.Provider>
  )
}
