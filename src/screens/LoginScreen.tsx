import PButton from '../components/PButton';
import * as React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Text, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import { ROUTE_KEY } from '../utils/contains';
import { imagePath } from '../utils/imagePath';
import { FS, HEIGHT, HEIGHT_SCALE_RATIO, ptColor, WIDTH, WIDTH_SCALE_RATIO } from '../utils/styles';
import { LoginUser, resetLoginUser, logOut } from '../states/ducks/user/action'
import MySpinner from '../components/MySpinner';
export interface LoginScreenProps {
    navigation?: any,
    resetLoginUser?: any,
    LoginUser?: any,
    logOut?: any
}

class LoginScreen extends React.Component<LoginScreenProps, any> {
    navigation?: any
    constructor(props) {
        super(props);
        this.state = {
            numberPhone: '',
            passWord: '',
            isShowPassword: false
        }
    }
    showPass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    loginUser = () => {
        const { numberPhone, passWord } = this.state
        if (numberPhone === '' && passWord === '') {
            showMessage({
                message: 'Thông báo',
                description: 'Vui lòng bổ sung thông tin',
                duration: 4000,
                type: 'danger',
            });
        } else if (numberPhone.length !== 10) {
            showMessage({
                message: 'Thông báo',
                description: 'Vui lòng kiểm tra lại số điện thoại',
                duration: 4000,
                type: 'danger',
            });
        } else if (passWord.length < 6) {
            showMessage({
                message: 'Thông báo',
                description: 'Vui lòng nhập mật khẩu trên 6 kí tự',
                duration: 4000,
                type: 'danger',
            });
        } else {
            MySpinner.show()
            this.props.LoginUser({
                numberPhone: numberPhone,
                passWord: passWord
            })
        }
    }
    UNSAFE_componentWillUpdate(nextProps) {
        if (nextProps.userData?.userInfo?.isSuccess) {
            MySpinner.hide()
            showMessage({
                message: 'Thông báo',
                description: nextProps.userData?.userInfo?.message,
                duration: 4000,
                type: 'success',
            });
        } else if (nextProps.userData?.userInfo?.isSuccess === false) {
            MySpinner.hide()
            showMessage({
                message: 'Thông báo',
                description: nextProps.userData?.userInfo?.message,
                duration: 4000,
                type: 'danger',
            });
            // this.props.logOut()
        }
    }
    componentDidMount() {
        this.props.resetLoginUser()
    }
    render() {
        const { isShowPassword } = this.state
        return (
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: ptColor.black,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={{
                    flex: 1,
                    height: '100%',
                    width: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <View style={{
                        height: 80 * HEIGHT_SCALE_RATIO,
                        width: 250 * WIDTH_SCALE_RATIO,
                        marginVertical: 50 * HEIGHT_SCALE_RATIO
                    }}>
                        <Image
                            resizeMode='stretch'
                            source={imagePath.LogoOther}
                            style={{
                                height: '100%',
                                width: '100%',

                            }} />
                    </View>
                    <View style={{
                        height: 0.06 * HEIGHT,
                        width: '100%',
                        borderRadius: 10,
                        backgroundColor: ptColor.gray5,
                        marginVertical: 10 * HEIGHT_SCALE_RATIO
                    }}>
                        <Input
                            containerStyle={{
                                height: '100%',
                                width: '100%',
                            }}
                            onChangeText={(text) => this.setState({
                                numberPhone: text
                            })}
                            inputContainerStyle={{
                                borderBottomWidth: 0,
                            }}
                            inputStyle={{
                                justifyContent: 'center',
                                color:ptColor.white
                            }}
                            underlineColorAndroid="transparent"
                            placeholder='Nhập số điện thoại'
                            placeholderTextColor={ptColor.white}
                            keyboardType="phone-pad"
                            rightIcon={
                                <Icon
                                    name='phone'
                                    size={24}
                                    color={ptColor.greenSuccess}
                                    type='feather'
                                />
                            }
                        ></Input>
                    </View>
                    <View style={{
                        height: 0.06 * HEIGHT,
                        width: '100%',
                        borderRadius: 10,
                        backgroundColor: ptColor.gray5,
                        marginVertical: 10 * HEIGHT_SCALE_RATIO
                    }}>
                        <Input
                            containerStyle={{
                                height: '100%',
                                width: '100%',
                            }}
                            onChangeText={(text) => this.setState({
                                passWord: text
                            })}
                            inputContainerStyle={{
                                borderBottomWidth: 0,
                            }}
                            inputStyle={{
                                justifyContent: 'center',
                                color: ptColor.white
                            }}
                            underlineColorAndroid="transparent"
                            placeholder='Nhập mật khẩu'
                            secureTextEntry={!isShowPassword}
                            placeholderTextColor={ptColor.white}
                            rightIcon={
                                <Icon
                                    name={isShowPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color={ptColor.greenSuccess}
                                    type='feather'
                                    onPress={() => this.showPass()}
                                />
                            }
                        ></Input>
                    </View>
                    <PButton title='ĐĂNG NHẬP'
                        buttonStyle={{
                            backgroundColor: ptColor.greenSuccess,
                        }}
                        containerStyle={{
                            width: '100%',
                            marginTop: 20 * HEIGHT_SCALE_RATIO
                        }}
                        onPress={() => this.loginUser()}></PButton>
                    <Text style={{
                        color: ptColor.white,
                        textAlign: 'center',
                        marginVertical: 20 * HEIGHT_SCALE_RATIO,
                        fontSize: FS(12)
                    }}>Nếu bạn chưa có tài khoản? <Text onPress={() => this.props.navigation.push(ROUTE_KEY.RegisterScreen)} style={{
                        color: ptColor.greenSuccess,
                        fontSize: FS(12)
                    }}>Đăng kí</Text></Text>
                    <Text style={{
                        textAlign: 'center',
                        color: ptColor.white,
                        paddingVertical: 10,

                    }}>Hoặc</Text>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20 * HEIGHT_SCALE_RATIO
                    }}>
                        <MyTouchableOpacity
                            onPress={() => console.log('oke')}
                            style={{
                                zIndex: 5
                            }}
                        >
                            <Image source={imagePath.ic_facebook}
                                style={{
                                    marginHorizontal: 20 * WIDTH_SCALE_RATIO,
                                    height: 50,
                                    width: 50
                                }}></Image>
                        </MyTouchableOpacity>
                        <Image source={imagePath.ic_google}
                            style={{
                                marginHorizontal: 20 * WIDTH_SCALE_RATIO,
                                height: 50,
                                width: 50
                            }}></Image>
                        <Image source={imagePath.ic_zalo}
                            style={{
                                marginHorizontal: 20 * WIDTH_SCALE_RATIO,
                                height: 50,
                                width: 50
                            }}></Image>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        LoginUser: (payload) => dispatch(LoginUser(payload)),
        resetLoginUser: () => dispatch(resetLoginUser()),
        logOut: () => dispatch(logOut())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
