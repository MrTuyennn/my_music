import MyTouchableOpacity from '../components/MyTouchableOpacity';
import PRow from '../components/PRow';
import * as React from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
import RNTrackPlayer from 'react-native-track-player';

export interface MusicDetailProps {
    navigation?: any
}

class MusicDetail extends React.Component<MusicDetailProps, any> {
    navigation?: any
    constructor(props) {
        super(props);
        this.state = {
            trackObject: {},
        }
    }

    async componentDidMount() {
        const trackId = await RNTrackPlayer.getCurrentTrack();
        const trackObject = await RNTrackPlayer.getTrack(trackId);
        this.setState({
            trackObject: trackObject
        })
    }
    render() {
        console.log(this.state.trackObject)
        const { navigation } = this.props
        return (
            <LinearGradient colors={[ptColor.black, ptColor.black, ptColor.black, ptColor.black]} style={{
                flex: 1,
                paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
            }}>
                <PRow style={{
                    height: 40 * HEIGHT_SCALE_RATIO,
                    marginTop: 10 * HEIGHT_SCALE_RATIO,
                    width: '100%'
                }}>
                    <MyTouchableOpacity
                        style={{
                            justifyContent: 'flex-start'
                        }}
                        onPress={() => navigation.goBack()}>
                        <Icon
                            name='chevron-left'
                            type='feather'
                            color={ptColor.white}
                            size={30}
                        />
                    </MyTouchableOpacity>
                    <Text style={[style.textCaption,
                    {
                        color: ptColor.white,
                        fontSize: FS(16),
                        textAlign: 'center',
                        marginLeft: 20 * WIDTH_SCALE_RATIO,
                        flex: 1
                    }
                    ]}>Thông tin bài hát</Text>
                </PRow>
                
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
}

const mapDispatchToProps = dispatch => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicDetail);
