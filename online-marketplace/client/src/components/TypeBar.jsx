import { observer } from 'mobx-react-lite';
import { ListGroup } from 'react-bootstrap';
import { useDeviceStore } from '../store/DeviceStoreProvider';

const TypeBar = observer(() => {
  const { device } = useDeviceStore();

  return (
    <ListGroup className='mt-3'>
      {device.types.map(type => (
        <ListGroup.Item
            active={type.id === device.selectedType.id}
            onClick={() => device.setSelectedType(type)}
            key={type.id}>
            {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;