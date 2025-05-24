import React from 'react'
import CompleteRegister from '../../../components/completeRegister/CompleteRegister'

const ClientDashboard = () => {
   
  
  

  return (
    <div>
      {/* aqui se tendria que cargar el modal de completa tus datos primero (pero solo si los datos estan vacíos) */}
      <CompleteRegister />
      perfil del cliente
    </div>
  ) 
} 

export default ClientDashboard