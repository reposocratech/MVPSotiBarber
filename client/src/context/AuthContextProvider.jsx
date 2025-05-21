import React, { createContext } from 'react'

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

  const logIn = async(loginData)=>{

  }


  return (
    <AuthContext.Provider value={{logIn}}> 
      {children}
    </AuthContext.Provider>
  )
}
