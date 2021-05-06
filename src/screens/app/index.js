import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useNetInfo} from '../../context';
import {MyButton} from '../../components';

import {styles} from './styles';

export const AppScreen = () => {
  const {connected} = useNetInfo();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    connected && fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    setUsers(data);
  };

  const refresh = () => {
    connected && fetchUser();
  };

  if (!connected) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.noInternetContainer}>
          <Text style={styles.title}>No internet connection</Text>
          <Text style={styles.description}>
            Check your connection, then refresh the page.
          </Text>
          <View style={styles.buttonContainer}>
            <MyButton title="Refresh" onPress={refresh} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.username}</Text>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
