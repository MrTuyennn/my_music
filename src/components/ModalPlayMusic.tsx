import React from 'react';
import { ViewStyle } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import RNTrackPlayer from 'react-native-track-player';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import {
    HEIGHT,
    HEIGHT_SCALE_RATIO,
    ptColor,
    WIDTH,
    WIDTH_SCALE_RATIO
} from '../utils/styles';
interface ModalPlayMusicProps {
    styleContainer?: ViewStyle;

}

export default class ModalPlayMusic extends React.PureComponent<ModalPlayMusicProps> {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }
    async show() {
        console.log('có nhận nha')
        this.setState({ visible: true });
        const position = await RNTrackPlayer.getPosition();
        var minutes = Math.floor(position / 60)
        const duration = await RNTrackPlayer.getDuration();
        var minutesw = Math.floor(duration / 60)
        console.log(`${minutes + " " + minutesw} seconds left.`);
        const trackId = await RNTrackPlayer.getCurrentTrack();
        const trackObject = await RNTrackPlayer.getTrack(trackId);
        console.log('trackObject', JSON.stringify(trackObject, null, 2))
    }
    hide(onDone = () => { }) {
        this.setState({ visible: false }, () => {
            setTimeout(() => {
                onDone();
            }, 310);
        });
    }
   async componentDidMount() {
        // const position = await RNTrackPlayer.getPosition();
        // var minutes = Math.floor(position / 60)
        // const duration = await RNTrackPlayer.getDuration();
        // var minutesw = Math.floor(duration / 60)
        // console.log(`${minutes + " " + minutesw} seconds left.`);
        // const trackId = await RNTrackPlayer.getCurrentTrack();
        // const trackObject = await RNTrackPlayer.getTrack(trackId);
        // console.log('trackObject', JSON.stringify(trackObject, null, 2))
    }
    render() {
        const { visible } = this.state;
        const { styleContainer } = this.props;
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
                <LinearGradient colors={['#000000', '#006633', '#009999', '#00FFCC']} style={{
                    flex: 1,
                    paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
                }}>
                    <MyTouchableOpacity
                        onPress={() => this.hide()}
                        style={{
                            width: '100%',
                            height: 40 * HEIGHT_SCALE_RATIO,
                            alignItems: 'flex-start',
                            marginTop: 10 * HEIGHT_SCALE_RATIO
                        }}>
                        <Icon
                            name='chevron-down'
                            type='feather'
                            color={ptColor.white}
                            size={30}
                        />
                    </MyTouchableOpacity>
                </LinearGradient>
            </Modal>
        );
    }
}
