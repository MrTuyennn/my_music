import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, ToastAndroid, View } from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import { logOut } from '../states/ducks/user/action';
import { imagePath } from '../utils/imagePath';
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
import LinearGradient from 'react-native-linear-gradient';
import { myAlert } from '../components/MyAlert';
import {Data,DataItem} from '../services/data'
interface Props {

}


const ProfileUser = (props: Props) => {
    const disPatch = useDispatch()
    const [user, setuser] = useState('')
    const renderItem = ({ item }) => (
        <MyTouchableOpacity style={{
            flex: 1 / 3,
            marginVertical: 10 * HEIGHT_SCALE_RATIO,
            marginHorizontal: 10,
            alignItems: 'center',
        }}
            onPress={() => {
                switch (item.type) {
                    case 1:
                        ToastAndroid.show('Danh sách ưa thích', ToastAndroid.SHORT)
                        break;
                    case 2:
                        ToastAndroid.show('Lịch sử thanh toán', ToastAndroid.SHORT)
                        break;
                    case 3:
                        ToastAndroid.show('Danh sách tiện ích', ToastAndroid.SHORT)
                        break;
                    default:
                        ToastAndroid.show('Tính năng đang phát triển', ToastAndroid.SHORT)
                        break;
                }
            }}>
            <View style={[style.border, { height: 120 * HEIGHT_SCALE_RATIO, width: 120 * WIDTH_SCALE_RATIO, borderColor: ptColor.bgRed, justifyContent: 'center', alignItems: 'center' }]}>
                <Image style={{ height: 50, width: 50 }} source={item.icon}></Image>
                <Text
                    style={[
                        style.textCaption,
                        {
                            marginTop: 8,
                            fontWeight: 'bold',
                            color: ptColor.textColor,
                            textAlign: 'center',
                        },
                    ]}
                >
                    {item?.title}

                </Text>
            </View>

        </MyTouchableOpacity>
    );
    const logData = useSelector((state) => state?.user?.userInfo)
    useEffect(() => {
        setuser(logData)
        console.log('logData', logData)
    }, [logData])



    return (
        <LinearGradient colors={['#000000', '#006633', '#009999', '#00FFCC']} style={{
            flex: 3,
            paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
        }}>
            {/* header Profile */}
            <View
                // colors={['#000000', '#006633', '#009999', '#00FFCC']} 
                style={{
                    flex: 3,
                    paddingHorizontal: 10 * WIDTH_SCALE_RATIO,
                }}>
                <Text style={[style.textAdvance, {
                    color: ptColor.white,
                    margin: 15 * HEIGHT_SCALE_RATIO,
                    fontSize: FS(25)
                }]}>Trang cá nhân</Text>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    // backgroundColor: ptColor.black
                }}>
                    <Image style={{
                        height: 100 * HEIGHT_SCALE_RATIO,
                        width: 100 * WIDTH_SCALE_RATIO,
                        borderRadius: 50 * WIDTH_SCALE_RATIO,
                        borderWidth: 1.5 * HEIGHT_SCALE_RATIO,
                        borderColor: ptColor.white,
                        margin: 15,
                        tintColor: ptColor.white
                    }}
                        source={imagePath.man}></Image>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <Text style={[style.textAdvance, { color: ptColor.white }]}>Hello,</Text>
                        <Text style={[style.textAdvance, { color: ptColor.white }]}>{user?.data?.username}</Text>
                    </View>
                    {/* <View style={{
                        height: '80%',
                        width: '20%',
                        justifyContent: 'center',
                        marginLeft: 20 * WIDTH_SCALE_RATIO,
                    }}>
                        <Icon
                            size={15}
                            name="hammer-outline"
                            type='ionicon'
                            color={ptColor.blue3}
                            raised
                            onPress={() => console.log('hello')}
                        />
                    </View> */}
                </View>
            </View>

            {/* body Profile  */}
            <View style={{
                flex: 2.5,
                marginBottom: 20
            }}>
                <View style={{ marginVertical: 5 }}>
                    <FlatList
                        numColumns={3}
                        scrollEnabled={false}
                        data={Data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) =>
                            item ? `${item?.toString()}` : index?.toString()
                        }
                    />
                </View>
            </View>
            <Divider style={{ height: 1, backgroundColor: ptColor.gray3 }} />

            <View style={{
                flex: 5,
            }}>
                {DataItem?.map(result => {
                    return (
                        <MyTouchableOpacity
                            onPress={() => {
                                switch (result.type) {
                                    case 1:
                                        console.log('Điều khoản')
                                        break;
                                    case 2:
                                        console.log('Giới thiệu')
                                        break;
                                    case 3:
                                        // console.log('disPatch(logOut())', disPatch(logOut()))
                                        // 
                                        myAlert(
                                            'Thông báo',
                                            'Bạn có muốn đăng xuất không',
                                            'Trở về',
                                            () => {},
                                            'Đồng ý',
                                            () => disPatch(logOut())
                                        )
                                        break;
                                    default:
                                        break;
                                }
                            }}
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                marginTop: 10,
                                alignItems: 'center'
                            }}>
                            <View style={{
                                width: '95%',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image style={{
                                        height: 50 * HEIGHT_SCALE_RATIO, width: 50 * WIDTH_SCALE_RATIO, margin: 10 * HEIGHT_SCALE_RATIO
                                    }} source={result?.icon}></Image>
                                    <Text style={[
                                        style.textCaption,
                                        {
                                            margin: 10 * WIDTH_SCALE_RATIO,
                                            fontWeight: 'bold',
                                            color: ptColor.textColor,
                                            textAlign: 'center',
                                        },
                                    ]}>{result?.title}</Text></View>
                                <Divider style={{ height: 1, backgroundColor: ptColor.gray3 }} />

                            </View>
                        </MyTouchableOpacity>
                    )
                })}
            </View>
        </LinearGradient>
    )
}



export default ProfileUser


