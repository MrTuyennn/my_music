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
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        ],
        jumpInterval: 30,
      });

      // setIsReady(true);
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <ThemeProvider theme={theme}>
          <PlayerContextProvider>
            <NavigationContainer ref={navigationRef}>

              <AppNavigator />
              <MySpinner />
              <ModalAlert />
              <ModalPlayMusic />
              <FlashMessage position="top" floating={true} />

            </NavigationContainer>
          </PlayerContextProvider>
        </ThemeProvider>

      </PersistGate>
    </Provider>
  );
};

export default App;
