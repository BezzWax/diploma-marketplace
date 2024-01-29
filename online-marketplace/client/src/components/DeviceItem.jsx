import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useDeviceStore } from '../store/DeviceStoreProvider';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import DeviceInfo from './modals/DeviceInfo';
import GradeIcon from '@mui/icons-material/Grade';

const DeviceItem = observer(() => {
  const { device } = useDeviceStore();
  const [showDeviceInfo, setShowDeviceInfo] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    setShowDeviceInfo(true);
  };

  const handleCloseDeviceInfo = () => {
    setShowDeviceInfo(false);
  };

  return (
    <Container>
      <Row>
        {device.devices.map((device) => (
          <Col key={device.id} md={3} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card className='m-3 p-2' style={{ flex: 1 }} onClick={() => handleDeviceClick(device)}>
              <Image src={process.env.REACT_APP_API_URL + device.img} alt={device.name} fluid />
              <div>{device.name}</div>
              <div>
                <label>Rating: </label>
                {device.rating}
                <GradeIcon  className='pb-1'/>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <DeviceInfo
        show={showDeviceInfo}
        onHide={handleCloseDeviceInfo}
        device={selectedDevice}
      />
    </Container>
  );
});

export default DeviceItem;
