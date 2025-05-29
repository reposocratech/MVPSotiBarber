import React from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { AuthContext } from '../../../context/AuthContextProvider';
import { FormCreateService } from '../../../components/formCreateService/FormCreateService';



const CreateService = () => {
  

  return (
    <section className='padding-y-section'>
      <Row>
      <Col className="d-flex justify-content-center align-items-center">
          <FormCreateService/>
        </Col>
      </Row>
    </section>
  )
}

export default CreateService