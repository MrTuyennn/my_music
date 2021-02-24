import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './AppNavigator';
import { ThemeProvider } from 'react-native-elements';
import configureStore from './src/states';
import MySpinner from './src/components/MySpinner'
const { store, persistor } = configureStore();
import { navigationRef } from './RootNavigation';
import TrackPlayer from 'react-native-track-player';
import trackPlayerServices from './src/services/trackPlayerServices';
const theme = {
  Button: {
    buttonStyle: {
      height: 54,
    },
  },
};
const track = {
  id: 'unique track id', // Must be a string, required
  url: 'http://example.com/avaritia.mp3', // Load media from the network
  title: 'Avaritia',
  artist: 'deadmau5',
  album: 'while(1<2)',
  genre: 'Progressive House, Electro House',
  date: '2014-05-20T07:00:00+00:00', // RFC 3339
  artwork: 'http://example.com/avaritia.png', // Load artwork from the network
  // id: 'trackId',
  // url: require('track.mp3'),
  // title: 'Track Title',
  // artist: 'Track Artist',
  // artwork: require('track.png')
};
const App = () => {
  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        console.log('setup Tracker')
      });
      await TrackPlayer.registerPlaybackService(() => trackPlayerServices)
      await TrackPlayer.add([track])
      await TrackPlayer.play()
      setTimeout(() => {
         TrackPlayer.stop()
      },5000)
    })();
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <NavigationContainer ref={navigationRef}>
            <AppNavigator />
            <MySpinner />
            <FlashMessage position="top" floating={true} />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
