import React, { useState } from 'react'
import { Button } from "react-bootstrap"
import { fetchData } from '../../../helpers/axiosHelpers'
import { AuthContext } from '../../../context/AuthContextProvider'
import { useNavigate, useSearchParams } from 'react-router-dom'
import "./accountConfirm.css"


export const AccountConfirm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  
  const onSubmit = async() => {
    try {
      await fetchData(`client/confirmAccount`, "put", null, token);
      navigate("/login")
    } catch (error) {
      console.log("Error al confirmar la cuenta", error)
    }
  }

  return (
    <section className='d-flex flex-column justify-content-center align-items-center'>
      <h2>Confirma tu cuenta </h2>
      <div className='d-flex justify-content-center'>
        <button type="button" className='btn' onClick={onSubmit}>Confirmar</button>
      </div>
    </section>
  )
}
