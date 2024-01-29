
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { UserStoreContext } from '../store/userStore';
import { useContext } from 'react';

import Shop from '../pages/Shop';
import Basket from '../pages/Basket';
import Auth from '../pages/Auth';
import DevicePage from '../pages/DevicePage';
import Admin from '../pages/Admin';

const AppRouter = observer(() => {
    const userStore = useContext(UserStoreContext);

    return (
        <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/login' element={<Auth />} />
            <Route path='/registration' element={<Auth />} />

            {userStore.isAuth && (
                <>
                    <Route path='/basket' element={<Basket />} />
                    <Route path='/device' element={<DevicePage />} />
                    <Route path='/admin' element={<Admin />} />
                </>
            )}

            <Route path='*' element={<Shop />} />
        </Routes>
    );
});

export default AppRouter;
