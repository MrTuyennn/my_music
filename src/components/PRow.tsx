import React from 'react';
import { View, ViewStyle } from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';

export default function PRow(props: {
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
}) {
  if (props.onPress) {
    return (
      <MyTouchableOpacity
        onPress={props.onPress}
        {...props}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
          props.style || {},
        ]}>
        {props.children}
      </MyTouchableOpacity>
    );
  }
  return (
    <View
      {...props}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        props.style || {},
      ]}>
      {props.children}
    </View>
  );
}
