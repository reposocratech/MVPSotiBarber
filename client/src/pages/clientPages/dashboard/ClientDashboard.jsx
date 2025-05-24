import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContextProvider';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UserIcon } from '../../../components/userIcon/UserIcon';

import './clientDashboard.css'
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log('+++++++++', user);

  return (
    
 
      <Container>
        <section>
          <Row>
            <Col>
              <h2 className="text-center ">
                Perfil de {user.user_name} {user.lastname}
              </h2>
              <div className="blue-line"></div>
            </Col>
          </Row>
        </section>
        <section>
          <Row className='mb-5 align-items-stretch'>
            <Col>
              <div className='client-profile d-flex gap-4 justify-content-center align-items-center'>
                <div className='d-flex align-items-center '>
                  <div>
                    <UserIcon/>
                  </div>
                  <div>
                    <h3>{user.user_name} {user.lastname}</h3>
                    <span>{user.phone}</span>
                  </div>
                </div>

                <div>
                  <Button className='button' onClick={()=>navigate('/client/editClient')} >Editar</Button>
                </div>

              </div>
            </Col>
            <Col>
            <div className='history'>
              <h3>Historial</h3>
              <span>Tu historial de servicios</span>
              <Button className='button'>Citas</Button>
            </div>
            </Col>
            </Row> 
        </section>
      </Container>
   
  );
};

export default ClientDashboard;
