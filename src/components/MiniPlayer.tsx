import React, { useState, useRef, useEffect } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import RNTrackPlayer from 'react-native-track-player';
import { imagePath } from '../utils/imagePath';
import { usePlayerContext } from '../contexts/PlayerContext';
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH, WIDTH_SCALE_RATIO } from '../utils/styles';
import ModalPlayMusic from './ModalPlayMusic';
import MyTouchableOpacity from './MyTouchableOpacity';
import PRow from './PRow';
import { Easing } from 'react-native-reanimated';
import { myAlert } from './MyAlert';
interface Props {
    isModal?: any
}

const MiniPlayer = (props: Props) => {
    const playerContext = usePlayerContext();
    const [trackObject, settrackObject] = useState({})
    const [delay, setdelay] = useState(0)
    const isModal = React.createRef()
    const spinValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        spin()
    }, [])
    const spin = () => {
        spinValue.setValue(0)
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 30000,
                easing: Easing.linear
            }
        ).start(() => spin())
    }
    const spinM = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const addFavoriteMusic = () => {
        myAlert(
            '',
            'Có muốn thêm bài hát này vào danh sách yêu thích không ?',
            'Trở lại',
            () => { },
            'Đồng ý',
            () => console.log('Thêm')
        )
    }


    if (playerContext.isEmpty || playerContext?.currentTrack) {
        // console.log('playerContext', JSON.stringify(playerContext, null, 2))
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
                    onPress={() => isModal.current?.show()}
                    style={{
                        flexDirection: 'row',
                    }}>
                    <Animated.Image source={imagePath.mtp01}
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
                        }]}>{playerContext?.currentTrack?.title}</Text>
                        <Text style={[style.textSubTitle,
                        {
                            color: ptColor.white,
                            fontSize: FS(9),
                            marginLeft: 10 * HEIGHT_SCALE_RATIO
                        }]}>{playerContext?.currentTrack?.artist}</Text>
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
                    <MyTouchableOpacity
                        style={{
                            marginHorizontal: 7 * WIDTH_SCALE_RATIO
                        }}
                        onPress={() => playerContext.isPlaying ? playerContext.pause() : RNTrackPlayer.play()}>
                        <Icon
                            name='skip-forward'
                            type='feather'
                            color={ptColor.white}
                        />
                    </MyTouchableOpacity>
                </PRow>

                <ModalPlayMusic ref={isModal}></ModalPlayMusic>
            </LinearGradient>
        )
    } else {
        return null
    }

}

export default MiniPlayer
