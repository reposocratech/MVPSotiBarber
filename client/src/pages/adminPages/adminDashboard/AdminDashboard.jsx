import React from 'react'
import { Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate()

  return (
    <section>
      <h2>Perfíl del Administrador</h2>
      <div className='blue-line'></div>
      <div className='d-flex justify-content-center'>
        <Button onClick={()=>navigate("/admin/createAppointment")}>Añadir cita</Button>
      </div>
    </section>
  )
}

export default AdminDashboard