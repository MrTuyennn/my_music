import React from 'react'
import { ViewStyle, View, TouchableOpacity } from 'react-native'

interface MyTouchableOpacityProps {
    onPress?: () => void;
    style?: ViewStyle;
    children?: React.ReactNode;
}

const MyTouchableOpacity = (props: MyTouchableOpacityProps) => {
    if (props.onPress) {
        return (
            <TouchableOpacity onPress={props.onPress}
                {...props} style={props.style}>
                {props.children}
            </TouchableOpacity>
        )
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

export default MyTouchableOpacity
