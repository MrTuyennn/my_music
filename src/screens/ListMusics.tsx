import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import MyTouchableOpacity from '../components/MyTouchableOpacity'
import PFlatList from '../components/PFlatList'
import PRow from '../components/PRow'
import { ListMusic } from '../services/data'
import { imagePath } from '../utils/imagePath'
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles'
import { usePlayerContext } from '../contexts/PlayerContext'
import { ROUTE_KEY } from '../utils/contains'
interface Props {
    route?: any
}

const ListMusics = (props: Props) => {
    const navigation = useNavigation()
    const playerContext = usePlayerContext()
    const playMusic = async (item) => {
        console.log(item)
        playerContext.play(item)
        navigation.navigate(ROUTE_KEY.PlayMusic)

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
                    source={{ uri: props?.route?.params?.item?.image }}
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
                }}>{props?.route?.params?.item?.title}</Text>
                <Text style={[style.textCaption, { color: ptColor.white, textAlign: 'center' }]}>của <Text style={[style.textCaption, { color: ptColor.greenSuccess }]}>Messica</Text></Text>
            </View>
            <PFlatList
                data={ListMusic}
                renderItem={renderItemMusic}></PFlatList>
        </LinearGradient>
    )
}

export default ListMusics

const styles = StyleSheet.create({})
