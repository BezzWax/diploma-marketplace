import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevices from '../components/modals/CreateDevices';
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
      <Container className='d-flex'>
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
        </Container>
    );
}

export default Admin;