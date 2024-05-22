import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevices from '../components/modals/CreateDevices';
import Chart from '../components/Chart';
import { useState } from 'react';

const Admin = ( ) => {
    const [showModal, setShowModal] = useState(null);

    const handleShowModal = (modalType) => {
      setShowModal(modalType);
    };
  
    const handleCloseModal = () => {
      setShowModal(null);
    };
  
    return (
      <Row className='d-flex'>
        <Col md={12}>
          <Button className='m-3' variant={'outline-dark'} onClick={() => handleShowModal('CreateType')}>
          Add Type
        </Button>
        <CreateType show={showModal === 'CreateType'} onHide={handleCloseModal} />
  
        <Button className='m-3' variant={'outline-dark'} onClick={() => handleShowModal('CreateBrand')}>
          Add Brand
        </Button>
        <CreateBrand show={showModal === 'CreateBrand'} onHide={handleCloseModal} />

        <Button className='m-3' variant={'outline-dark'} onClick={() => handleShowModal('CreateDevices')}>
            Add Device
        </Button>
        <CreateDevices show={showModal === 'CreateDevices'} onHide={handleCloseModal} />
        </Col>


        <Col md={12}>
          <Chart />
        </Col>

      </Row>
    );
}

export default Admin;