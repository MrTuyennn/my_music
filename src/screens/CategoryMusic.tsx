import React from 'react';
import { Image, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import PFlatList from '../components/PFlatList';
import PRow from '../components/PRow';
import {
    dataListMusicTopMusicFourites,
    dataListMusicTopMusicSooDepp,
    dataListMusicTopMusicUSUK,
    dataListMusicTopMusicViet
} from '../services/data';
import { ROUTE_KEY } from '../utils/contains';
import {
    FS,
    HEIGHT_SCALE_RATIO,
    ptColor,
    style,
    WIDTH_SCALE_RATIO
} from '../utils/styles';
export interface CategoryMusicProps {
    navigation?: any
    route?: any
}

class CategoryMusic extends React.Component<CategoryMusicProps, any> {
    navigation?: any
    route?: any
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    renderItemDataListMusic = ({ item }) => {
        return <MyTouchableOpacity
            onPress={() =>
                this.props.navigation.push(ROUTE_KEY.ListMusics, {
                    item: item
                })
            }
            style={{
                width: 150 * WIDTH_SCALE_RATIO,
                marginRight: 50 * HEIGHT_SCALE_RATIO,
                marginTop: 15 * HEIGHT_SCALE_RATIO,
                // backgroundColor:ptColor.white,
                height: 220 * HEIGHT_SCALE_RATIO,
                marginBottom: 5 * HEIGHT_SCALE_RATIO
            }}>
            <View>
                <Image style={{
                    height: 170 * HEIGHT_SCALE_RATIO,
                    width: 170 * WIDTH_SCALE_RATIO,
                    borderRadius: 15 * HEIGHT_SCALE_RATIO,
                }} source={{ uri: item?.image }}></Image>
                <LinearGradient colors={['rgba(225, 225, 225, 0.03)', 'rgba(0, 0, 0, 0.8)']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: -1,
                        width: '100%',
                        height: 40 * HEIGHT_SCALE_RATIO,
                    }}>
                    <Text style={[style.textCaption, {
                        color: ptColor.white,
                        textAlign: 'center',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 10 * HEIGHT_SCALE_RATIO
                    }]}>{item?.name}</Text>
                </LinearGradient>
                <View style={{
                    height: 20 * HEIGHT_SCALE_RATIO,
                    width: 20 * WIDTH_SCALE_RATIO,
                    borderRadius: 5 * HEIGHT_SCALE_RATIO,
                    backgroundColor: ptColor.gray2,
                    position: 'absolute',
                    right: 5 * HEIGHT_SCALE_RATIO,
                    bottom: 10 * HEIGHT_SCALE_RATIO,
                    justifyContent: 'center',
                    zIndex: 2
                }}>
                    <Icon
                        name="play-circle"
                        size={12 * HEIGHT_SCALE_RATIO}
                        color={ptColor.black}
                        type="feather"
                    />
                </View>
            </View>

            <Text style={[style.textCaption, {
                flex: 1,
                color: ptColor.white,
                fontSize: FS(10)
            }]}>{item?.title}</Text>
        </MyTouchableOpacity>
    }
    componentDidMount() {
        switch (this.props.route?.params.type) {
            case 0:
                this.setState({
                    data: dataListMusicTopMusicViet
                })
                break;
            case 1:
                this.setState({
                    data: dataListMusicTopMusicUSUK
                })
                break;
            case 2:
                this.setState({
                    data: dataListMusicTopMusicSooDepp
                })
                break;
            case 3:
                this.setState({
                    data: dataListMusicTopMusicFourites
                })
                break;
            default:
                this.setState({
                    data: []
                })
                break;
        }

    }
    render() {
        const { navigation } = this.props
        return (
            <LinearGradient colors={['#000000', '#000000', '#000000', '#000000']} style={{
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
                        fontSize: FS(18),
                        textAlign: 'center',
                        marginLeft: 20 * WIDTH_SCALE_RATIO
                    }
                    ]}>Thể loại âm nhạc</Text>
                </PRow>
                <PFlatList
                    numColumns={2}
                    data={this.state.data ?? []}
                    renderItem={this.renderItemDataListMusic}></PFlatList>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMusic);
