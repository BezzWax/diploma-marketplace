import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useDeviceStore } from '../store/DeviceStoreProvider';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import DeviceInfo from './modals/DeviceInfo';
import GradeIcon from '@mui/icons-material/Grade';

import { fetchOneDevice } from '../http/deviceAPI';

const DeviceItem = observer(() => {
  const { device } = useDeviceStore();
  const [showDeviceInfo, setShowDeviceInfo] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceData, setDeviceData] = useState(null);

  const handleDeviceClick = async (device) => {
    try {
      const deviceData = await fetchOneDevice(device.id);
      setSelectedDevice(device);
      setDeviceData(deviceData);
      setShowDeviceInfo(true);
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
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
              <Image width={200} height={200} src={process.env.REACT_APP_API_URL + device.img} alt={device.name} fluid />
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
        deviceData={deviceData}
      />
    </Container>
  );
});

export default DeviceItem;
