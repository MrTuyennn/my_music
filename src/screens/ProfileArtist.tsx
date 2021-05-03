import React, { useEffect, useState } from 'react';
import {
    Image,
    Text,
    View
} from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { myAlert } from '../components/MyAlert';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import PButton from '../components/PButton';
import PFlatList from '../components/PFlatList';
import PRow from '../components/PRow';
import { usePlayerContext } from '../contexts/PlayerContext';
import {
    DataAlBumsSonTung,
    DataAlBumsDen,
    DataAlBumsG_Dragon,
    DataAlBumsJack,
    DataAlBumsJustaTee,
    DataAlBumsMin,
    DataAlBumsNooPhuocThinh,
    DataAlBumsPhuongLy,
    DataAlBumsVu,
    DEN,
    GDragon,
    JACK,
    JustaTee,
    MIN,
    NooPhuocThinh,
    PhuongLy,
    SonTungMTP,
    VU
} from '../services/data';
import { ROUTE_KEY } from '../utils/contains';
import {
    FS,
    HEIGHT_SCALE_RATIO,
    ptColor,
    style,
    WIDTH_SCALE_RATIO
} from '../utils/styles';
import { setDataMusic } from '../states/ducks/musics/actions'
import { useDispatch } from 'react-redux'
import MySpinner from '../components/MySpinner';

interface Props {
    navigation?: any,
    route?: any,
}

const ProfileArtist = (props: Props) => {
    const [tab, settab] = useState(true);
    const [follow, setfollow] = useState(true);
    const [artist, setartist] = useState('');
    const [followers, setfollowers] = useState('');
    const [artwork, setartwork] = useState('');
    const [listMusic, setlistMusic] = useState(Array);
    const [album, setalbum] = useState(Number)
    const [listAlBum, setlistAlbum] = useState(Array);
    const playerContext = usePlayerContext();
    const dispatch = useDispatch()
    



    useEffect(() => {
        console.log('item router', JSON.stringify(props.route?.params?.item))
        switch (props.route?.params?.item) {
            case 'Phương Ly':
                setartist(PhuongLy?.artist)
                setfollowers(PhuongLy?.followers)
                setartwork(PhuongLy?.artwork)
                setlistMusic(PhuongLy?.alBums)
                setalbum(DataAlBumsPhuongLy?.length)
                setlistAlbum(DataAlBumsPhuongLy)
                break;
            case 'JACK':
                setartist(JACK?.artist)
                setfollowers(JACK?.followers)
                setartwork(JACK?.artwork)
                setlistMusic(JACK?.alBums)
                setalbum(DataAlBumsJack?.length)
                setlistAlbum(DataAlBumsJack)
                break;
            case 'Sơn Tùng M-TP':
                setartist(SonTungMTP?.artist)
                setfollowers(SonTungMTP?.followers)
                setartwork(SonTungMTP?.artwork)
                setlistMusic(SonTungMTP?.alBums)
                setalbum(DataAlBumsSonTung?.length)
                setlistAlbum(DataAlBumsSonTung)
                break;
            case 'Đen':
                setartist(DEN?.artist)
                setfollowers(DEN?.followers)
                setartwork(DEN?.artwork)
                setlistMusic(DEN?.alBums)
                setalbum(DataAlBumsDen?.length)
                setlistAlbum(DataAlBumsDen)
                break;
            case 'MIN':
                setartist(MIN?.artist)
                setfollowers(MIN?.followers)
                setartwork(MIN?.artwork)
                setlistMusic(MIN?.alBums)
                setalbum(DataAlBumsMin?.length)
                setlistAlbum(DataAlBumsMin)
                break;
            case 'Vũ':
                setartist(VU?.artist)
                setfollowers(VU?.followers)
                setartwork(VU?.artwork)
                setlistMusic(VU?.alBums)
                setalbum(DataAlBumsVu?.length)
                setlistAlbum(DataAlBumsVu)
                break;
            case 'JustaTee':
                setartist(JustaTee?.artist)
                setfollowers(JustaTee?.followers)
                setartwork(JustaTee?.artwork)
                setlistMusic(JustaTee?.alBums)
                setalbum(DataAlBumsJustaTee?.length)
                setlistAlbum(DataAlBumsJustaTee)
                break;
            case 'Noo Phước Thịnh':
                setartist(NooPhuocThinh?.artist)
                setfollowers(NooPhuocThinh?.followers)
                setartwork(NooPhuocThinh?.artwork)
                setlistMusic(NooPhuocThinh?.alBums)
                setalbum(DataAlBumsNooPhuocThinh?.length)
                setlistAlbum(DataAlBumsNooPhuocThinh)
                break;
            case 'G-Dragon':
                setartist(GDragon?.artist)
                setfollowers(GDragon?.followers)
                setartwork(GDragon?.artwork)
                setlistMusic(GDragon?.alBums)
                setalbum(DataAlBumsG_Dragon?.length)
                setlistAlbum(DataAlBumsG_Dragon)
                break;

            default:
                break;
        }

        console.log('listMusic', JSON.stringify(listMusic, null, 2))
    }, [])


    const setTimeAddFavorite = () => {
        MySpinner.show()
        setTimeout(() => {
            MySpinner.hide()
            myAlert('Thông báo',
                'Thêm bài hát vào danh sách yêu thích thành công',
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

    const handleInfo = () => {
        myAlert('Thông báo',`Thông tin ca sĩ ${artist} đang được cập nhập`,'Đồng ý')
    }

    const Tab1 = () => {
        settab(!tab)
    }

    const Tab2 = () => {
        settab(!tab)
    }
    const handleFl = () => {
        setfollow(!follow)
    }
    const playMusic = async (item) => {
        console.log(item)
        playerContext.play(item)
        props?.navigation.navigate(ROUTE_KEY.PlayMusic, {
            listMusic: listMusic
        })
        dispatch(setDataMusic(listMusic))

    }
    const renderItemMusic = ({ item }) => {
        return (
            <PRow
                onPress={() => playMusic(item)}
                style={{
                    // justifyContent: 'space-around',
                    alignItems: 'center',
                    marginVertical: 10 * HEIGHT_SCALE_RATIO,
                    flex: 1
                }}>
                <PRow style={{ flex: 3 }}>
                    <Text style={{ color: ptColor.white, marginRight: 10 * WIDTH_SCALE_RATIO }}>{item?.id}</Text>
                    <Image style={{
                        marginRight: 10 * WIDTH_SCALE_RATIO,
                        height: 50 * HEIGHT_SCALE_RATIO,
                        width: 50 * WIDTH_SCALE_RATIO,
                        borderRadius: 15 * HEIGHT_SCALE_RATIO
                    }} source={{ uri: item?.artwork }}></Image>
                    <View style={{ flex: 1 }}>
                        <Text style={[style.textCaption, { color: ptColor.white, fontSize: FS(13), flex: 1 }]}>{item?.title}</Text>
                        <Text style={[style.textCaption, { color: ptColor.gray3, fontSize: FS(10), flex: 1 }]}>{item?.artist}</Text>
                    </View>
                </PRow>
                <PRow style={{
                    justifyContent: 'space-around',
                    flex: 1,
                }}>
                    <MyTouchableOpacity onPress={() => addFavoriteMusic()}>
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

    const handleAlbums = () => {
        myAlert('Thông báo',`Albums sẽ cập nhập bài hát sớm nhất`)
    }

    const renderItemAlbum = ({ item }) => {
        return (
            <PRow
                onPress={() => handleAlbums()}
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10 * HEIGHT_SCALE_RATIO,
                    flex: 1,
                }}>
                <PRow style={{
                    flex: 1,
                }}>
                    <Text style={{ color: ptColor.white, marginRight: 10 * WIDTH_SCALE_RATIO }}>{item?.idAlbums}</Text>
                    <Image style={{
                        marginRight: 10 * WIDTH_SCALE_RATIO,
                        height: 50 * HEIGHT_SCALE_RATIO,
                        width: 50 * WIDTH_SCALE_RATIO,
                        borderRadius: 15 * HEIGHT_SCALE_RATIO
                    }} source={{ uri: item?.imageAlbums }}></Image>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={[style.textCaption, { color: ptColor.white, fontSize: FS(13), flex: 1 }]}>{item?.titleAlbums}</Text>
                        <Text style={[style.textCaption, { color: ptColor.gray3, fontSize: FS(10), flex: 1 }]}>{artist}</Text>
                    </View>
                </PRow>
                <PRow style={{
                    justifyContent: 'space-between',
                    // flex: 1,
                }}>
                    <Icon
                        name='play-circle'
                        type='feather'
                        color={ptColor.white}
                    />
                </PRow>
            </PRow>
        )
    }
    const numBerMunsics = Math.floor(Math.random() * 100) + 1;
    const numBerAlbums = Math.floor(Math.random() * 10) + 1;
    const numBerFl = Math.floor(Math.random() * 150) + 1;
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
                    onPress={() => props?.navigation.goBack()}>
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
                        height: 80 * HEIGHT_SCALE_RATIO,
                        width: 85 * WIDTH_SCALE_RATIO,
                        borderRadius: 100 * HEIGHT_SCALE_RATIO
                    }}>
                        <Image
                            resizeMode='cover'
                            style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: 200 * HEIGHT_SCALE_RATIO
                            }}
                            source={{ uri: artwork }}>
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
                        ]}>{artist}</Text>
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
                                }}>{listMusic?.length}</Text>
                                <Text style={{
                                    color: ptColor.white,

                                }}>Bài hát</Text>
                            </View>
                            <View>
                                <Text style={{
                                    color: ptColor.white,
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>{album}</Text>
                                <Text style={{
                                    color: ptColor.white,
                                }}>Albums</Text>
                            </View>
                            <View>
                                <Text style={{
                                    color: ptColor.white,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}>{followers}K</Text>
                                <Text style={{
                                    color: ptColor.white,

                                }}>Người theo dõi</Text>
                            </View>
                        </PRow>
                    </View>
                </PRow>

                <PRow style={{
                    justifyContent: 'space-between',
                }}>
                    <PButton
                        onPress={() => handleFl()}
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
                        onPress={() => handleInfo()}
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
                            onPress={() => Tab1()}
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
                            onPress={() => Tab2()}
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
                                    data={listMusic}
                                    renderItem={renderItemMusic}></PFlatList>
                                : <PFlatList
                                    data={listAlBum || []}
                                    renderItem={renderItemAlbum}></PFlatList>
                        }
                    </View>
                </View>

            </View>
        </LinearGradient>
    )
}

export default ProfileArtist
