import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'react-native-elements';
import FlashMessage from 'react-native-flash-message';
import TrackPlayer from 'react-native-track-player';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './AppNavigator';
import { navigationRef } from './RootNavigation';
import ModalAlert from './src/components/ModalAlert';
import MySpinner from './src/components/MySpinner';
import { PlayerContextProvider } from './src/contexts/PlayerContext';
import ModalPlayMusic from './src/components/ModalPlayMusic'
import configureStore from './src/states';
import { Platform } from 'react-native';
import { imagePath } from './src/utils/imagePath';
import { MenuProvider } from 'react-native-popup-menu';
const { store, persistor } = configureStore();
const theme = {
  Button: {
    buttonStyle: {
      height: 54,
    },
  },
};
console.disableYellowBox = true;
const App = () => {
  useEffect(() => {
    // TrackPlayer.setupPlayer().then(() => {
    //   console.log('setup Tracker')
    //   TrackPlayer.registerPlaybackService(() => trackPlayerServices)
    // });
    TrackPlayer.setupPlayer().then(() => {
      console.log('player is setup');
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
        jumpInterval: 30,
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE
        ],

        // Icons for the notification on Android (if you don't like the default ones)
        // pauseIcon: require('./pause-icon.png'),
        // stopIcon: require('./stop-icon.png'),
        // previousIcon: require('./previous-icon.png'),
        // nextIcon: require('./next-icon.png'),
        icon: imagePath.music

      });


      // setIsReady(true);
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <ThemeProvider theme={theme}>
          <PlayerContextProvider>
            <MenuProvider>

              <NavigationContainer ref={navigationRef}>

                <AppNavigator />
                <MySpinner />
                <ModalAlert />
                <ModalPlayMusic />
                <FlashMessage position="top" floating={true} />

              </NavigationContainer>
            </MenuProvider>
          </PlayerContextProvider>
        </ThemeProvider>

      </PersistGate>
    </Provider>
  );
};

export default App;
