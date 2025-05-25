import React, { createContext, useEffect, useState } from 'react'
import {fetchData} from '../helpers/axiosHelpers';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [services, setServices] = useState([]);
  
  
  useEffect(()=>{
    let tokenLS = localStorage.getItem("token")
    if(tokenLS){
      const fetchUser = async () =>{
        try {
          const res = await fetchData("client/userById", "get", null, tokenLS)
          console.log("conteeeext",res);
          
          setUser(res.data.user)
          setToken(tokenLS)
        } catch (error){
          console.log(error);
          
        }
      }
      fetchUser();
    }

    const fetchServices = async () =>{
      try {
        const resServices = await fetchData("admin/services", "get")
        setServices(resServices.data.services)
      } catch (error) {
        console.log(error)
      }
    }
    fetchServices();
  },[])

  console.log("userrrrConteext", user);

  console.log("servicesCONTEXT", services)
  
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
                  logOut,
                  user,
                  token,
                  services,
                  setServices,
                  setUser
                  }}> 
      {children}
    </AuthContext.Provider>
  )
}
