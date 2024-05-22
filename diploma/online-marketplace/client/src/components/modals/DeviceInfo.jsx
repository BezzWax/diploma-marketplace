import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Modal, Image, Row, Col, Container } from 'react-bootstrap';
import GradeIcon from '@mui/icons-material/Grade';

const DeviceInfo = observer(({ device, deviceData, onHide, ...props }) => {

  const [basketItem, setBasketItem] = useState(() => {
    const existingBasket = localStorage.getItem('basket');
    return existingBasket ? JSON.parse(existingBasket) : null;
  });


  const toBasket = () => {
    const existingBasket = JSON.parse(localStorage.getItem('basket')) || [];
    const newBasket = [...existingBasket, deviceData.id];
    localStorage.setItem('basket', JSON.stringify(newBasket));
    onHide();
  };

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basketItem));

  }, [basketItem]);


  if (!device || !deviceData) {
    return null;
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{device.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Device Details</h4>
        <p>Price: {deviceData.price}</p>
        <p>Rating: {deviceData.rating} <GradeIcon className='pb-1'/></p>
        <div className='text-center'>
          <Image src={process.env.REACT_APP_API_URL + device.img} alt={device.name} fluid />
        </div>
        <div>
          Device info:
          {deviceData.info.map((infoItem, index) => (
          <div key={index}>
            <Row>
              <Col md={2} xs={3}>
                <p>{infoItem.title}</p>
              </Col>
              <Col md={10} xs={9}>
                <p>{infoItem.description}</p>
              </Col>
            </Row>
          </div>
        ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toBasket}>To basket</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeviceInfo;
