import React, { createContext, useEffect, useState } from 'react'
import {fetchData} from '../helpers/axiosHelpers';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();


  const logIn = async(loginData)=>{
    const responseToken = await fetchData("client/login", "post", loginData);
    let tokenBack = responseToken.data.token;

    const responseUser = await fetchData("client/userById", "get", null, tokenBack);

    let userBack = responseUser.data.user;
    localStorage.setItem("token", tokenBack)
    setToken(tokenBack);
    setUser(userBack);
  }

  const logOut = () =>{
    localStorage.removeItem("token");
    setUser();
    setToken();
  }


  return (
    <AuthContext.Provider value={{
                  logIn, 
                  logOut
                  }}> 
      {children}
    </AuthContext.Provider>
  )
}
