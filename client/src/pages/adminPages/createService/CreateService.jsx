import React, { useContext, useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { createServiceSchema } from '../../../schemas/createServiceSchema';
import { AuthContext } from '../../../context/AuthContextProvider';
import { fetchData } from '../../../helpers/axiosHelpers';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import { FormCreateService } from '../../../components/formCreateService/FormCreateService';

/* const initialValue = {
  service_name: '',
  estimated_time: '',
  price: '',
  service_description: '',
}; */

const CreateService = () => {
  // const [service, setService] = useState(initialValue);
  // const [valErrors, setValErrors] = useState({});
  // const [errorMsg, setErrorMsg] = useState("")
  // const {token, services, setServices} = useContext(AuthContext)
  // const navigate = useNavigate();
  // const [maxLength, setMaxLength] = useState(0)


  /* const handleChange = (e) => {
    let { name, value } = e.target;
    
    const regex = /^\d*([.,]?\d{0,2})?$/;
    if(name !== "price" || name === "price" && regex.test(value) || name==="price" && value === ""){
      if(name === "price" ){
        value = value.trim().replace(",",".")
      }else{
        value = value.trim()
      }
      if(name === "service_description" && value.length < 251){
        setMaxLength(value.length)
        setService({ ...service, [name]: value });
      }else if (name !== "service_description"){
        setService({ ...service, [name]: value });
      }
    }
  };
  console.log('SERVICIO', service);

  const cancel = ()=>{
    navigate("/admin/service")
  }

  const onSubmit = async () => {
      try {
        createServiceSchema.parse(service)
        let res = await fetchData('admin/createService', 'post', service, token)
         
          console.log('reees', res);
      
        //seteo services con el nuevo servicio y le pongo el campo de habilitado
        setErrorMsg(res.data.message)
        setValErrors({})
        setServices([...services, {...service, service_is_enabled:0}])
        setService(initialValue);
        navigate("/admin/service")
      } catch (error) {
        if(error instanceof ZodError){
          let objTemp = {}
          error.errors.forEach((er)=>{
            objTemp[er.path[0]]=er.message
          })
          setValErrors(objTemp)
        } else if(error.response){
          setErrorMsg(error.response.data.message)
        } else{
          setErrorMsg("error")
        }
        console.log(error);
      }
    }; */

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