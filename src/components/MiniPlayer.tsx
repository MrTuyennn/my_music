import React from 'react'
import { View, Text } from 'react-native'
import { HEIGHT_SCALE_RATIO, WIDTH, ptColor, style, WIDTH_SCALE_RATIO, FS } from '../utils/styles';
import { Icon } from 'react-native-elements'
import MyTouchableOpacity from './MyTouchableOpacity';

interface Props {

}

const MiniPlayer = (props: Props) => {
    return (
        <View style={{
            height: 60 * HEIGHT_SCALE_RATIO,
            width: WIDTH,
            backgroundColor: ptColor.white,
            flexDirection: 'row',
            padding: 20 * HEIGHT_SCALE_RATIO,
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
                <View style={{
                    height: 45 * HEIGHT_SCALE_RATIO,
                    width: 45 * WIDTH_SCALE_RATIO,
                    borderRadius: 10 * HEIGHT_SCALE_RATIO,
                    backgroundColor: ptColor.blue,
                }}></View>
                <View>
                    <Text style={[style.textCaption,
                    {
                        color: ptColor.black,
                        fontSize: FS(12),
                        marginLeft: 10 * HEIGHT_SCALE_RATIO
                    }]}>Chúng ta của hiện tại</Text>
                    <Text style={[style.textSubTitle,
                    {
                        color: ptColor.black,
                        fontSize: FS(9),
                        marginLeft: 10 * HEIGHT_SCALE_RATIO
                    }]}>Sơn Tùng MTP</Text>
                </View>
            </View>
            <MyTouchableOpacity style={{

            }}>
                <Icon
                    name='play'
                    type='feather'
                    color={ptColor.black}
                />
            </MyTouchableOpacity>
        </View>
    )
}

export default MiniPlayer
