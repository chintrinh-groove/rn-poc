import React, {useState, useLayoutEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import {PRIMARY_COLOR} from '../../constants';

export const MyFlatList = ({url}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    fetchData(page);
  }, []);

  const fetchData = async nextPage => {
    setTimeout(async () => {
      try {
        const urlSearchParams = new URLSearchParams({
          _limit: 5,
          ...(nextPage ? {_page: nextPage} : {}),
        });
        const res = await fetch(url + urlSearchParams);
        const json = await res.json();
        if (nextPage === 1) {
          setData(json);
        } else {
          setData(prevState => prevState.concat(json));
          //   console.log(JSON.stringify(json, null, 2));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, 1000);
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loading) return null;
    return (
      <View
        style={{
          height: 150 + 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator color={PRIMARY_COLOR} />
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevState => prevState + 1);
      //   console.log(page + 1);
      setLoading(true);
      fetchData(page + 1); // method for API call
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setPage(1);
    fetchData(1);
  }, []);

  if (loading && page === 1) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator color={PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            style={{marginVertical: 8, flexDirection: 'row'}}
            onPress={() => {}}>
            <View style={{flexDirection: 'row'}}>
              <Text>{item.id + ''}</Text>
              <Image
                style={{width: 200, height: 200}}
                source={{uri: item.thumbnailUrl}}
              />
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.5}
      onEndReached={handleLoadMore}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={PRIMARY_COLOR}
        />
      }
    />
  );
};
