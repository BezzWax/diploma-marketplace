import React, { createContext, useContext } from 'react';
import DeviceStore from './DeviceStore';

const DeviceStoreContext = createContext();

export const useDeviceStore = () => {
  const context = useContext(DeviceStoreContext);
  if (!context) {
    throw new Error('useDeviceStore must be used within a DeviceStoreProvider');
  }
  return context;
};

const DeviceStoreProvider = ({ children }) => {
  const deviceStore = new DeviceStore();

  return (
    <DeviceStoreContext.Provider value={{ device: deviceStore }}>
      {children}
    </DeviceStoreContext.Provider>
  );
};

export { DeviceStoreProvider, DeviceStoreContext };
