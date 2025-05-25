import React, { useContext } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import './servicelist.css'
import { AuthContext } from '../../../context/AuthContextProvider'
import { Link } from 'react-router-dom'

const ServiceList = () => {
  const {services} = useContext(AuthContext)

  return (
    <section className='padding-y-section'>
      <Container fluid="xxl">
        <div className='d-flex flex-column align-items-center justify-content-center'>
        <h3>Precios y Servicios</h3>
        <div className='blue-line'></div>
        </div>
        <Row>
          <Col>
            <div className='service-list'>
          <table>
          <thead>
          </thead>
            <tbody>
              {services.map((service)=>{
                return(
                    <tr key={service.service_id}>
                    <td>{service.service_name}</td>
                    <td>
                    <div className="d-flex flex-column">
                      <span>{service.price}€</span>
                      <span>{service.estimated_time}min</span>
                    </div>
                    </td>
                    <td>
                      foto
                    </td>
                    </tr>
                )
                
              })}
            </tbody>

          </table>
            </div>
          </Col>
        </Row>
        <Row>
          <section className='padding-y-section'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h3>Conoce nuestros trabajos</h3>
              <div className='blue-line'></div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              {services.map((service)=>{
                return(
                  <Link className='filter' to="" key={service.service_id}>{service.service_name}</Link>
                )
              })}
            </div>
          </section>
        </Row>
      </Container>

    </section>
  )
}

export default ServiceList 