import { FS, ptColor, style } from '../utils/styles';
// import { IMAGEPATH } from '../utils/contains';
import React from 'react';
import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import BaseHeader, { BaseHeaderProperties } from './BaseHeader';

export interface BaseHeaderAppProperties extends BaseHeaderProperties {
  navigation?: any;
  leftIconStyle?: StyleProp<ViewStyle>;
  styleTitle?: TextStyle;
  title?: string;
  color?: string;
  onlyTitle?: boolean;
  titleCenter?: boolean;
  onClickGoBack?: () => void;
}
function BaseHeaderApp(props: BaseHeaderAppProperties) {
  function onClickGoBack() {
    if (props.onClickGoBack) {
      props.onClickGoBack();
    } else {
      props.navigation.goBack();
    }
  }

  const { title, styleTitle, color, titleCenter, onlyTitle } = props;
  if (onlyTitle) {
    return (
      <BaseHeader
        children={
          <Text
            style={[
              style.textHeader,
              {
                textAlign: titleCenter ? 'center' : 'left',
                color: color || ptColor.white,
                fontWeight: '600',
                fontSize: FS(20),
              },
              styleTitle,
            ]}
            numberOfLines={1}>
            {title}
          </Text>
        }
        {...props}
      />
    );
  }
  return (
    <BaseHeader
      children={
        <Text
          style={[
            style.textHeader,
            {
              textAlign: titleCenter ? 'center' : 'left',
              color: color || ptColor.white,
              fontWeight: '600',
              fontSize: FS(20),
            },
            styleTitle,
          ]}
          numberOfLines={1}>
          {title}
        </Text>
      }
      leftIconType="Image"
    //   leftIcon={IMAGEPATH.ic_back}
      leftIconStyle={[
        {
          tintColor: color || ptColor.white,
        },
        props.leftIconStyle,
      ]}
      onLeftPress={onClickGoBack}
      {...props}
    />
  );
}
BaseHeaderApp.defaultProps = {
  titleCenter: true,
};
export default BaseHeaderApp;
