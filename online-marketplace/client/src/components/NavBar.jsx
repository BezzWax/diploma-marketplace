import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';

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
        <Navbar.Brand href="/">Reactive Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Store</Nav.Link>
            {userStore.isAuth && (
              <>
                <Nav.Link href="/basket">Basket</Nav.Link>
                <Nav.Link href="/device">Device</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {userStore.isAuth ? (
              <>
                <Button className="mx-2 my-2" size='sm' onClick={() => logOut()}>
                  Log Out
                </Button>
                <Button className="mx-2 my-2" onClick={() => navigate(ADMIN_ROUTE)}>
                  Admin
                </Button>
              </>
            ) : (
              <Button href="/login">Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
