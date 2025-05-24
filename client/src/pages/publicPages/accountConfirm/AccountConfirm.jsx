import React, { useContext, useEffect } from 'react'
import { Button } from "react-bootstrap"
import { fetchData } from '../../../helpers/axiosHelpers'
import { AuthContext } from '../../../context/AuthContextProvider'


export const AccountConfirm = () => {
  
  const onSubmit = async() => {
    await fetchData(`client/confirmAccount`, "put")
  }

  return (
    <section>
      <h2>Confirma tu cuenta: </h2>
      <Button onClick={onSubmit}>Confirmar</Button>
    </section>
  )
}
