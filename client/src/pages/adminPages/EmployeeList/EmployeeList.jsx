import React, { useContext, useEffect } from 'react';
import { Button, Col, Row, Table, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelpers';
import { useState } from 'react';
import editbtn from "../../../assets/icons/editicon.png"

import './employeeList.css';
import { AuthContext } from '../../../context/AuthContextProvider';

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const resEmployees = await fetchData(
          'admin/employeeList',
          'get',
          null,
          token
        );

        setEmployeeList(resEmployees.data.employees);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, [token]);

  const navigate = useNavigate();

  const enableSwitch = async (id) => {
    const updateEmployees = employeeList.map((emp) => {
      if (emp.user_id === id) {
        return {
          ...emp,
          user_is_enabled: emp.user_is_enabled === 1 ? 0 : 1,
        };
      }
      return emp;
    });

    setEmployeeList(updateEmployees);

    const updatedEmployee = updateEmployees.find((emp) => emp.user_id === id);
    const status = updatedEmployee.user_is_enabled;

    try {
      await fetchData(
        `admin/enabledEmployee/${id}`,
        'put',
        {
          user_is_enabled: status,
        },
        token
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (emp) => {
    navigate(`/admin/editEmployee`, {state: {employee: emp}})
  }

  return (
    <>
      <section className="padding-y-section">
        <div className="d-flex flex-column align-items-center justify-content-center py-4">
          <h3>Empleados</h3>
          <div className="blue-line"></div>
        </div>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <button type="button" className="btn" onClick={() => navigate('/admin/createEmployee')}>
                    Crear empleado
                  </button>
          </div>
        <Row>
        <Col className="d-flex justify-content-center align-items-center">
  <div className="table-employees d-flex flex-column align-items-center justify-content-center">
    <div className="table-scroll-wrapper">
      <table>
        <tbody>
          {employeeList.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center py-3">
                No hay empleados registrados.
              </td>
            </tr>
          ) : (
            employeeList.map((emp) => (
              <tr key={emp.user_id}>
                <td className="px-4">
                  {emp.user_name} {emp.lastname}
                </td>
                <td>
                  <div className="d-flex">
                    <img onClick={() => onEdit(emp)} src={editbtn} alt="editar" />
                    <Form>
                      <Form.Check
                        className="enabled"
                        type="switch"
                        id="custom-switch"
                        checked={emp.user_is_enabled === 0}
                        onChange={() => enableSwitch(emp.user_id)}
                      />
                    </Form>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
</Col>
        </Row>
      </section>
    </>
  );
};

export default EmployeeList;
