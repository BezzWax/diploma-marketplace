import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { useDeviceStore } from '../store/DeviceStoreProvider';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import Pages from '../components/Pages';
import Footer from '../components/footer/Footer';

const Shop = observer(( ) => {
    const {device} = useDeviceStore();

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices(null, null, 1, 8).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, []);

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 8).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        })
    }, [device.page, device.selectedType, device.selectedBrand])

    return (
        <Container>
            <Row className='my-3'>
                <Col md={2}>
                    <TypeBar />
                </Col>
                <Col md={10}>
                    <BrandBar />
                    <DeviceList />
                </Col>
            </Row>
            <Pages fixed="bottom"/>
        </Container>
    );
});

export default Shop;