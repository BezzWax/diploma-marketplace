import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { useDeviceStore } from '../store/DeviceStoreProvider';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';

const Shop = observer(( ) => {
    const {device} = useDeviceStore();

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices().then(data => device.setDevices(data.rows));
    }, []);

    return (
        <Container>
            <Row className='my-3'>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={3}>
                    <BrandBar />
                
                </Col>
            </Row>
            <Row>
                <Col>
                    <DeviceList />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;