import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Easing } from 'react-native-reanimated';
import RNTrackPlayer from 'react-native-track-player';
import { usePlayerContext } from '../contexts/PlayerContext';
import { imagePath } from '../utils/imagePath';
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH, WIDTH_SCALE_RATIO } from '../utils/styles';
import { myAlert } from './MyAlert';
import MyTouchableOpacity from './MyTouchableOpacity';
import PRow from './PRow';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_KEY } from '../utils/contains';
import { ListMusic } from '../services/data'
import MySpinner from './MySpinner';


interface Props {
    isModal?: any
}

const MiniPlayer = (props: Props) => {
    const playerContext = usePlayerContext();
    // const [trackObject, settrackObject] = useState(Object)
    // const [delay, setdelay] = useState(0)
    // const isModal = React.createRef()
    const spinValue = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()
    // const data = async () => {
    //     const trackId = await RNTrackPlayer.getCurrentTrack();
    //     const GettrackObject = await RNTrackPlayer.getTrack(trackId);
    //     console.log('MiniPlayer', JSON.stringify(GettrackObject, null, 2))
    //     settrackObject(GettrackObject)
    // }
    useEffect(() => {
        spin()
            // data()
        // return () => {
        //   trackObject
        // }
    }, [])


    const spin = () => {
        spinValue.setValue(0)
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 30000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(() => spin())
    }
    const spinM = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const setTimeAddFavorite = () => {
        MySpinner.show()
        setTimeout(() => {
            MySpinner.hide()
            myAlert('Thông báo',
                'Thêm bài hát vào danh sách yêu thích thành công',
                'Đóng'
            )
        }, 3000);
    }
    const addFavoriteMusic = () => {
        myAlert(
            '',
            'Có muốn thêm bài hát này vào danh sách yêu thích không ?',
            'Trở lại',
            () => { },
            'Đồng ý',
            () => setTimeAddFavorite()
        )
    }


    if (playerContext.isEmpty || !playerContext.currentTrack) {
        return null;
    }

    return (
        <LinearGradient
            colors={['#282828', '#282828', '#282828']} style={{
                height: 60 * HEIGHT_SCALE_RATIO,
                width: WIDTH,
                backgroundColor: ptColor.white,
                flexDirection: 'row',
                padding: 20 * HEIGHT_SCALE_RATIO,
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
            <MyTouchableOpacity
                onPress={() => navigation.navigate(ROUTE_KEY.PlayMusic)}
                style={{
                    flexDirection: 'row',
                }}>
                <Animated.Image source={{ uri: playerContext.currentTrack?.artwork }}
                    style={{
                        height: 45 * HEIGHT_SCALE_RATIO,
                        width: 45 * WIDTH_SCALE_RATIO,
                        borderRadius: 45 * HEIGHT_SCALE_RATIO,
                        backgroundColor: ptColor.blue,
                        transform: [{ rotate: spinM }],
                    }}></Animated.Image>
                <View>
                    <Text style={[style.textCaption,
                    {
                        color: ptColor.white,
                        fontSize: FS(12),
                        marginLeft: 10 * HEIGHT_SCALE_RATIO
                    }]}>{playerContext.currentTrack?.title}</Text>
                    <Text style={[style.textSubTitle,
                    {
                        color: ptColor.white,
                        fontSize: FS(9),
                        marginLeft: 10 * HEIGHT_SCALE_RATIO
                    }]}>{playerContext.currentTrack?.artist}</Text>
                </View>
            </MyTouchableOpacity>
            <PRow style={{
                justifyContent: 'space-around'
            }}>
                <MyTouchableOpacity
                    style={{
                        marginHorizontal: 7 * WIDTH_SCALE_RATIO
                    }}
                    onPress={() => addFavoriteMusic()}>
                    <Icon
                        name='heart'
                        type='feather'
                        color={ptColor.white}
                    />
                </MyTouchableOpacity>
                <MyTouchableOpacity
                    style={{
                        marginHorizontal: 7 * WIDTH_SCALE_RATIO
                    }}
                    onPress={() => playerContext.isPlaying ? playerContext.pause() : RNTrackPlayer.play()}>
                    <Icon
                        name={playerContext.isPlaying ? 'pause' : 'play'}
                        type='feather'
                        color={ptColor.white}
                    />
                </MyTouchableOpacity>
            </PRow>

        </LinearGradient>
    )


}

export default MiniPlayer
