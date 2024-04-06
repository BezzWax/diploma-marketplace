import { observer } from 'mobx-react-lite';
import { Button, ListGroup } from 'react-bootstrap';
import { useDeviceStore } from '../store/DeviceStoreProvider';
import { ListItem } from '@mui/material';

const TypeBar = observer(() => {
  const { device } = useDeviceStore();

  return (
    <ListGroup className='mt-3'>
      {device.types.map(type => (
        <ListGroup.Item
            active={device.selectedType?.id === type.id}
            onClick={() => device.setSelectedType(type)}
            key={type.id}>
            {type.name}
        </ListGroup.Item>
      ))}

    </ListGroup>
  );
});

export default TypeBar;