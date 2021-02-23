import { iconSize, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
import React, { useEffect } from 'react';
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { getStatusBarHeight } from '../utils/getStatusBarHeight';

export interface BaseHeaderProperties {
  resizeMode?: any;
  isSearch?: any;
  btnRightStyle2?: StyleProp<ViewStyle>;
  children?: any;
  leftIcon?: string;
  leftIconType?: string;
  leftIconStyle?: StyleProp<ViewStyle>;
  onLeftPress?: () => void;

  rightIcon?: string;
  rightIconType?: string;
  rightIconStyle?: StyleProp<ViewStyle>;
  onRightPress?: () => void;
  btnRightDisabled?: any;
  btnRightStyle?: any;
  btnLeftStyle?: any;

  rightIcon2?: any;
  rightIconType2?: any;
  onRightPress2?: any;
  btnRightDisabled2?: any;
  rightIconStyle2?: any;

  styleContent?: StyleProp<ViewStyle>;
  noShadow?: Boolean;
}

function BaseHeader(props: BaseHeaderProperties) {
  let onLeftPressTimeout: number = 0;
  let onRightPressTimeout: number = 0;
  let onRightPressTimeout2: number = 0;

  useEffect(() => {
    return () => {
      clearTimeout(onLeftPressTimeout);
      clearTimeout(onRightPressTimeout);
      clearTimeout(onRightPressTimeout2);
    };
  });

  function renderIcon(type: string | undefined, icon: any, styles: any) {
    if (type === 'Ionicons') {
      return (
        <Ionicons
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={styles}
          color={ptColor.white}
        />
      );
    }
    if (type === 'MaterialIcons') {
      return (
        <MaterialIcons
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={styles}
          color={ptColor.white}
        />
      );
    }
    if (type === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={styles}
          color={ptColor.white}
        />
      );
    }
    if (type === 'Feather') {
      return (
        <Feather
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={styles}
          color={ptColor.white}
        />
      );
    }
    if (type === 'Entypo') {
      return (
        <Entypo
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={styles}
          color={ptColor.white}
        />
      );
    }
    if (type === 'SimpleLineIcons') {
      return (
        <SimpleLineIcons
          name={icon}
          size={(styles && styles.width) || iconSize}
          style={styles}
          color={ptColor.white}
        />
      );
    }
    if (type === 'Image') {
      return (
        <View
          style={[
            styles?.padding ? { padding: styles?.padding } : { padding: 4 },
            styles?.borderRadius
              ? { borderRadius: styles?.borderRadius }
              : null,
            styles?.backgroundColor
              ? { backgroundColor: styles?.backgroundColor }
              : null,
            { alignItems: 'center', justifyContent: 'center' },
          ]}>
          <Image
            source={icon}
            style={[
              {
                width: iconSize - 6 * WIDTH_SCALE_RATIO,
                height: iconSize - 6 * WIDTH_SCALE_RATIO,
              },
              styles,
              { backgroundColor: 'transparent' },
            ]}
            resizeMode={props.resizeMode ? props.resizeMode : 'contain'}
          />
        </View>
      );
    }
    return <View style={{ width: iconSize, height: iconSize }} />;
  }
  const {
    children,
    leftIcon,
    leftIconType,
    onLeftPress,

    rightIcon,
    rightIconType,
    onRightPress,
    leftIconStyle,
    rightIconStyle,
    btnRightDisabled,
    btnRightStyle,
    btnLeftStyle,

    rightIcon2,
    rightIconType2,
    onRightPress2,
    btnRightDisabled2,
    rightIconStyle2,
    btnRightStyle2,

    styleContent,
    noShadow,
  } = props;
  if (props.isSearch) {
    return (
      <View
        style={
          [
            style.header,
            styleContent,
            noShadow ? { shadowOpacity: 0, shadowRadius: 0, elevation: 0 } : {},
          ] as ViewStyle
        }>
        {children}
      </View>
    );
  }
  return (
    <View
      style={
        [
          { marginTop: getStatusBarHeight() },
          style.header,
          styleContent,
          noShadow ? { shadowOpacity: 0, shadowRadius: 0, elevation: 0 } : {},
        ] as ViewStyle
      }>
      {leftIcon ? (
        <TouchableOpacity
          onPress={() => {
            onLeftPressTimeout = setTimeout(() => {
              if (onLeftPress) {
                onLeftPress();
              }
            }, 0);
          }}
          style={[
            {
              paddingHorizontal: 13 * WIDTH_SCALE_RATIO,
              paddingLeft: 16 * WIDTH_SCALE_RATIO,
            },
            btnLeftStyle,
          ]}>
          {renderIcon(leftIconType, leftIcon, leftIconStyle)}
        </TouchableOpacity>
      ) : (
        <View
          style={{
            paddingHorizontal: 13 * WIDTH_SCALE_RATIO,
            paddingLeft: 16 * WIDTH_SCALE_RATIO,
          }}>
          <Feather name="chevron-left" size={iconSize} color="transparent" />
        </View>
      )}

      <View style={{ flex: 1 }}>{children}</View>

      {rightIcon || rightIcon || rightIcon2 ? null : (
        <View style={{ paddingHorizontal: 13 * WIDTH_SCALE_RATIO }}>
          <Feather name="arrow-right" size={iconSize} color="transparent" />
        </View>
      )}

      {rightIcon && (
        <TouchableOpacity
          disabled={btnRightDisabled}
          onPress={() => {
            onRightPressTimeout = setTimeout(() => {
              if (onRightPress) {
                onRightPress();
              }
            }, 0);
          }}
          style={[
            { paddingHorizontal: 13 * WIDTH_SCALE_RATIO },
            btnRightStyle,
          ]}>
          {renderIcon(rightIconType, rightIcon, rightIconStyle)}
        </TouchableOpacity>
      )}

      {rightIcon2 ? (
        <TouchableOpacity
          disabled={btnRightDisabled2}
          onPress={() => {
            onRightPressTimeout2 = setTimeout(() => {
              if (onRightPress2) {
                onRightPress2();
              }
            }, 0);
          }}
          style={[
            { paddingHorizontal: 13 * WIDTH_SCALE_RATIO },
            btnRightStyle2,
          ]}>
          {renderIcon(rightIconType2, rightIcon2, rightIconStyle2)}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default BaseHeader;
