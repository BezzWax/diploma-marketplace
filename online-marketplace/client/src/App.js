import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from './store/userStore';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import NavBar from './components/NavBar';
import AppRouter from './components/AppRouter';
import Footer from './components/footer/Footer';

const App = observer(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check().then(data => {
        userStore.setUser(data.user);
        userStore.setIsAuth(true);
      }).finally(() => {
        setLoading(false);
      });
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <AppRouter className="m-0" />
    </div>
  );
});

export default App;
