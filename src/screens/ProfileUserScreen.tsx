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
import { Data, DataItem } from '../services/data'
import { ROUTE_KEY } from '../utils/contains';
import { useNavigation } from '@react-navigation/native';
import PRow from '../components/PRow';

interface Props {
    navigation?: any
}


const ProfileUser = (props: Props) => {
    const disPatch = useDispatch()
    const [user, setuser] = useState('')
    const navigation = useNavigation()
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
                        props.navigation.jumpTo(ROUTE_KEY.HistoryScreen)
                        break;
                    case 2:
                        props.navigation.navigate(ROUTE_KEY.CategoryMusic, { type: 3 })
                        break;
                    case 3:
                        props.navigation.navigate(ROUTE_KEY.ListMusics)
                        break;
                    default:
                        myAlert('Thông Báo','Tính năng đang phát triển')
                        break;
                }
            }}>
            <View style={[style.border,
            {
                height: 120 * HEIGHT_SCALE_RATIO,
                width: 120 * WIDTH_SCALE_RATIO,
                // borderColor: ptColor.white,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: ptColor.greenSuccess
            }]}>
                <Image style={{ height: 50, width: 50, tintColor: ptColor.white, }} source={item.icon}></Image>
                <Text
                    style={[
                        style.textCaption,
                        {
                            marginTop: 8,
                            color: ptColor.white,
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
        <LinearGradient colors={[ptColor.black, ptColor.black, ptColor.black, ptColor.black]} style={{
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
                <PRow style={{
                    width: '100%',
                }}>
                    <Text style={[style.textCaption, {
                        color: ptColor.white,
                        margin: 15 * HEIGHT_SCALE_RATIO,
                        fontSize: FS(25)
                    }]}>Trang cá nhân</Text>
                    <MyTouchableOpacity
                        onPress={() => navigation.navigate(ROUTE_KEY.ChangePassWord)}
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                        }}>

                        <Icon
                            // reverse
                            name='settings'
                            type='feather'
                            color={ptColor.white}
                            size={20}
                        />
                    </MyTouchableOpacity>
                </PRow>

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    // backgroundColor: ptColor.black
                }}>
                    <Image style={{
                        height: 70 * HEIGHT_SCALE_RATIO,
                        width: 70 * WIDTH_SCALE_RATIO,
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
                        <Text style={[style.textAdvance, { color: ptColor.white }]}>{user?.data?.username || user?.data?.numberPhone}</Text>
                    </View>

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
                        data={Data || []}
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
                {DataItem?.map((result, key) => {
                    return (
                        <MyTouchableOpacity
                            key={key}
                            onPress={() => {
                                switch (result.type) {
                                    case 0:
                                        navigation.navigate(ROUTE_KEY.Details, {
                                            title: result?.title,
                                            type: result?.type
                                        })
                                        break;
                                    case 1:
                                        navigation.navigate(ROUTE_KEY.Details, {
                                            title: result?.title,
                                            type: result?.type
                                        })
                                        break;
                                    case 2:
                                        navigation.navigate(ROUTE_KEY.Details, {
                                            title: result?.title,
                                            type: result?.type
                                        })
                                        break;
                                    case 6:
                                        // console.log('disPatch(logOut())', disPatch(logOut()))
                                        // 
                                        myAlert(
                                            'Thông báo',
                                            'Bạn có muốn đăng xuất không',
                                            'Trở về',
                                            () => { },
                                            'Đồng ý',
                                            () => disPatch(logOut())
                                        )
                                        break;
                                    case 5:
                                        myAlert(
                                            'Thông báo',
                                            `Giấy phép mạng xã hội: 314/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 17/7/2015
                                             Chủ quản: Công Ty Cổ Phần VNG
                                             Z06 Đường số 13, phường Tân Thuận Đông, quận 7, thành phố Hồ Chí Minh, Việt Nam`,
                                            'Trở về',
                                            () => { },
                                            'Đồng ý',
                                            () => { }
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
                                        height: 25 * HEIGHT_SCALE_RATIO,
                                        width: 26 * WIDTH_SCALE_RATIO,
                                        margin: 10 * HEIGHT_SCALE_RATIO,
                                        tintColor: ptColor.white
                                    }} source={result?.icon}></Image>
                                    <Text style={[
                                        style.textCaption,
                                        {
                                            margin: 10 * WIDTH_SCALE_RATIO,
                                            color: ptColor.white,
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


