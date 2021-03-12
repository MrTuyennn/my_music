import React from 'react'
import { View, Text, Image } from 'react-native';
import { HEIGHT_SCALE_RATIO, WIDTH, ptColor, style, WIDTH_SCALE_RATIO, FS } from '../utils/styles';
import { Icon } from 'react-native-elements'
import MyTouchableOpacity from './MyTouchableOpacity';
import { imagePath } from '../utils/imagePath';
import LinearGradient from 'react-native-linear-gradient';
import { usePlayerContext } from '../contexts/PlayerContext'
interface Props {

}

const MiniPlayer = (props: Props) => {
    const playerContext = usePlayerContext();

    if (playerContext.isEmpty || !playerContext.currentTrack) {
        return null;
    }
    return (
        <LinearGradient
            colors={['#006633', '#009999', '#00FFCC']} style={{
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
                <Image source={imagePath.mtp01} style={{
                    height: 45 * HEIGHT_SCALE_RATIO,
                    width: 45 * WIDTH_SCALE_RATIO,
                    borderRadius: 45 * HEIGHT_SCALE_RATIO,
                    backgroundColor: ptColor.blue,
                }}></Image>
                <View>
                    <Text style={[style.textCaption,
                    {
                        color: ptColor.white,
                        fontSize: FS(12),
                        marginLeft: 10 * HEIGHT_SCALE_RATIO
                    }]}>Chúng ta của hiện tại</Text>
                    <Text style={[style.textSubTitle,
                    {
                        color: ptColor.white,
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
                    color={ptColor.white}
                />
            </MyTouchableOpacity>
        </LinearGradient>
    )
}

export default MiniPlayer
