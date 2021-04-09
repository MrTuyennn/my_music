import React from 'react';
import { ActivityIndicator, Animated, Easing, Share, Text, View, ViewStyle } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import RNTrackPlayer, { STATE_PLAYING, STATE_PAUSED } from 'react-native-track-player';
import { usePlayerContext } from '../contexts/PlayerContext';
import {
    FS,
    HEIGHT,
    HEIGHT_SCALE_RATIO,
    ptColor,
    style,
    WIDTH,
    WIDTH_SCALE_RATIO
} from '../utils/styles';
import Circle from './Circle';
import { myAlert } from './MyAlert';
import MyTouchableOpacity from './MyTouchableOpacity';
import ProgressSlider from './ProgressSlider';
import PRow from './PRow';
import { ListMusic } from '../services/data';
import { ROUTE_KEY } from '../utils/contains';
interface ModalPlayMusicProps {
    styleContainer?: ViewStyle;
    navigation?:any
}

export default class ModalPlayMusic extends React.PureComponent<ModalPlayMusicProps> {
    navigation?: any
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
            visible: false,
            trackObject: {},
            PlayerContext: React.createContext(usePlayerContext),
            playMusic: true,
            songIndex: 0
        };
    }
    seekTo = async (amount = 30) => {
        const position = await RNTrackPlayer.getPosition();
        await RNTrackPlayer.seekTo(position + amount);
    };

    goTo = async (amount: number) => {
        const position = await RNTrackPlayer.getPosition();
        await RNTrackPlayer.seekTo(position - amount);
    };

    async show() {
        this.setState({ visible: true });
        const position = await RNTrackPlayer.getPosition();
        var minutes = Math.floor(position / 60)
        const duration = await RNTrackPlayer.getDuration();
        var minutesw = Math.floor(duration / 60)
        const trackId = await RNTrackPlayer.getCurrentTrack();
        const trackObject = await RNTrackPlayer.getTrack(trackId);
        this.setState({
            trackObject: trackObject
        })

    }

    async nextMusic() {
        const tracks = await RNTrackPlayer.getQueue();
        // console.log('tuyên', JSON.stringify(tracks[0]?.id, null, 2))
        await RNTrackPlayer.skip(tracks[0]?.id);
        await RNTrackPlayer.skipToNext();
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
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
            alert(error.message);
        }
    };
    hide(onDone = () => { }) {
        this.setState({ visible: false }, () => {
            setTimeout(() => {
                onDone();
            }, 310);
        });
    }
    async componentDidMount() {
        this.spin()
    }
    spin() {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 30000,
                easing: Easing.linear
            }
        ).start(() => this.spin())
    }

    pauseMusic() {
        RNTrackPlayer.pause()
        this.setState({
            playMusic: false
        })

    }

    playMusic() {
        RNTrackPlayer.play()
        this.setState({
            playMusic: true
        })

    }

    addFavoriteMusic() {
        myAlert(
            '',
            'Có muốn thêm bài hát này vào danh sách yêu thích không ?',
            'Trở lại',
            () => { },
            'Đồng ý',
            () => console.log('Thêm')
        )
    }
    roukey(){
        this.navigation.navigate(ROUTE_KEY.MusicDetail)
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        const { visible, trackObject, PlayerContext, playMusic, songIndex } = this.state;
        const { styleContainer ,navigation} = this.props;
        return (
            <Modal
                deviceWidth={WIDTH}
                deviceHeight={HEIGHT}
                animationIn="fadeInUp"
                animationInTiming={300}
                animationOutTiming={300}
                isVisible={visible}
                swipeDirection={undefined}
                onBackdropPress={() => this.setState({ visible: false })}
                onSwipeComplete={() => this.setState({ visible: false })}
                backdropOpacity={0.6}
                hasBackdrop={true}
                style={{
                    margin: 0,
                    padding: 0,
                    justifyContent: 'flex-end',
                }}
                {...this.props}
            >
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
                                        onPress={() => this.hide()}
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
                                    <MyTouchableOpacity onPress={() => this.roukey()}>
                                        <Icon
                                            style={{
                                                alignContent: 'flex-end',
                                                marginTop: 10 * HEIGHT_SCALE_RATIO,
                                            }}
                                            name='external-link'
                                            type='feather'
                                            color={ptColor.white}
                                            size={24}></Icon>
                                    </MyTouchableOpacity>
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
                                        resizeMode='cover' source={{ uri: trackObject?.artwork?.uri }}
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            transform: [{ rotate: spin }],
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
                                            onPress={() => this.onShare()}
                                            style={{
                                                alignItems: 'flex-end',
                                                marginTop: 10 * HEIGHT_SCALE_RATIO,
                                            }}
                                            name='share-2'
                                            type='feather'
                                            color={ptColor.white}
                                            size={28}></Icon>
                                        <Icon
                                            onPress={() => this.addFavoriteMusic()}
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
                                    alignItems: 'center'
                                }}>
                                    <Icon
                                        style={{
                                            alignItems: 'flex-end',
                                        }}
                                        name='skip-back'
                                        type='feather'
                                        color={ptColor.white}
                                        size={35}></Icon>

                                    <Icon
                                        style={{
                                            alignItems: 'flex-end',
                                            marginTop: 10 * HEIGHT_SCALE_RATIO,
                                        }}
                                        onPress={() => this.goTo(30)}
                                        name='rotate-ccw'
                                        type='feather'
                                        color={ptColor.white}
                                        size={35}></Icon>

                                    {
                                        playMusic === true
                                            ? <Circle style>
                                                <Icon
                                                    onPress={() => this.pauseMusic()}
                                                    style={{
                                                        alignItems: 'flex-end',
                                                        marginTop: 10 * HEIGHT_SCALE_RATIO,
                                                    }}
                                                    name='pause'
                                                    type='feather'
                                                    color={ptColor.black}
                                                    size={35}></Icon>
                                            </Circle>
                                            : <Circle style>
                                                <Icon
                                                    onPress={() => this.playMusic()}
                                                    style={{
                                                        alignItems: 'flex-end',
                                                        marginTop: 10 * HEIGHT_SCALE_RATIO,
                                                    }}
                                                    name='play'
                                                    type='feather'
                                                    color={ptColor.black}
                                                    size={35}></Icon>
                                            </Circle>
                                    }
                                    {/* <Circle style> */}
                                    <Icon
                                        onPress={() => this.seekTo()}
                                        style={{
                                            alignItems: 'flex-end',
                                            marginTop: 10 * HEIGHT_SCALE_RATIO,
                                        }}
                                        name='rotate-cw'
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
                                            this.nextMusic()
                                        }}
                                        name='skip-forward'
                                        type='feather'
                                        color={ptColor.white}
                                        size={35}></Icon>
                                    {/* </Circle> */}
                                </PRow>
                            </View>
                    }

                </LinearGradient>
            </Modal >
        );
    }
}
