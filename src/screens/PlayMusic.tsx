import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { HEIGHT, HEIGHT_SCALE_RATIO, ptColor, WIDTH_SCALE_RATIO } from '../utils/styles';
import { Icon } from 'react-native-elements'
import MyTouchableOpacity from '../components/MyTouchableOpacity';

interface PlayMusicProps {
    navigation?: any
}
export class PlayMusic extends Component<PlayMusicProps> {
    navigation?: any
    constructor(props) {
        super(props);

    }

    render() {
        const { navigation } = this.props
        return (
            <LinearGradient colors={['#000000', '#006633', '#009999', '#00FFCC']} style={{
                flex: 1,
                paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
            }}>
                <MyTouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: '100%',
                        height: 40 * HEIGHT_SCALE_RATIO,
                        alignItems: 'flex-start',
                        marginTop: 10 * HEIGHT_SCALE_RATIO
                    }}>
                    <Icon
                        name='chevron-left'
                        type='feather'
                        color={ptColor.white}
                        size={30}
                    />
                </MyTouchableOpacity>
            </LinearGradient>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(PlayMusic);
