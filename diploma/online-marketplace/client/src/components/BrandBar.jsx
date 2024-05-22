import { observer } from 'mobx-react-lite';
import { ListGroup } from 'react-bootstrap';
import { useDeviceStore } from '../store/DeviceStoreProvider';

const BrandBar = observer(() => {
  const { device } = useDeviceStore();

  return (
    <ListGroup className='mt-3 d-flex flex-row'>
      {device.brands.map(brand => (
        <ListGroup.Item
          className='rounded'
          active={brand.id === device.selectedBrand.id}
          onClick={() => device.setSelectedBrand(brand)}
          key={brand.id}
          style={{ cursor: 'pointer', marginRight: '10px'}}
        >
          {brand.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default BrandBar;
