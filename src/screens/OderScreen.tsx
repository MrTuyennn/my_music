import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WIDTH_SCALE_RATIO, HEIGHT_SCALE_RATIO, ptColor, style, FS, WIDTH } from '../utils/styles';
import { imagePath } from '../utils/imagePath';
import { Input, Icon } from 'react-native-elements';
import { ListMusic } from '../services/data'
import PFlatList from '../components/PFlatList';
import PRow from '../components/PRow';
interface Props {

}

const OderScreen = (props: Props) => {
    const [DataArtist, setDataArtist] = useState(Array)

    useEffect(() => {
        const data = ListMusic.map(result => { return result?.artist })
        const arr = [...new Set(data)]
        console.log('arr', arr)
        setDataArtist(arr)
    }, [])

    const renderItemMusicCate = ({ item }) => {
        console.log('item', item)
        return (
            <Text style={{
                color: ptColor.black,
                backgroundColor: ptColor.white,
                margin: 3 * HEIGHT_SCALE_RATIO,
                padding: 3 * HEIGHT_SCALE_RATIO,
                borderRadius: 10 * HEIGHT_SCALE_RATIO
            }}>{item}</Text>
        )
    }

    const renderItemMusic = ({ item }) => {
        return (
            <PRow style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10 * HEIGHT_SCALE_RATIO
            }}>
                <PRow>
                    <Text style={{ color: ptColor.white, marginRight: 5 * WIDTH_SCALE_RATIO }}>{item?.id}</Text>
                    <Image style={{
                        marginRight: 5 * WIDTH_SCALE_RATIO,
                        height: 50 * HEIGHT_SCALE_RATIO,
                        width: 50 * WIDTH_SCALE_RATIO,
                        borderRadius: 15 * HEIGHT_SCALE_RATIO
                    }} source={item?.artwork}></Image>
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
        <LinearGradient colors={['#000000', '#006633', '#009999', '#00FFCC']} style={{
            flex: 1,
            paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
                <View style={{
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
                </View>
                <View style={{
                    marginTop: 15 * HEIGHT_SCALE_RATIO,
                    flex: 9
                }}>
                    <Input
                        placeholder="Bài hát, playlist, nghệ sĩ ..."
                        placeholderTextColor={ptColor.textPlaceholderColor}
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
            <PFlatList
                contentContainerStyle={{
                    flex: 1
                }}
                numColumns={5}
                data={DataArtist}
                renderItem={renderItemMusicCate}></PFlatList>
            <Text style={[style.textCaption,
            {
                color: ptColor.white,
                marginTop: 15 * HEIGHT_SCALE_RATIO,
                fontSize: FS(18),
                textAlign: 'center'
            }
            ]}>Danh sách bài hát của bạn</Text>

            <PFlatList
                data={ListMusic}
                renderItem={renderItemMusic}></PFlatList>
        </LinearGradient>
    )
}

export default OderScreen
