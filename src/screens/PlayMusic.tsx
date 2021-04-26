import React, { Component } from 'react';
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
interface PlayMusicProps {
    styleContainer?: ViewStyle;
    navigation?: any
}
export class PlayMusic extends Component<PlayMusicProps> {
    navigation?: any
    spinValue?: any
    visible?: any
    _toValue?: any
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
        console.log('chạy')
        this.setState({ visible: true });
        const position = await RNTrackPlayer.getPosition();
        var minutes = Math.floor(position / 60)
        const duration = await RNTrackPlayer.getDuration();
        var minutesw = Math.floor(duration / 60)
        const trackId = await RNTrackPlayer.getCurrentTrack();
        const trackObject = await RNTrackPlayer.getTrack(trackId);
        console.log('trackObject', JSON.stringify(trackObject))
        this.setState({
            trackObject: trackObject
        })

    }

   // code của Tuyen Internship
    async nextMusic() {
        var GettrackObject = {}

        await ListMusic.forEach(async function (item, index, value) {
            const trackId = await RNTrackPlayer.getCurrentTrack();
            const trackObject = await RNTrackPlayer.getTrack(trackId);
            if (ListMusic[index + 1] === undefined) {
                await RNTrackPlayer.reset()
                await RNTrackPlayer.add(ListMusic[0])
                await RNTrackPlayer.play()
                const trackId = await RNTrackPlayer.getCurrentTrack();
                GettrackObject = await RNTrackPlayer.getTrack(trackId);
            } else if (item?.id === parseInt(trackObject?.id)) {
                await RNTrackPlayer.reset()
                await RNTrackPlayer.add(ListMusic[index + 1])
                await RNTrackPlayer.play()
                const trackId = await RNTrackPlayer.getCurrentTrack();
                GettrackObject = await RNTrackPlayer.getTrack(trackId);
            }
        });
        await setTimeout(() => {
            this.setState({
                trackObject: GettrackObject
            })
        }, 3000);
    }

    // code của đại ca tài Senior
    async prew() {
        var GettrackObject = {}
        const trackId = await RNTrackPlayer.getCurrentTrack();
        const trackObject = await RNTrackPlayer.getTrack(trackId);
        const indexTrack = ListMusic.findIndex(m =>  m.id === parseInt(trackObject?.id) )
        if (indexTrack >= 0) {
            if (indexTrack === 0) {
                await RNTrackPlayer.reset()
                await RNTrackPlayer.add(ListMusic[indexTrack]);
                await RNTrackPlayer.play();
                const trackId = await RNTrackPlayer.getCurrentTrack();
                GettrackObject = await RNTrackPlayer.getTrack(trackId);
            }
            else {
                await RNTrackPlayer.reset()
                await RNTrackPlayer.add(ListMusic[indexTrack - 1]);
                await RNTrackPlayer.play();
                const trackId = await RNTrackPlayer.getCurrentTrack();
                GettrackObject = await RNTrackPlayer.getTrack(trackId);
            }
            await setTimeout(() => {
                this.setState({
                    trackObject: GettrackObject
                })
            }, 3000);
        }
        // await ListMusic.forEach(async function (item, index) {
        //     console.log('tren nà', trackId)
        //     const trackObject = await RNTrackPlayer.getTrack(trackId);
        //     console.log('item', JSON.stringify(index, null, 2))
        //     if (ListMusic[index] === undefined) {
        //         await RNTrackPlayer.reset()
        //         await RNTrackPlayer.add(ListMusic[0])
        //         await RNTrackPlayer.play()
        //         const trackId = await RNTrackPlayer.getCurrentTrack();
        //         GettrackObject = await RNTrackPlayer.getTrack(trackId);
        //     } else
        //         if (item?.id === parseInt(trackObject?.id)) {
        //             await RNTrackPlayer.reset()
        //             await RNTrackPlayer.add(ListMusic[index - 1])
        //             await RNTrackPlayer.play()
        //             const trackId = await RNTrackPlayer.getCurrentTrack();
        //             console.log('có lấy dc +++++', trackId)
        //             GettrackObject = await RNTrackPlayer.getTrack(trackId);
        //             console.log('tuyên của tuyên *****', JSON.stringify(GettrackObject, null, 2))
        //         }


        // });



    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Bạn có muốn chia sẽ bài hát này không?',
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
    hide() {
        this.props.navigation.goBack()
    }
    async componentDidMount() {
        this.spin()
        this.show()
    }
    spin() {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                _toValue: 1,
                get toValue() {
                    return this._toValue;
                },
                set toValue(value) {
                    this._toValue = value;
                },
                duration: 30000,
                easing: Easing.linear,
                useNativeDriver: true
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
    roukey() {
        this.props.navigation.navigate(ROUTE_KEY.MusicDetail)
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        const { trackObject, playMusic } = this.state;
        const { styleContainer, navigation } = this.props;

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
                                {/* <MyTouchableOpacity onPress={() => this.roukey()}> */}
                                <Icon
                                    onPress={() => this.roukey()}
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
                                    onPress={() => this.prew()}
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
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PlayMusic);
