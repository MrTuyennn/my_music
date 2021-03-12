import React, { useEffect } from 'react'
import { View, Text, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Input, Icon } from 'react-native-elements';
import { ptColor, WIDTH_SCALE_RATIO, HEIGHT_SCALE_RATIO, FS, style } from '../utils/styles';
import { imagePath } from '../utils/imagePath';
import Swiper from 'react-native-swiper'
import PFlatList from '../components/PFlatList';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import TrackPlayer from 'react-native-track-player';
import { dataListMusic, dataSwipper, funcData } from '../services/data'
interface Props {

}



const HomeScreen = (props: Props) => {
    // useEffect(() => {
    //     TrackPlayer.add({
    //         id: 'trackId',
    //         url: imagePath.QuenEmDi,
    //         title: 'Quên Em Đi',
    //         artist: 'Sơn Tùng M-TP',
    //         artwork: imagePath.mtp01
    //     });

    //     // Start playing it
    //     TrackPlayer.play();
    // })

    const renderItemData = ({ item }) => {
        return <View style={{
            alignItems: 'center',
            marginHorizontal: 24 * WIDTH_SCALE_RATIO
        }}>
            <MyTouchableOpacity
                onPress={() => console.log('abc')}
                style={{
                    height: 50 * HEIGHT_SCALE_RATIO,
                    width: 50 * WIDTH_SCALE_RATIO,
                    borderRadius: 20,
                    backgroundColor: ptColor.greenSuccess,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image style={{
                    tintColor: ptColor.white,
                    height: 24 * HEIGHT_SCALE_RATIO,
                    width: 25 * WIDTH_SCALE_RATIO,
                }} source={item?.image} />
            </MyTouchableOpacity>
            <Text style={[style.textCaption, { fontSize: FS(9), color: ptColor.white }]}>{item?.title}</Text>
        </View>
    }


    const renderItemDataListMusic = ({ item }) => {
        return <View style={{
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
                }} source={item?.image}></Image>
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
                color: ptColor.white
            }}>{item?.title}</Text>
        </View>
    }
    return (
        <ScrollView >
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
                            <View style={{ backgroundColor: ptColor.blue, width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />
                        }
                        activeDot={
                            <View style={{ backgroundColor: ptColor.blue, width: 15, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />

                        }
                        showsButtons={false}
                    >
                        {
                            dataSwipper?.map((data) => {
                                return <Image style={{
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
                    alignItems: 'center'
                }}>
                    <Text style={[style.textCaption, {
                        color: ptColor.white,
                        fontWeight: 'bold'
                    }]}>Có thể bạn muốn nghe</Text>
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
                        data={dataListMusic}
                        renderItem={renderItemDataListMusic}></PFlatList>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={[style.textCaption, {
                        color: ptColor.white,
                        fontWeight: 'bold'
                    }]}>Nhạc Việt</Text>
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
                        data={dataListMusic}
                        renderItem={renderItemDataListMusic}></PFlatList>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={[style.textCaption, {
                        color: ptColor.white,
                        fontWeight: 'bold'
                    }]}>Nhạc Âu Mỹ</Text>
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
                        data={dataListMusic}
                        renderItem={renderItemDataListMusic}></PFlatList>
                </View>
            </LinearGradient>
        </ScrollView>
    )
}

export default HomeScreen
