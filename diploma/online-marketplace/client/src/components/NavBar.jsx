import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DevicesIcon from '@mui/icons-material/Devices';
import logo from '../img/letter-r 512.png'
import { Image } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { observer } from 'mobx-react-lite';
import { UserStoreContext } from '../store/userStore';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../utils/consts';

const NavBar = observer(() => {
  const navigate = useNavigate();
  const userStore = useContext(UserStoreContext);

  const logOut = () => {
    userStore.setUser({});
    userStore.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className='bg-white p-2 rounded' href="/">
          <Image className='text-white' width={32} height={32} src={logo}/>
        </Navbar.Brand>
        <Navbar.Brand href="/">Reactive Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">


          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={`tooltip-bottom`}>Store</Tooltip>}
          >
            <Nav.Link href="/">
              <ShoppingCartIcon />
            </Nav.Link>
          </OverlayTrigger>

            {userStore.isAuth && (
              <>
              <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip id={`tooltip-bottom`}>
                  Basket
                </Tooltip>
              }
              >
                <Nav.Link href="/basket"><ShoppingBasketIcon /></Nav.Link>
              </OverlayTrigger>

              <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip id={`tooltip-bottom`}>
                  In progress...
                </Tooltip>
              }
              >
                <Nav.Link href="/device"><DevicesIcon /></Nav.Link>
              </OverlayTrigger>
              </>
            )}
          </Nav>
          <Nav>
          {userStore.isAuth ? (
            <>
              <Button className="mx-2 my-2" size='sm' variant='light' onClick={() => logOut()}>
                Log Out
              </Button>
              {userStore.user && userStore.user.role === 'ADMIN' && (
                <Button className="mx-2 my-2" onClick={() => navigate(ADMIN_ROUTE)}>
                  Admin
                </Button>
              )}
              </>
              ) : (
            <Button variant='light' href="/login">Login</Button>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
