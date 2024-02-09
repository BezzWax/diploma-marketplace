import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Image, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import GradeIcon from '@mui/icons-material/Grade';
import {useParams} from 'react-router-dom';

const DeviceInfo = observer(({ device, ...props }) => {
  const params = useParams();
  
  if (!device) {
    return null;
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {device.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Device Details</h4>
        <p>Price: {device.price}</p>
        <p>Rating: {device.rating} <GradeIcon  className='pb-1'/></p>
        <div>
            <Image src={process.env.REACT_APP_API_URL + device.img} alt={device.name} fluid />
        </div>
        <div>
          Device info:
            <p>{device.info}</p>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>To basket</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default DeviceInfo;