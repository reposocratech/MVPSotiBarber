import React from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

const EmployeeList = () => {
  const navigate = useNavigate();

  return (
    <section>
      <h2 className='text-center'>Empleados</h2>
      <div className='blue-line'></div>
      <Button onClick={()=>navigate("/admin/createEmployee")}>Crear empleados</Button>
      <Button onClick={()=>navigate("/admin/editEmployee")}>Editar empleados</Button>
    </section>
  )
}

export default EmployeeList