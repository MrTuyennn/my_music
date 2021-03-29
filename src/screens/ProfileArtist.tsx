import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { imagePath } from '../utils/imagePath';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import PRow from '../components/PRow';
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH, WIDTH_SCALE_RATIO } from '../utils/styles';
import PButton from '../components/PButton';
import PFlatList from '../components/PFlatList';
import { ListMusic, DataAlBums } from '../services/data';


export interface ProfileArtistProps {
    route?: any,
    navigation?: any
}

class ProfileArtist extends React.Component<ProfileArtistProps, any> {
    navigation?: any
    route?: any
    constructor(props) {
        super(props);
        this.state = {
            tab: true,
            follow: true,
            artist: this.props.route?.params?.item
        }
    }
    Tab1() {
        this.setState({
            tab: !this.state.tab
        })
    }

    Tab2() {
        this.setState({
            tab: !this.state.tab
        })
    }

    handleFl() {
        this.setState({
            follow: !this.state.follow
        })
    }
    renderItemMusic = ({ item }) => {
        return (
            <PRow
                // onPress={() => playMusic(item)}
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10 * HEIGHT_SCALE_RATIO,
                }}>
                <PRow>
                    <Text style={{ color: ptColor.white, marginRight: 10 * WIDTH_SCALE_RATIO }}>{item?.id}</Text>
                    <Image style={{
                        marginRight: 10 * WIDTH_SCALE_RATIO,
                        height: 50 * HEIGHT_SCALE_RATIO,
                        width: 50 * WIDTH_SCALE_RATIO,
                        borderRadius: 15 * HEIGHT_SCALE_RATIO
                    }} source={item?.artwork}></Image>
                    <View>
                        <Text style={[style.textCaption, { color: ptColor.white, fontSize: FS(13), flex: 1 }]}>{item?.title}</Text>
                        <Text style={[style.textCaption, { color: ptColor.gray3, fontSize: FS(10), flex: 1 }]}>{item?.artist}</Text>
                    </View>
                </PRow>
                <PRow style={{
                    justifyContent: 'space-between'
                }}>
                    <MyTouchableOpacity>
                        <Icon
                            style={{
                                marginHorizontal: 10 * HEIGHT_SCALE_RATIO
                            }}
                            name='heart'
                            type='feather'
                            color={ptColor.white}
                        />
                    </MyTouchableOpacity>
                    <Icon
                        name='play-circle'
                        type='feather'
                        color={ptColor.white}
                    />
                </PRow>
            </PRow>
        )
    }

    renderItemAlbum({ item }) {
        return (
            <PRow
                // onPress={() => playMusic(item)}
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10 * HEIGHT_SCALE_RATIO,
                }}>
                <PRow>
                    <Text style={{ color: ptColor.white, marginRight: 10 * WIDTH_SCALE_RATIO }}>{item?.idAlbums}</Text>
                    <Image style={{
                        marginRight: 10 * WIDTH_SCALE_RATIO,
                        height: 50 * HEIGHT_SCALE_RATIO,
                        width: 50 * WIDTH_SCALE_RATIO,
                        borderRadius: 15 * HEIGHT_SCALE_RATIO
                    }} source={item?.imageAlbums}></Image>
                    <View>
                        <Text style={[style.textCaption, { color: ptColor.white, fontSize: FS(13), flex: 1 }]}>{item?.titleAlbums}</Text>
                        <Text style={[style.textCaption, { color: ptColor.gray3, fontSize: FS(10), flex: 1 }]}>Nguyễn Ngọc Tuyên</Text>
                    </View>
                </PRow>
                <PRow style={{
                    justifyContent: 'space-between'
                }}>
                    <MyTouchableOpacity>
                        <Icon
                            style={{
                                marginHorizontal: 10 * HEIGHT_SCALE_RATIO
                            }}
                            name='heart'
                            type='feather'
                            color={ptColor.white}
                        />
                    </MyTouchableOpacity>
                    <Icon
                        name='play-circle'
                        type='feather'
                        color={ptColor.white}
                    />
                </PRow>
            </PRow>
        )
    }



    render() {
        const numBerMunsics = Math.floor(Math.random() * 100) + 1;
        const numBerAlbums = Math.floor(Math.random() * 10) + 1;
        const numBerFl = Math.floor(Math.random() * 150) + 1;
        const navigation = this.props.navigation
        const { tab, follow } = this.state
        return (
            <LinearGradient
                colors={['#000000', '#000000', '#000000', '#000000']} style={{
                    flex: 1,
                    flexDirection: 'column'
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
                    ]}>Thông tin</Text>
                </PRow>

                <View style={{
                    flex: 1,
                    padding: 20 * HEIGHT_SCALE_RATIO
                }}>
                    <PRow>
                        <View style={{
                            height: 100 * HEIGHT_SCALE_RATIO,
                            width: 80 * HEIGHT_SCALE_RATIO,
                        }}>
                            <Image
                                resizeMode='contain'
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    borderRadius: 200 * HEIGHT_SCALE_RATIO
                                }}
                                source={imagePath.mtp01}>
                            </Image>
                        </View>
                        <View style={{
                            flex: 1,
                            marginLeft: 20 * WIDTH_SCALE_RATIO
                        }}>
                            <Text style={[style.textCaption,
                            {
                                color: ptColor.white,
                                fontSize: FS(18),

                            }
                            ]}>{this.props.route?.params?.item}</Text>
                            <Text style={[style.textCaption,
                            {
                                fontSize: FS(12),
                            }
                            ]}>ca sĩ/ nhạc sĩ</Text>
                            <PRow style={{
                                justifyContent: 'space-between',
                                marginTop: 5 * HEIGHT_SCALE_RATIO
                            }}>
                                <View>
                                    <Text style={{
                                        color: ptColor.white,
                                        textAlign: 'center',
                                        fontWeight: 'bold'
                                    }}>{numBerMunsics}</Text>
                                    <Text style={{
                                        color: ptColor.white,

                                    }}>Bài hát</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        color: ptColor.white,
                                        textAlign: 'center',
                                        fontWeight: 'bold'
                                    }}>{numBerAlbums}</Text>
                                    <Text style={{
                                        color: ptColor.white,
                                    }}>Albums</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        color: ptColor.white,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}>{numBerFl}K</Text>
                                    <Text style={{
                                        color: ptColor.white,

                                    }}>Người thoe dõi</Text>
                                </View>
                            </PRow>
                        </View>
                    </PRow>

                    <PRow style={{
                        justifyContent: 'space-between',
                    }}>
                        <PButton
                            onPress={() => this.handleFl()}
                            title={follow ? 'Theo dõi' : 'Đang theo dõi'}
                            titleStyle={[style.textCaption,
                            {
                                color: ptColor.white,
                                fontSize: FS(8),
                                marginRight: 5 * WIDTH_SCALE_RATIO
                            }]}
                            buttonStyle={{
                                backgroundColor: ptColor.greenSuccess,
                                height: 20 * HEIGHT_SCALE_RATIO
                            }}
                            containerStyle={{
                                flex: 1,
                                margin: 10 * HEIGHT_SCALE_RATIO
                            }}

                            icon={
                                <Icon
                                    name={follow ? "plus" : 'check'}
                                    size={15}
                                    type='feather'
                                    color={ptColor.white}
                                />
                            }
                            iconRight
                        ></PButton>
                        <PButton
                            title='Thông tin chi tiết'
                            titleStyle={[style.textCaption,
                            {
                                color: ptColor.black,
                                fontSize: FS(8),
                            }]}
                            buttonStyle={{
                                backgroundColor: ptColor.white,
                                height: 20 * HEIGHT_SCALE_RATIO
                            }}
                            containerStyle={{
                                flex: 1,
                                margin: 10 * HEIGHT_SCALE_RATIO
                            }}
                        ></PButton>
                    </PRow>


                    <View style={{
                        flex: 1,
                        marginTop: 20 * HEIGHT_SCALE_RATIO
                    }}>
                        <PRow style={{
                            justifyContent: 'space-between',
                        }}>
                            <MyTouchableOpacity
                                onPress={() => this.Tab1()}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomWidth: tab === true ? 1 : 0,
                                    borderBottomColor: tab === true ? ptColor.greenSuccess : undefined
                                }}>
                                <Text style={[style.textCaption,
                                {
                                    color: tab === true ? ptColor.greenSuccess : ptColor.white,
                                    textAlign: 'center',
                                    fontSize: FS(18)
                                }]}>Bài hát</Text>
                            </MyTouchableOpacity>
                            <MyTouchableOpacity
                                onPress={() => this.Tab2()}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderBottomWidth: tab === true ? 0 : 1,
                                    borderBottomColor: tab === true ? undefined : ptColor.greenSuccess
                                }}>
                                <Text style={[style.textCaption,
                                {
                                    color: tab === true ? ptColor.white : ptColor.greenSuccess,
                                    textAlign: 'center',
                                    fontSize: FS(18)
                                }]}>Albums</Text>
                            </MyTouchableOpacity>
                        </PRow>
                        <View>
                            {
                                tab === true
                                    ? <PFlatList
                                        data={ListMusic}
                                        renderItem={this.renderItemMusic}></PFlatList>
                                    : <PFlatList
                                        data={DataAlBums}
                                        renderItem={this.renderItemAlbum}></PFlatList>
                            }
                        </View>
                    </View>
                    
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileArtist);
