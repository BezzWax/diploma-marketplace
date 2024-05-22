import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Image, Form, Dropdown, Container, Row, Col } from 'react-bootstrap';
import { DeviceStoreContext } from '../../store/DeviceStoreProvider';
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';

const CreateDevices = observer(({ show, onHide }) => {
  const { device } = useContext(DeviceStoreContext);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
    fetchDevices().then(data => device.setDevices(data.rows));
}, []);

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number));
  }

  const selectFile = e => {
    setFile(e.target.files[0]);
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
  }  

  const addDevice = () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('typeId', device.selectedType.id);
    formData.append('info', JSON.stringify(info));
    console.log('qqqq')
    createDevice(formData).then(data => onHide());

  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show} 
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='m-3'>
          <Row>Choose type</Row>
            <Dropdown.Toggle>{device.selectedType ? device.selectedType.name : "Choose type"}
</Dropdown.Toggle>
            <Dropdown.Menu>
                {device.types.map(type => 
                  <Dropdown.Item 
                   key={type.id}
                   onClick={() => device.setSelectedType(type)}
                   >{type.name}
                  </Dropdown.Item>
                )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='m-3'>
          <Row>Choose brand</Row>
            <Dropdown.Toggle>{device.selectedBrand ? device.selectedBrand.name : "Choose brand"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {device.brands.map(brand => 
                  <Dropdown.Item 
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                  >
                    {brand.name}
                  </Dropdown.Item>
                )}
            </Dropdown.Menu>
          </Dropdown>
          <Container className='p-2'>
          <Form.Control
            className='m-3'
            placeholder='Device name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
            <Form.Control
            className='m-3'
            placeholder='Device price'
            type='number'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
            <Form.Control
            className='w-75 m-3'
            type='file'
            onChange={selectFile}
          />
          </Container>
          <Button
          onClick={addInfo}
          
          >
            Add property
          </Button>
          {
            info.map(i => 
              <Row className='my-2' key={i.number}>
                <Col md='4'>
                  <Form.Control
                    className='my-2'
                    placeholder='Enter name of property'
                    value={i.title}
                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  />
                </Col>
                <Col md='4'>
                  <Form.Control
                    className='my-2'
                    placeholder='Description'
                    value={i.description}
                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  />
                </Col>
                <Col md='4'>
                  <Button variant='outline-danger'
                    className='my-2'
                    onClick={() => removeInfo(i.number)}
                  >
                    Delete property
                  </Button>
                </Col>
              </Row>  
            )
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant='outline-success' onClick={addDevice}>Add</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevices;
