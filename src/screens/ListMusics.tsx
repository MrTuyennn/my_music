import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import { imagePath } from '../utils/imagePath'
import { myAlert } from '../components/MyAlert'
import MySpinner from '../components/MySpinner'
import MyTouchableOpacity from '../components/MyTouchableOpacity'
import PFlatList from '../components/PFlatList'
import PRow from '../components/PRow'
import { usePlayerContext } from '../contexts/PlayerContext'
import {
    ListMusic,
    ListDataMusic1,
    ListDataMusic2,
    ListDataMusic3,
    ListDataMusic4,
    ListDataMusic5,
    ListDataMusic6,
    ListDataMusic7,
    ListDataMusic8,
    ListDataMusic9,
    ListDataMusic10,
    ListDataMusic11,
    ListDataMusic12,
    ListDataMusic13,
    ListDataMusic14,
    ListDataMusic15,
    ListDataMusic16,
    ListDataMusic17,
    ListDataMusic18,
    ListDataMusic19,
    ListDataMusic20
} from '../services/data'
import { setDataMusic } from '../states/ducks/musics/actions'
import { ROUTE_KEY } from '../utils/contains'
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles'
interface Props {
    route?: any
}

const ListMusics = (props: Props) => {
    const navigation = useNavigation()
    const playerContext = usePlayerContext()
    const dispatch = useDispatch()
    const [title, settitle] = useState(props?.route?.params?.item?.title || props?.route?.params?.item?.name)
    const [image, setimage] = useState(props?.route?.params?.item?.image || props?.route?.params?.item?.thumbnail)
    const [listMusic, setlistMusic] = useState(Array)

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

    useEffect(() => {
        switch (title) {
            case 'Những bản Hits của Alan Walker':
                setlistMusic(ListDataMusic1)
                break;
            case 'Những bản Hits RAP US/UK':
                setlistMusic(ListDataMusic2)
                break;
            case 'Những bản nhạc Dường Phố US/Uk':
                setlistMusic(ListDataMusic3)
                break;
            case 'Những bản Hits trữ tình':
                console.log('/')
                setlistMusic(ListDataMusic4)
                break;
            case 'Trải nghiệm EDM':
                setlistMusic(ListDataMusic5)
                break;
            case 'Underground':
                setlistMusic(ListDataMusic6)
                break;
            case 'Giải tỏa mệt mỏi trong ngày':
                setlistMusic(ListDataMusic7)
                break;
            case 'Tâm trạng tốt khi làm việc':
                setlistMusic(ListDataMusic8)
                break;
            case 'Thỏa mái khi đọc sách':
                setlistMusic(ListDataMusic9)
                break;
            case 'Những bản Hits Ballad trữ tình':
                console.log('.')
                setlistMusic(ListDataMusic10)
                break;
            case 'Trải nghiệm vui vẻ cùng bạn bè':
                setlistMusic(ListDataMusic11)
                break;
            case 'Chào buổi sáng':
                setlistMusic(ListDataMusic12)
                break;
            case 'Nhẹ nhàng trong cuộc sống':
                setlistMusic(ListDataMusic13)
                break;
            case 'Tâm trạng, yêu đời hơn':
                setlistMusic(ListDataMusic14)
                break;
            case 'Năng động chào ngày mới':
                setlistMusic(ListDataMusic15)
                break;
            case 'Những bản Hits Ballad trữ tình phòng trà':
                setlistMusic(ListDataMusic16)
                break;
            case 'Về gia đình, người thân':
                setlistMusic(ListDataMusic17)
                break;
            case 'Một chút dễ thương':
                setlistMusic(ListDataMusic18)
                break;
            case 'Trẻ Em':
                setlistMusic(ListDataMusic19)
                break;
            case 'Rock':
                setlistMusic(ListDataMusic20)
                break;
            case 'RnB':
                setlistMusic(ListDataMusic3)
                break;
            case 'Jazz':
                setlistMusic(ListDataMusic7)
                break;
            case 'Hip-Hop':
                setlistMusic(ListDataMusic18)
                break;
            case 'Nhạc EDM':
                setlistMusic(ListDataMusic12)
                break;
            case 'Dân Gian':
                setlistMusic(ListDataMusic1)
                break;
            case 'Cổ Điển':
                setlistMusic(ListDataMusic6)
                break;
            case 'Accoustic':
                setlistMusic(ListDataMusic13)
                break;
            case 'Pop':
                setlistMusic(ListDataMusic4)
                break;
            case 'Những bản Hits của V-POP':
                setlistMusic(ListDataMusic7)
                break;
            case 'Những bản Hits Nhạc RAP':
                setlistMusic(ListDataMusic16)
                break;
            case 'Những bản nhạc tâm trạng':
                setlistMusic(ListDataMusic10)
                break;
            case 'Những bản Hits trữ tình':
                setlistMusic(ListDataMusic3)
                break;
            case 'Những bản Hits HipHip v-pop':
                setlistMusic(ListDataMusic8)
                break;
            case 'Nghe gì hôm nay':
                setlistMusic(ListDataMusic12)
                break;
            default:
                settitle('Những bài hát bạn có thể biết')
                setimage('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80')
                setlistMusic(ListMusic)
                break;
        }
    }, []);


    const playMusic = async (item) => {
        playerContext.play(item)
        navigation.navigate(ROUTE_KEY.PlayMusic)
        dispatch(setDataMusic(listMusic))
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
                <PRow>
                    <MyTouchableOpacity
                        style={{
                            marginHorizontal: 7 * WIDTH_SCALE_RATIO
                        }}
                        onPress={() => addFavoriteMusic()}>
                        <Icon
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
    return (
        <LinearGradient colors={['#686968', '#4d4d4d', '#000000', '#000000', '#000000']} style={{
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
            </PRow>
            <View style={{
                height: 250 * HEIGHT_SCALE_RATIO,
                width: '100%',
                justifyContent: 'center',
                marginTop: 10 * HEIGHT_SCALE_RATIO
            }}>
                <Image
                    resizeMode='center'
                    source={{ uri: image }}
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 15 * HEIGHT_SCALE_RATIO
                    }} />
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10 * HEIGHT_SCALE_RATIO
            }}>
                <Text style={{
                    color: ptColor.white,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: FS(18)
                }}>{title}</Text>
                <Text style={[style.textCaption, { color: ptColor.white, textAlign: 'center' }]}>của <Text style={[style.textCaption, { color: ptColor.greenSuccess }]}>Messica</Text></Text>
            </View>
            <PFlatList
                data={listMusic || []}
                renderItem={renderItemMusic}></PFlatList>
        </LinearGradient>
    )
}

export default ListMusics

const styles = StyleSheet.create({})
