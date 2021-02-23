import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './AppNavigator';
import { ThemeProvider } from 'react-native-elements';
import configureStore from './src/states';
import MySpinner from './src/components/MySpinner'
const { store, persistor } = configureStore();
import { navigationRef } from './RootNavigation';
const theme = {
  Button: {
    buttonStyle: {
      height: 54,
    },
  },
};
const App = () => {
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
