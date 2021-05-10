import React, {useState, useLayoutEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import YouTube from 'react-native-youtube';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';

import {useNetInfo} from '../../context';
import {MyButton, MyText, MyFlatList} from '../../components';
import {YOUTUBE_API_KEY} from '../../constants';

import {styles} from './styles';

export const AppScreen = () => {
  const {connected} = useNetInfo();
  const {colors} = useTheme();

  const [loading, setLoading] = useState(false);
  const [videoId, setVideoId] = useState('imFTcjHIY_s');
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [isReady, setIsReady] = useState();
  const [status, setStatus] = useState();
  const [quality, setQuality] = useState();
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    // setLoading(true);
    // connected && fetchVideos();
  }, []);

  const fetchVideos = async nextPageToken => {
    setTimeout(async () => {
      try {
        const urlSearchParams = new URLSearchParams({
          part: 'snippet',
          key: YOUTUBE_API_KEY,
          ...(nextPageToken ? {pageToken: nextPageToken} : {}),
        });
        const res = await fetch(
          'https://youtube.googleapis.com/youtube/v3/search?' + urlSearchParams,
        );
        const data = await res.json();
        // console.log(nextPageToken, data);
        if (nextPageToken) {
          setPageToken(data.nextPageToken);
          setVideos(prevState => prevState.concat(data.items));
        } else {
          console.log(JSON.stringify(data, null, 2));
          // console.log(data.items);
          setVideos(data.items);
          setPageToken(data.nextPageToken);
          // setVideoId(data.items[0].id.videoId);
          // setPageToken(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, 500);
  };

  const refreshFetch = () => {
    connected && fetchVideos();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setPageToken(null);
      connected && fetchVideos();
    }, 500);
  }, []);

  const handleLoadMore = () => {
    if (!loading) {
      setLoading(true);
      connected && fetchVideos(pageToken); // method for API call
    }
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
            <MyButton title="Refresh" onPress={refreshFetch} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

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
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <YouTube
        videoId={videoId} // The YouTube video ID
        play // control playback of video with true/false
        // fullscreen // control whether the video should play in fullscreen or inline
        // loop // control whether the video should loop when ended
        onReady={e => {
          // this.setState({isReady: true});
          setIsReady(true);
        }}
        onChangeState={e => {
          // this.setState({status: e.state});
          setStatus(e.status);
        }}
        onChangeQuality={e => {
          // this.setState({quality: e.quality});
          setQuality(e.quality);
        }}
        onError={e => {
          // this.setState({error: e.error});
          setError(e.error);
        }}
        style={styles.youtubeContainer}
      />
      {/* <MyFlatList url="https://jsonplaceholder.typicode.com/photos?" /> */}
      <FlatList
        data={videos}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.row}
              onPress={() => setVideoId(item.id.videoId)}>
              <Image
                style={{
                  width: item.snippet.thumbnails.default.width,
                  height: item.snippet.thumbnails.default.height,
                }}
                source={{uri: item.snippet.thumbnails.default.url}}
              />
              <View style={styles.contentContainer}>
                <View>
                  <MyText h5 bold numberOfLines={1}>
                    {item.snippet.title}
                  </MyText>
                  <MyText p numberOfLines={3}>
                    {item.snippet.description}
                  </MyText>
                </View>
                <MyText p numberOfLines={1}>
                  {moment(item.snippet.publishedAt).fromNow()}
                </MyText>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id.videoId}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};
