import React, { useRef, useState, useEffect } from 'react'
import { ActivityIndicator, Alert, Animated, Easing, Share, Text, View, ViewStyle } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import RNTrackPlayer from 'react-native-track-player';
import { connect } from 'react-redux';
import Circle from '../components/Circle';
import { myAlert } from '../components/MyAlert';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import ProgressSlider from '../components/ProgressSlider';
import PRow from '../components/PRow';
import { usePlayerContext } from '../contexts/PlayerContext';
import { ROUTE_KEY } from '../utils/contains';
import {
    FS,
    HEIGHT,
    HEIGHT_SCALE_RATIO,
    ptColor,
    style,
    WIDTH_SCALE_RATIO
} from '../utils/styles';
import { ListMusic } from '../services/data'
import { useSelector } from 'react-redux'
import MySpinner from '../components/MySpinner';
interface Props {
    navigation?: any
    route?: any
}

const PlayMusic = (props: Props) => {
    const counter = useSelector(state => state.musics?.dataMusic)
    const spinValue = useRef(new Animated.Value(0)).current;
    const [visible, setvisible] = useState(false)
    const [trackObject, settrackObject] = useState(Object)
    const [playMusic, setplayMusic] = useState(true)
    const playerContext = usePlayerContext()
    const [listMusic, setlistMusic] = useState(counter)
    console.log('listMusic', listMusic)
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
    useEffect(() => {
        spin();
        show();
    }, [counter])
    const seekTo = async (amount = 30) => {
        const position = await RNTrackPlayer.getPosition();
        await RNTrackPlayer.seekTo(position + amount);
    };

    const goTo = async (amount: number) => {
        const position = await RNTrackPlayer.getPosition();
        await RNTrackPlayer.seekTo(position - amount);
    };

    const show = async () => {
        console.log('chạy')
        setvisible(true);
        const position = await RNTrackPlayer.getPosition();
        var minutes = Math.floor(position / 60)
        const duration = await RNTrackPlayer.getDuration();
        var minutesw = Math.floor(duration / 60)
        const trackId = await RNTrackPlayer.getCurrentTrack();
        const trackObject = await RNTrackPlayer.getTrack(trackId);
        console.log('trackObject', JSON.stringify(trackObject))
        settrackObject(trackObject)

    }


    const nextMusic = async () => {
        var GettrackObject = {}

        await listMusic.forEach(async function (item, index, value) {
            const trackId = await RNTrackPlayer.getCurrentTrack();
            const trackObject = await RNTrackPlayer.getTrack(trackId);
            if (listMusic[index + 1] === undefined) {
                await RNTrackPlayer.reset()
                await RNTrackPlayer.add(listMusic[0])
                await RNTrackPlayer.play()
                // playerContext.play(ListMusic[0])
                const trackId = await RNTrackPlayer.getCurrentTrack();
                GettrackObject = await RNTrackPlayer.getTrack(trackId);
            } else if (item?.id === parseInt(trackObject?.id)) {
                // await RNTrackPlayer.reset()
                // await RNTrackPlayer.add(listMusic[index + 1])
                // await RNTrackPlayer.play()
                await playerContext.play(listMusic[index + 1])
                const trackId = await RNTrackPlayer.getCurrentTrack();
                GettrackObject = await RNTrackPlayer.getTrack(trackId);
                console.log('GettrackObject', GettrackObject)
            }
            await setTimeout(() => {
                settrackObject(GettrackObject)
            }, 4000);
        });

    }

    const prew = async () => {
        var GettrackObject = {}
        const trackId = await RNTrackPlayer.getCurrentTrack();
        const trackObject = await RNTrackPlayer.getTrack(trackId);
        console.log('trackObject ------------>', JSON.stringify(trackObject, null, 2))
        const indexTrack = await listMusic.findIndex(m => m.id === parseInt(trackObject?.id))
        if (indexTrack >= 0) {
            if (indexTrack === 0) {
                await RNTrackPlayer.reset()
                await RNTrackPlayer.add(listMusic[indexTrack]);
                await RNTrackPlayer.play();
                // playerContext.play(listMusic[indexTrack])
                const trackId = await RNTrackPlayer.getCurrentTrack();
                GettrackObject = await RNTrackPlayer.getTrack(trackId);
            }
            else {
                // await RNTrackPlayer.reset()
                // await RNTrackPlayer.add(listMusic[indexTrack - 1]);
                // await RNTrackPlayer.play();
                console.log('indexTrack - 1', indexTrack - 1)
                await playerContext.play(listMusic[indexTrack - 1])
                const trackId = await RNTrackPlayer.getCurrentTrack();
                GettrackObject = await RNTrackPlayer.getTrack(trackId);

            }
            await setTimeout(() => {
                settrackObject(GettrackObject)
            }, 4000);
        }



    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `Bạn có muốn chia sẽ bài hát này không?,\n${trackObject?.url}`
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            // Alert(error.message);
            console.log(error.message)
        }
    };
    const hide = () => {
        props.navigation.goBack()
    }




    const pauseMusic = () => {
        RNTrackPlayer.pause()
        setplayMusic(false)

    }

    const PlayMusic = () => {
        RNTrackPlayer.play()
        setplayMusic(true)

    }

    const setTimeAddFavorite = () => {
        MySpinner.show()
        setTimeout(() => {
            MySpinner.hide()
            myAlert('Thông báo',
                props.route?.params?.checkFavorite
                    ? 'Bài hát này đã có trong danh sách yêu thích'
                    : 'Thêm bài hát vào danh sách bài hát yêu thích thành công',
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
    const roukey = () => {
        props.navigation.navigate(ROUTE_KEY.MusicDetail)
    }
    return (
        <LinearGradient colors={[ptColor.black, ptColor.black, ptColor.black, ptColor.black]} style={{
            flex: 1,
            paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
        }}>
            {
                trackObject === {}
                    ? <ActivityIndicator size="small" color={ptColor.white} />
                    : <View>
                        <PRow

                            style={{
                                width: '100%',
                                alignItems: 'center',
                                marginTop: 10 * HEIGHT_SCALE_RATIO,
                                justifyContent: 'center',
                            }}>
                            <Icon
                                onPress={() => hide()}
                                name='chevron-down'
                                type='feather'
                                color={ptColor.white}
                                size={30}
                            />
                            <View style={{
                                marginLeft: 10 * WIDTH_SCALE_RATIO,
                                flex: 1,
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}>
                                <Text style={[style.textCaption,
                                {
                                    color: ptColor.white,
                                    fontSize: FS(18),
                                }]}>{trackObject?.title}</Text>
                                <PRow>
                                    <Icon
                                        name='corner-down-right'
                                        type='feather'
                                        color={ptColor.textPlaceholderColor}
                                        size={10}
                                    />
                                    <Text style={{
                                        color: ptColor.textPlaceholderColor,
                                        marginLeft: 5 * WIDTH_SCALE_RATIO
                                    }}>{trackObject?.artist}</Text>
                                </PRow>

                            </View>
                            {/* <MyTouchableOpacity onPress={() => this.roukey()}> */}
                            <Icon
                                onPress={() => roukey()}
                                style={{
                                    alignContent: 'flex-end',
                                    marginTop: 10 * HEIGHT_SCALE_RATIO,
                                }}
                                name='external-link'
                                type='feather'
                                color={ptColor.white}
                                size={24}></Icon>
                            {/* </MyTouchableOpacity> */}
                        </PRow>

                        <View style={{
                            marginTop: 20 * HEIGHT_SCALE_RATIO,
                            justifyContent: 'center',
                            alignContent: 'center',
                            borderRadius: HEIGHT / 2,
                            height: HEIGHT / 2,
                            overflow: 'hidden',
                        }}>
                            <Animated.Image
                                resizeMode='cover' source={{ uri: trackObject?.artwork }}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: HEIGHT / 2,
                                    transform: [{ rotate: spinM }],
                                }}></Animated.Image>
                        </View>
                        <MyTouchableOpacity style={{
                            justifyContent: 'flex-end',
                            marginVertical: 10 * HEIGHT_SCALE_RATIO
                        }}>
                            <View style={{
                                width: 100 * WIDTH_SCALE_RATIO,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}>
                                <Icon
                                    onPress={() => onShare()}
                                    style={{
                                        alignItems: 'flex-end',
                                        marginTop: 10 * HEIGHT_SCALE_RATIO,
                                    }}
                                    name='share-2'
                                    type='feather'
                                    color={ptColor.white}
                                    size={28}></Icon>
                                <Icon
                                    onPress={() => addFavoriteMusic()}
                                    style={{
                                        marginTop: 10 * HEIGHT_SCALE_RATIO,
                                        marginLeft: 10 * HEIGHT_SCALE_RATIO
                                    }}
                                    name='heart'
                                    type='feather'
                                    color={ptColor.white}
                                    size={28}></Icon>
                            </View>
                        </MyTouchableOpacity>
                        <ProgressSlider />
                        <PRow style={{
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginTop: 30 * HEIGHT_SCALE_RATIO
                        }}>
                            <Icon
                                style={{
                                    alignItems: 'flex-end',
                                }}
                                onPress={() => prew()}
                                name='rewind'
                                type='feather'
                                color={ptColor.white}
                                size={35}></Icon>

                            <Icon
                                style={{
                                    alignItems: 'flex-end',
                                    marginTop: 10 * HEIGHT_SCALE_RATIO,
                                }}
                                onPress={() => goTo(30)}
                                name='chevrons-left'
                                type='feather'
                                color={ptColor.white}
                                size={35}></Icon>

                            {
                                playMusic === true
                                    ? <Circle style>
                                        <Icon
                                            onPress={() => pauseMusic()}
                                            style={{
                                                alignItems: 'flex-end',
                                            }}
                                            name='pause'
                                            type='feather'
                                            color={ptColor.white}
                                            size={20}></Icon>
                                    </Circle>
                                    : <Circle style>
                                        <Icon
                                            onPress={() => PlayMusic()}
                                            style={{
                                                alignItems: 'flex-end',
                                            }}
                                            name='play'
                                            type='feather'
                                            color={ptColor.white}
                                            size={20}></Icon>
                                    </Circle>
                            }
                            {/* <Circle style> */}
                            <Icon
                                onPress={() => seekTo()}
                                style={{
                                    alignItems: 'flex-end',
                                    marginTop: 10 * HEIGHT_SCALE_RATIO,
                                }}
                                name='chevrons-right'
                                type='feather'
                                color={ptColor.white}
                                size={35}></Icon>
                            {/* </Circle> */}
                            {/* <Circle style> */}
                            <Icon
                                style={{
                                    alignItems: 'flex-end',
                                    marginTop: 10 * HEIGHT_SCALE_RATIO,
                                }}
                                onPress={() => {
                                    nextMusic()
                                }}
                                name='fast-forward'
                                type='feather'
                                color={ptColor.white}
                                size={35}></Icon>
                            {/* </Circle> */}
                        </PRow>
                    </View>
            }
        </LinearGradient>
    );

}

export default PlayMusic
