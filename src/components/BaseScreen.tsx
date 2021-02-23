import React from 'react'
import { View, Text, ViewStyle } from 'react-native'
import { ptColor } from '../utils/styles';
import LinearGradient from 'react-native-linear-gradient';
import BaseHeaderApp, { BaseHeaderProperties } from './BaseHeaderApp'
import { SafeAreaView } from 'react-native-safe-area-context';

const BaseScreen = (props: {
    showAppBar?: boolean;
    children?: React.ReactNode;
    appBar?: BaseHeaderProperties;
    style?: ViewStyle;
    navigation: any;
}) => {
    return (
            <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={ptColor.lineGradientBlue}
            style={[{ flex: 1 } as ViewStyle, props.style]}>
            <BaseHeaderApp {...props.appBar}></BaseHeaderApp>
            {props.children}
        </LinearGradient>        
    )
}

export default BaseScreen
