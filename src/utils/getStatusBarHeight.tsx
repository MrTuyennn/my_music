import { Dimensions, Platform, StatusBar } from 'react-native';

const paddingTop = 8;
const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let isIPhoneX_v = false;
let isIPhoneXMax_v = false;
let isIPhoneWithMonobrow_v = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
  if (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhoneX_v = true;
  }

  if (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT) {
    isIPhoneWithMonobrow_v = true;
    isIPhoneXMax_v = true;
  }
}

export const isIPhoneX = () => isIPhoneX_v;
export const isIPhoneXMax = () => isIPhoneXMax_v;
export const isIPhoneWithMonobrow = () => isIPhoneWithMonobrow_v;

export function getStatusBarHeight() {
  if(Platform.OS == "android")
  {
   // StatusBar.setTranslucent(true);
   // StatusBar.setBackgroundColor('rgba(0,0,0,0)');
  }
  return Platform.select({
    ios: isIPhoneWithMonobrow_v ? 44 + paddingTop : 20 + paddingTop,
    android: StatusBar.currentHeight ? StatusBar.currentHeight + paddingTop : 0,
    default: 0,
  });
}
