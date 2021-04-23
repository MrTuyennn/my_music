import * as React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import HTML from "react-native-render-html";
import { connect } from 'react-redux';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import PRow from '../components/PRow';
import { imagePath } from '../utils/imagePath';
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
import { txt } from '../utils/txt';

export interface DetailsProps {
    route?: any
    navigation?: any
}

class Details extends React.Component<DetailsProps, any> {
    navigation?: any
    constructor(props) {
        super(props);
    }
    render() {
        const navigation = this.props.navigation;
        return (
            <LinearGradient
                colors={['#000000', '#000000', '#000000', '#000000']} style={{
                    flex: 1,
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
                        fontSize: FS(18),
                        textAlign: 'center',
                        marginLeft: 20 * WIDTH_SCALE_RATIO
                    }
                    ]}>{this.props.route?.params?.title}</Text>
                </PRow>
                <View style={{
                    backgroundColor: ptColor.white,
                    flex: 1
                }}>

                    <View style={{
                        width: '100%',
                        height: 60 * HEIGHT_SCALE_RATIO,
                        backgroundColor: ptColor.black,
                    }}>
                        <Image
                            resizeMode='center'
                            source={imagePath.LogoOther01}
                            style={{
                                width: '100%',
                                height: 60 * HEIGHT_SCALE_RATIO
                            }} />
                    </View>
                    <ScrollView style={{ flex: 1, padding: 10 * HEIGHT_SCALE_RATIO }}>

                        <View>
                            <Text style={{
                                color: ptColor.black,
                                textAlign: 'center',
                                fontSize: FS(20),
                                fontWeight: 'bold'
                            }}>
                                {this.props.route?.params?.title}
                            </Text>
                            {
                                this.props.route?.params?.type === 0 || 1 || 2
                                    ? <HTML
                                        source={{
                                            html: this.props.route?.params?.type === 2
                                                ? txt.DIEU_KHOAN_BAO_MAT
                                                : this.props.route?.params?.type === 0
                                                    ? txt.GIOI_THIEU
                                                    : this.props.route?.params?.type === 1
                                                        ? txt.DIEU_KHOAN_DICH_VU : ''
                                        }}
                                    >
                                    </HTML> : <Text>ilujhdstfkhjgsdgflkjhsdfgjkl</Text>
                            }

                        </View>
                    </ScrollView>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Details);
