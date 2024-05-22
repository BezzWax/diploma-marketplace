import {observer} from 'mobx-react-lite';
import { useDeviceStore } from '../store/DeviceStoreProvider';
import {Row} from 'react-bootstrap';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
    const { device } = useDeviceStore();

    return (
        <Row className='d-flex'>
            <DeviceItem key={device.id} device={device}/>
        </Row>
    );
})

export default DeviceList;