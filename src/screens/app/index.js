import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import YouTube from 'react-native-youtube';
import moment from 'moment';

import {useNetInfo} from '../../context';
import {MyButton, MyText, MyFlatList} from '../../components';
import {YOUTUBE_API_KEY} from '../../constants';

import {styles} from './styles';

export const AppScreen = () => {
  const {connected} = useNetInfo();

  const [videoId, setVideoId] = useState('imFTcjHIY_s');
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [isReady, setIsReady] = useState();
  const [status, setStatus] = useState();
  const [quality, setQuality] = useState();
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // connected && fetchVideos();
  }, []);

  const fetchVideos = async nextPageToken => {
    const urlSearchParams = new URLSearchParams({
      part: 'snippet',
      key: YOUTUBE_API_KEY,
      ...(nextPageToken ? {pageToken: nextPageToken} : {}),
    });
    const res = await fetch(
      'https://youtube.googleapis.com/youtube/v3/search?' + urlSearchParams,
    );
    const data = await res.json();
    !nextPageToken && setVideoId(data.items[0].id.videoId);
    setPageToken(data.nextPageToken);
    setVideos(data.items);
    // console.log(JSON.stringify(data, null, 2));
  };

  const refreshFetch = () => {
    connected && fetchVideos();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};
