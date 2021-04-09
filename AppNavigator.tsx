import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators, createStackNavigator
} from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Alert, BackHandler, Image } from 'react-native';
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
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from './src/utils/styles';
import MiniPlayer from './src/components/MiniPlayer'
import PlayMusic from './src/screens/PlayMusic'
import CategoryMusic from './src/screens/CategoryMusic'
import { imagePath } from './src/utils/imagePath';
import Broswer from './src/screens/Broswer';
import ProfileArtist from './src/screens/ProfileArtist'
import MusicDetail from './src/screens/MusicDetail'
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
          <Stack.Screen name={ROUTE_KEY.StackMusic} component={StackMusic} />
      }
    </Stack.Navigator>
  )
}

function StackMusic() {
  return (
    <Stack.Navigator initialRouteName={ROUTE_KEY.TabNavigator} screenOptions={{
      headerShown: false, gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <Stack.Screen name={ROUTE_KEY.PlayMusic} component={PlayMusic} />
      <Stack.Screen name={ROUTE_KEY.CategoryMusic} component={CategoryMusic} />
      <Stack.Screen name={ROUTE_KEY.Broswer} component={Broswer} />
      <Stack.Screen name={ROUTE_KEY.ProfileArtist} component={ProfileArtist} />
      <Stack.Screen name={ROUTE_KEY.MusicDetail} component={MusicDetail} />
      <Stack.Screen name={ROUTE_KEY.TabNavigator} component={TabNavigator} />
    </Stack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName={ROUTE_KEY.HomeScreen}
      tabBar={(tabsProps) => (
        <>
          <MiniPlayer />
          <BottomTabBar {...tabsProps} />
        </>
      )}
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
            iconName = 'search'
            Iconsize = focused ? FS(27) : FS(20)
            type = 'feather'
            sub = focused ? true : false
          }
          else if (route.name === ROUTE_KEY.HistoryScreen) {
            iconName = 'layout'
            Iconsize = focused ? FS(27) : FS(20)
            type = 'feather'
            sub = focused ? true : false
          }
          else if (route.name === ROUTE_KEY.ProfileUserScreen) {
            // iconName = 'user'
            // Iconsize = focused ? FS(27) : FS(20)
            // type = 'feather'
            // sub = focused ? true : false
            return (<Image
              source={imagePath.Logo}
              style={{
                tintColor: focused ? ptColor.greenSuccess : ptColor.gray6,
                height: focused ? 22 * HEIGHT_SCALE_RATIO : 17 * HEIGHT_SCALE_RATIO,
                width: focused ? 25 * HEIGHT_SCALE_RATIO : 20 * HEIGHT_SCALE_RATIO
              }}
            />)
          }
          return <Icon style={{
            // borderTopWidth: sub === true ? 3 : 0, borderColor: sub === true ? ptColor.white : '',
            padding: FS(20)
          }} type={type} name={iconName} size={Iconsize} color={color} />;
        },

      })}
      tabBarOptions={{
        activeTintColor: ptColor.white,
        inactiveTintColor: ptColor.gray2,
        style: {
          alignItems: 'center',
          justifyContent: 'center',
          padding: FS(10),
          backgroundColor: ptColor.colorTabar,
          height: 60
        },
      }}
    >
      <Tab.Screen options={{
        tabBarLabel: 'Trang chủ'
      }} name={ROUTE_KEY.HomeScreen} component={HomeScreen} />
      <Tab.Screen options={{
        tabBarLabel: 'Tìm kiếm'
      }} name={ROUTE_KEY.OderScreen} component={HistoryScreen} />
      <Tab.Screen
        options={{
          tabBarLabel: 'Thư viện'
        }} name={ROUTE_KEY.HistoryScreen} component={OderScreen} />
      <Tab.Screen options={{
        tabBarLabel: 'Tài khoản'
      }} name={ROUTE_KEY.ProfileUserScreen} component={ProfileUserScreen} />
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
