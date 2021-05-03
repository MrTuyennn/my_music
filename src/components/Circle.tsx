import React from 'react';
import { View } from 'react-native';
import { HEIGHT_SCALE_RATIO, ptColor } from '../utils/styles';

export default function Circle(props: { style, children?: React.ReactNode }) {
    return (
        <View style={[props.style, {
            height: 50 * HEIGHT_SCALE_RATIO,
            width: 50 * HEIGHT_SCALE_RATIO,
            borderRadius: 50 * HEIGHT_SCALE_RATIO,
            backgroundColor: ptColor.greenSuccess,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5 * HEIGHT_SCALE_RATIO,
            elevation: 10 * HEIGHT_SCALE_RATIO,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
        }]}>
            {props.children}
        </View>
    );
}
