import React, {createContext, useContext, useState, useEffect} from 'react';
import NetInfo, {
  useNetInfo as useRNNetInfo,
} from '@react-native-community/netinfo';

const NetInfoContext = createContext();

export const NetInfoProvider = ({children}) => {
  const netInfo = useRNNetInfo();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setConnected(state.isConnected);
    });

    // Unsubscribe
    unsubscribe();
  }, [netInfo.isConnected]);

  return (
    <NetInfoContext.Provider value={{connected}}>
      {children}
    </NetInfoContext.Provider>
  );
};

export const useNetInfo = () => useContext(NetInfoContext);
