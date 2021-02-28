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
import ModalAlert from './src/components/ModalAlert';
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
    TrackPlayer.setupPlayer().then(() => {
      console.log('setup Tracker')
      TrackPlayer.registerPlaybackService(() => trackPlayerServices)
    });
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <NavigationContainer ref={navigationRef}>
            <AppNavigator />
            <MySpinner />
            <ModalAlert />
            <FlashMessage position="top" floating={true} />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
