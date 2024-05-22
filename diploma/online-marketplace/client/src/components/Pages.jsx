import {observer} from 'mobx-react-lite';
import { useDeviceStore } from '../store/DeviceStoreProvider';
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => {
    const { device } = useDeviceStore();
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];

    for(let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className='mt-5' fixed="bottom">
            {
                pages.map(page =>
                    <Pagination.Item 
                    key={page}
                    active={device.page === page}
                    className='color-black'
                    bg="dark"
                    onClick={() => device.setPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                )
            }
        </Pagination>
    );

})

export default Pages;