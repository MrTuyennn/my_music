import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import MyTouchableOpacity from '../components/MyTouchableOpacity'
import PFlatList from '../components/PFlatList'
// import { dataCate } from '../services/data'
import { ROUTE_KEY } from '../utils/contains'
import { imagePath } from '../utils/imagePath'
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles'
import { getCataMusic } from '../states/ducks/cate/action'
import { removeAscent } from '../utils/func';

interface Props {
    navigation?: any,
    route?: any
}

const HistoryScreen = (props: Props) => {
    const navigation = useNavigation()
    const [search, setsearch] = useState(String)
    const disPatch = useDispatch()
    useEffect(() => {
        disPatch(getCataMusic())
    }, [disPatch])
    var getData = useSelector((state) => state?.cate?.dataCate)
    if (search?.length > 0) {

        getData = getData.filter((m) =>
            // console.log('m', m?.name)
            removeAscent(m?.name.toLowerCase()).includes(
                removeAscent(search?.toLowerCase()),
            ),
        );
    }



    const renderitem = ({ item }) => {
        // console.log('item', item)
        return (
            <MyTouchableOpacity
                onPress={() => {
                    props.navigation.push(ROUTE_KEY.ListMusics, {
                        item: item,
                    })
                    setsearch('')
                }}
                style={{
                    height: 100 * HEIGHT_SCALE_RATIO,
                    width: 180 * WIDTH_SCALE_RATIO,
                    margin: 5 * HEIGHT_SCALE_RATIO,
                    borderRadius: 10 * HEIGHT_SCALE_RATIO
                }}>
                <Image
                    resizeMode='cover'
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 10 * HEIGHT_SCALE_RATIO
                    }}
                    source={{ uri: item?.thumbnail }}></Image>
                <LinearGradient colors={['rgba(225, 225, 225, 0.03)', 'rgba(0, 0, 0, 0.8)']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        position: 'absolute',
                        bottom: -1,
                        width: '100%',
                        height: '100%',
                    }}>

                </LinearGradient>
                <Text style={[style.textCaption, {
                    position: 'absolute',
                    color: ptColor.white,
                    textAlign: 'left',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 10 * HEIGHT_SCALE_RATIO,
                    left: 10 * HEIGHT_SCALE_RATIO
                }]}>{item?.name}</Text>
            </MyTouchableOpacity>


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
                        placeholder="Tìm kiếm thể loại ..."
                        placeholderTextColor={ptColor.textPlaceholderColor}
                        onChangeText={(text) => setsearch(text)}
                        value={search}
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
            <PFlatList
                // contentContainerStyle={{
                //     padding: 10 * HEIGHT_SCALE_RATIO
                // }}
                numColumns={2}
                data={getData || []}
                renderItem={renderitem}
            ></PFlatList>
        </LinearGradient>
    )
}

export default HistoryScreen
