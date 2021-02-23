import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators, createStackNavigator
} from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import HistoryScreen from './src/screens/HistoryScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import OderScreen from './src/screens/OderScreen';
import ProfileUserScreen from './src/screens/ProfileUserScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SplashScreen from './src/screens/SplashScreen';
import { ROUTE_KEY } from './src/utils/contains';
import { FS, ptColor } from './src/utils/styles';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

function StackAuth() {
  return (
    <Stack.Navigator initialRouteName={ROUTE_KEY.LoginScreen} screenOptions={{
      headerShown: false, gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <Stack.Screen name={ROUTE_KEY.RegisterScreen} component={RegisterScreen} />
      <Stack.Screen name={ROUTE_KEY.LoginScreen} component={LoginScreen} />
    </Stack.Navigator>
  )
}

function MainNavigator() {
  const user = useSelector((state) => state?.user?.userInfo)
  console.log('user nè', user)
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false, gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      {
        user === null
          ?
          <Stack.Screen name={ROUTE_KEY.StackAuth} component={StackAuth} />
          :
          <Stack.Screen name={ROUTE_KEY.TabNavigator} component={TabNavigator} />
      }
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName={ROUTE_KEY.HomeScreen}
      screenOptions={({ route }) => ({
        tabBarLabel: '',
        tabBarIcon: ({ focused, color, }) => {
          let iconName;
          let Iconsize;
          let type;
          let sub;
          if (route.name === ROUTE_KEY.HomeScreen) {
            iconName = 'home'
            Iconsize = focused ? FS(27) : FS(20)
            type = 'feather'
            sub = focused ? true : false
          } else if (route.name === ROUTE_KEY.OderScreen) {
            iconName = 'heart'
            Iconsize = focused ? FS(27) : FS(20)
            type = 'feather'
            sub = focused ? true : false
          }
          else if (route.name === ROUTE_KEY.HistoryScreen) {
            iconName = 'list'
            Iconsize = focused ? FS(27) : FS(20)
            type = 'feather'
            sub = focused ? true : false
          }
          else if (route.name === ROUTE_KEY.ProfileUserScreen) {
            iconName = 'user'
            Iconsize = focused ? FS(27) : FS(20)
            type = 'feather'
            sub = focused ? true : false
          }
          return <Icon style={{ 
            // borderTopWidth: sub === true ? 3 : 0, borderColor: sub === true ? ptColor.white : '',
           padding: FS(20) }} type={type} name={iconName} size={Iconsize} color={color} />;
        },

      })}
      tabBarOptions={{
        activeTintColor: ptColor.greenSuccess,
        inactiveTintColor: ptColor.white,
        style: {
          alignItems: 'center',
          justifyContent: 'center',
          padding: FS(10),
          backgroundColor: ptColor.black,
          height: 60
        },
      }}
    >
      <Tab.Screen name={ROUTE_KEY.HomeScreen} component={HomeScreen} />
      <Tab.Screen name={ROUTE_KEY.OderScreen} component={OderScreen} />
      <Tab.Screen name={ROUTE_KEY.HistoryScreen} component={HistoryScreen} />
      <Tab.Screen name={ROUTE_KEY.ProfileUserScreen} component={ProfileUserScreen} />
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  const backAction = () => {
    Alert.alert("Thông báo!", "Bạn có muốn thoát ứng dụng không", [
      {
        text: "Không",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Đồng ý", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  return (
    <Stack.Navigator initialRouteName={ROUTE_KEY.SplashScreen}
      screenOptions={{
        headerShown: false,
         gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={ROUTE_KEY.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={ROUTE_KEY.MainNavigator} component={MainNavigator} />
    </Stack.Navigator>
  )
}

export default AppNavigator
