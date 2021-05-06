import React, {createContext, useContext, useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

const NetInfoContext = createContext();

export const NetInfoProvider = ({children}) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setConnected(state.isConnected);
    });

    // Unsubscribe
    unsubscribe();
  }, []);

  return (
    <NetInfoContext.Provider value={{connected}}>
      {children}
    </NetInfoContext.Provider>
  );
};

export const useNetInfo = () => useContext(NetInfoContext);
