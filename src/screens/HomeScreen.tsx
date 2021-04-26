import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import PFlatList from '../components/PFlatList';
import { dataListMusicTopMusicFourites, dataListMusicTopMusicSooDepp, dataListMusicTopMusicUSUK, dataListMusicTopMusicViet, dataSwipper, funcData } from '../services/data';
import { ROUTE_KEY } from '../utils/contains';
import { imagePath } from '../utils/imagePath';
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
interface Props {
  navigation?: any
}



const HomeScreen = (props: Props,) => {
    const navigation = useNavigation();

    const funC = (item) => {
        switch (item.type) {
            case 0:
                console.log('item', item)
                break;
            case 1:
                props.navigation?.jumpTo(ROUTE_KEY.OderScreen)
                break;
            case 2:
                navigation.navigate(ROUTE_KEY.Broswer, {
                    title: item?.title,
                    url: 'https://zingmp3.vn/album/Top-100-Bai-Hat-Nhac-Tre-Hay-Nhat-Various-Artists/ZWZB969E.html'
                })
                break;
            case 3:
                navigation.navigate(ROUTE_KEY.Broswer, {
                    title: item?.title,
                    url: 'https://www.youtube.com/feed/trending?bp=6gQJRkVleHBsb3Jl'
                })
                break;
            default:
                break;
        }
    }

    const renderItemData = ({ item }) => {
        return <View style={{
            alignItems: 'center',
            marginHorizontal: 7 * WIDTH_SCALE_RATIO,
            marginTop: 5 * HEIGHT_SCALE_RATIO
        }}>
            <MyTouchableOpacity
                onPress={() => funC(item)}
                style={{
                    height: 45 * HEIGHT_SCALE_RATIO,
                    width: 80 * WIDTH_SCALE_RATIO,
                    borderRadius: 20,
                    // backgroundColor: ptColor.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    resizeMode='contain'
                    style={{
                        height: '100%',
                        width: '100%',
                    }} source={item?.image} />
            </MyTouchableOpacity>
            <Text style={[style.textCaption, { fontSize: FS(9), color: ptColor.white, flex: 1 }]}>{item?.title}</Text>
        </View>
    }


    const renderItemDataListMusic = ({ item }) => {

        return <MyTouchableOpacity
            onPress={() => navigation.navigate(ROUTE_KEY.ListMusics, {
                item: item
            })}
            style={{
                width: 120 * WIDTH_SCALE_RATIO,
                marginRight: 10 * HEIGHT_SCALE_RATIO,
                marginTop: 5 * HEIGHT_SCALE_RATIO,
                // backgroundColor:ptColor.white,
                height: 170 * HEIGHT_SCALE_RATIO,
            }}>
            <View>
                <Image style={{
                    height: 120 * HEIGHT_SCALE_RATIO,
                    width: 120 * WIDTH_SCALE_RATIO,
                    borderRadius: 15 * HEIGHT_SCALE_RATIO,
                }} source={{ uri: item?.image || undefined }}></Image>
                <View style={{
                    height: 20 * HEIGHT_SCALE_RATIO,
                    width: 20 * WIDTH_SCALE_RATIO,
                    borderRadius: 5 * HEIGHT_SCALE_RATIO,
                    backgroundColor: ptColor.gray2,
                    position: 'absolute',
                    right: 5 * HEIGHT_SCALE_RATIO,
                    bottom: 10 * HEIGHT_SCALE_RATIO,
                    justifyContent: 'center'
                }}>
                    <Icon
                        name="play-circle"
                        size={12 * HEIGHT_SCALE_RATIO}
                        color={ptColor.black}
                        type="feather"
                    />
                </View>
            </View>

            <Text style={{
                flex: 1,
                color: ptColor.white,
                fontFamily: 'bold',
                fontSize: FS(10)
            }}>{item?.title}</Text>
        </MyTouchableOpacity>
    }
    return (
        <ScrollView >
            <LinearGradient
                colors={['#000000', '#000000', '#000000', '#000000']} style={{
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
                <View style={{
                    height: 200 * HEIGHT_SCALE_RATIO,
                    width: '100%',
                    marginTop: 10 * HEIGHT_SCALE_RATIO
                }}>
                    <Swiper showsPagination={true}
                        autoplay={true}
                        autoplayTimeout={2.5}
                        autoplayDirection={true}
                        // height={HEIGHT_SCALE_RATIO * 0.8}
                        containerStyle={{
                            height: 0.1
                        }}
                        style={{

                        }}
                        dot={
                            <View style={{ backgroundColor: ptColor.white, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />
                        }
                        activeDot={
                            <View style={{ backgroundColor: ptColor.white, width: 15, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />

                        }
                        showsButtons={false}
                    >
                        {
                            dataSwipper?.map((data) => {
                                return <Image key="{data}" style={{
                                    height: 200 * HEIGHT_SCALE_RATIO,
                                    width: '100%',
                                    borderRadius: 10
                                }} source={data?.imageSwipper}></Image>
                            })
                        }
                    </Swiper>
                </View>
                <View style={{
                    height: 100,
                    width: '100%',
                    marginTop: 10 * HEIGHT_SCALE_RATIO
                }}>
                    <PFlatList
                        numColumns={4}
                        data={funcData || []}
                        renderItem={renderItemData}></PFlatList>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20 * HEIGHT_SCALE_RATIO
                }}>
                    <Text style={[style.textCaption, {
                        color: ptColor.white,
                        fontWeight: 'bold',
                        fontSize: FS(20)
                    }]}>Có thể bạn muốn nghe</Text>
                    <Icon
                        name="chevron-right"
                        size={18 * HEIGHT_SCALE_RATIO}
                        color={ptColor.white}
                        type="feather"
                    />
                </View>
                {/* <View>
                    <PFlatList
                        horizontal={true}
                        data={dataListMusic}
                        renderItem={renderItemDataListMusic}></PFlatList>
                </View> */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20 * HEIGHT_SCALE_RATIO
                }}>
                    <MyTouchableOpacity onPress={() => navigation.push(ROUTE_KEY.CategoryMusic, { type: 0 })}>
                        <Text style={[style.textCaption, {
                            color: ptColor.white,
                            fontWeight: 'bold',
                            fontSize: FS(15)
                        }]}>Nhạc Việt</Text>
                    </MyTouchableOpacity>
                    <Icon
                        name="chevron-right"
                        size={18 * HEIGHT_SCALE_RATIO}
                        color={ptColor.white}
                        type="feather"
                    />
                </View>
                <View>
                    <PFlatList
                        horizontal={true}
                        data={dataListMusicTopMusicViet || []}
                        renderItem={renderItemDataListMusic}></PFlatList>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20 * HEIGHT_SCALE_RATIO
                }}>
                    <MyTouchableOpacity onPress={() => navigation.push(ROUTE_KEY.CategoryMusic, { type: 1 })}>
                        <Text style={[style.textCaption, {
                            color: ptColor.white,
                            fontWeight: 'bold',
                            fontSize: FS(15)
                        }]}>Nhạc Âu Mỹ</Text>
                    </MyTouchableOpacity>
                    <Icon
                        name="chevron-right"
                        size={18 * HEIGHT_SCALE_RATIO}
                        color={ptColor.white}
                        type="feather"
                    />
                </View>
                <View>
                    <PFlatList
                        horizontal={true}
                        data={dataListMusicTopMusicUSUK}
                        renderItem={renderItemDataListMusic}></PFlatList>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20 * HEIGHT_SCALE_RATIO
                }}>
                    <MyTouchableOpacity onPress={() => navigation.push(ROUTE_KEY.CategoryMusic, { type: 2 })}>
                        <Text style={[style.textCaption, {
                            color: ptColor.white,
                            fontWeight: 'bold',
                            fontSize: FS(15)
                        }]}>Nhạc Tâm Trạng Hôm Nay</Text>
                    </MyTouchableOpacity>
                    <Icon
                        name="chevron-right"
                        size={18 * HEIGHT_SCALE_RATIO}
                        color={ptColor.white}
                        type="feather"
                    />
                </View>
                <View>
                    <PFlatList
                        horizontal={true}
                        data={dataListMusicTopMusicSooDepp}
                        renderItem={renderItemDataListMusic}></PFlatList>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20 * HEIGHT_SCALE_RATIO
                }}>
                    <MyTouchableOpacity onPress={() => navigation.push(ROUTE_KEY.CategoryMusic, { type: 3 })}>
                        <Text style={[style.textCaption, {
                            color: ptColor.white,
                            fontWeight: 'bold',
                            fontSize: FS(15)
                        }]}>Có thể bạn muốn nghe</Text>
                    </MyTouchableOpacity>
                    <Icon
                        name="chevron-right"
                        size={18 * HEIGHT_SCALE_RATIO}
                        color={ptColor.white}
                        type="feather"
                    />
                </View>
                <View>
                    <PFlatList
                        horizontal={true}
                        data={dataListMusicTopMusicFourites}
                        renderItem={renderItemDataListMusic}></PFlatList>
                </View>
            </LinearGradient>
        </ScrollView>
    )
}

export default HomeScreen
