import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import PFlatList from '../components/PFlatList';
import PRow from '../components/PRow';
import { usePlayerContext } from '../contexts/PlayerContext';
import { ListMusic, ListFavorite } from '../services/data';
import { ROUTE_KEY } from '../utils/contains';
import { imagePath } from '../utils/imagePath';
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
import { useDispatch } from 'react-redux'
import { setDataMusic } from '../states/ducks/musics/actions'
import { removeAscent } from '../utils/func';
interface Props {
    isModal?: any
}

const OderScreen = (props: Props) => {
    const [DataArtist, setDataArtist] = useState(Array)
    const [search, setsearch] = useState(String)
    const [listMusic, setlistMusic] = useState(ListFavorite)
    const playerContext = usePlayerContext()
    const track = playerContext.currentTrack;
    const navigation = useNavigation()
    const isModal = React.createRef()
    const dispatch = useDispatch()
    var dataListMusic = ListFavorite




    useEffect(() => {
        const data = listMusic.map(result => { return result?.artist })
        const arr = [...new Set(data)]
        console.log('object', arr);
        setDataArtist(arr)
    }, [])
    // console.log('tìm kiếm à', search)
    const renderItemMusicCate = ({ item }) => {
        return (
            <MyTouchableOpacity onPress={() => navigation.navigate(ROUTE_KEY.ProfileArtist, {
                item: item
            })}>
                <Text style={{
                    color: ptColor.black,
                    backgroundColor: ptColor.white,
                    margin: 3 * HEIGHT_SCALE_RATIO,
                    padding: 3 * HEIGHT_SCALE_RATIO,
                    borderRadius: 10 * HEIGHT_SCALE_RATIO
                }}>{item}</Text>
            </MyTouchableOpacity >
        )
    }

    const playMusic = async (item) => {
        console.log(item)
        playerContext.play(item)
        navigation.navigate(ROUTE_KEY.PlayMusic)
        dispatch(setDataMusic(listMusic))

    }
    if (search?.length > 0) {

        dataListMusic = listMusic.filter((m) =>
            removeAscent(m?.title.toLowerCase()).includes(
                removeAscent(search?.toLowerCase()),
            ),
        );
    }

    const renderItemMusic = ({ item }) => {
        return (
            <PRow
                onPress={() => playMusic(item)}
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10 * HEIGHT_SCALE_RATIO,
                }}>
                <PRow>
                    <Text style={{ color: ptColor.white, marginRight: 5 * WIDTH_SCALE_RATIO }}>{item?.id}</Text>
                    <Image style={{
                        marginRight: 5 * WIDTH_SCALE_RATIO,
                        height: 50 * HEIGHT_SCALE_RATIO,
                        width: 50 * WIDTH_SCALE_RATIO,
                        borderRadius: 15 * HEIGHT_SCALE_RATIO
                    }} source={{ uri: item?.artwork }}></Image>
                    <View>
                        <Text style={[style.textCaption, { color: ptColor.white, fontSize: FS(15) }]}>{item?.title}</Text>
                        <Text style={[style.textCaption, { color: ptColor.gray3, fontSize: FS(10) }]}>{item?.artist}</Text>
                    </View>
                </PRow>
                <Icon
                    name='play-circle'
                    type='feather'
                    color={ptColor.white}
                />
            </PRow>
        )
    }

    return (
        <LinearGradient colors={[ptColor.black, ptColor.black, ptColor.black, ptColor.black]} style={{
            flex: 1,
            paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
                <MyTouchableOpacity
                    onPress={() => navigation.navigate(ROUTE_KEY.ProfileUserScreen)}
                    style={{
                        flex: 0.5,
                        height: 40 * HEIGHT_SCALE_RATIO,
                        width: 60 * WIDTH_SCALE_RATIO,
                        marginTop: 15 * HEIGHT_SCALE_RATIO,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        style={{
                            tintColor: ptColor.white,
                            height: '60%',
                            width: '130%',
                        }} source={imagePath.profile_user} />
                </MyTouchableOpacity>
                <View style={{
                    marginTop: 15 * HEIGHT_SCALE_RATIO,
                    flex: 9
                }}>
                    <Input
                        placeholder="Bài hát, playlist, nghệ sĩ ..."
                        placeholderTextColor={ptColor.textPlaceholderColor}
                        onChangeText={(text) => setsearch(text)}
                        inputContainerStyle={{
                            borderRadius: 30,
                            borderColor: ptColor.blue,
                            borderWidth: 1,
                            height: 35 * HEIGHT_SCALE_RATIO,
                            backgroundColor: ptColor.white,
                        }}
                        inputStyle={[style.textCaption, {
                            fontSize: FS(12),
                            height: 40 * HEIGHT_SCALE_RATIO,

                        }]}
                        containerStyle={{
                            height: 40 * HEIGHT_SCALE_RATIO,
                        }}
                        leftIcon={
                            <Icon
                                style={{ marginHorizontal: 10 }}
                                name="search"
                                size={18 * HEIGHT_SCALE_RATIO}
                                color={ptColor.textPlaceholderColor}
                                type="feather"
                            />
                        }
                        rightIcon={
                            <Icon
                                style={{ marginHorizontal: 10 }}
                                name="mic"
                                size={18 * HEIGHT_SCALE_RATIO}
                                color={ptColor.textPlaceholderColor}
                                type="feather"
                            />
                        }
                    />
                </View>
            </View>
            <Text style={[style.textCaption, { color: ptColor.white, marginVertical: 5 * HEIGHT_SCALE_RATIO }]}>Có thể bạn biết</Text>
            <View>
                <PFlatList
                    contentContainerStyle={{
                    }}
                    numColumns={5}
                    data={DataArtist}
                    renderItem={renderItemMusicCate}></PFlatList>
            </View>
            <Text style={[style.textCaption,
            {
                color: ptColor.white,
                marginTop: 15 * HEIGHT_SCALE_RATIO,
                fontSize: FS(18),
                textAlign: 'center'
            }
            ]}>Danh sách bài hát của bạn</Text>

            <PFlatList
                data={dataListMusic || []}
                renderItem={renderItemMusic}></PFlatList>
        </LinearGradient>
    )
}

export default OderScreen
