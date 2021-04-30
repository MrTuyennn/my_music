import PButton from '../components/PButton';
import * as React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import { imagePath } from '../utils/imagePath';
import { FS, HEIGHT, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
import Myspinner from '../components/MySpinner';
import { showMessage } from 'react-native-flash-message';
import { registerUser, resetregisterUser, logOut } from '../states/ducks/user/action'

export interface RegisterScreenProps {
    navigation?: any,
    resetregisterUser?: any,
    registerUser?: any,
    logOut?: any
}

class RegisterScreen extends React.Component<RegisterScreenProps, any> {
    navigation?: any

    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            userName: '',
            numberPhone: '',
            passWord: '',
            repassWord: ''

        }
    }
    showPass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleRegister = () => {
        const { userName, numberPhone, passWord, repassWord } = this.state
        if (userName === '' || numberPhone === '' || passWord === '' || repassWord === '') {
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
                description: 'Mật khẩu phải hơn 6 kí tự',
                duration: 4000,
                type: 'danger',
            });
        } else if (passWord !== repassWord) {
            showMessage({
                message: 'Thông báo',
                description: 'Vui lòng kiểm tra lại mật khẩu',
                duration: 4000,
                type: 'danger',
            });
        } else {
            Myspinner.show()
            this.props.registerUser({
                userName: userName,
                numberPhone: numberPhone,
                passWord: passWord
            })
        }

    }

    componentDidMount() {
        this.props.resetregisterUser()
    }

    UNSAFE_componentWillUpdate(nextProps) {
        console.log('nextProps.userData', nextProps.userData?.checkUserRegister)
        if (nextProps.userData?.checkUserRegister?.isSuccess) {
            Myspinner.hide()
            showMessage({
                message: 'Thông báo',
                description: nextProps.userData?.checkUserRegister?.message,
                duration: 4000,
                type: 'success',
            });
            this.props.resetregisterUser()
            this.props.navigation.goBack()
        } else if (nextProps.userData?.checkUserRegister?.isSuccess === false) {
            Myspinner.hide()
            showMessage({
                message: 'Thông báo',
                description: nextProps.userData?.checkUserRegister?.message,
                duration: 4000,
                type: 'danger',
            });
            this.props.resetregisterUser()
        }
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: ptColor.black,
                }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >

                    <MyTouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{
                            alignSelf: 'flex-start',
                            padding: 5 * HEIGHT_SCALE_RATIO,
                            top: 15 * HEIGHT_SCALE_RATIO,
                            left: 15 * WIDTH_SCALE_RATIO,
                            alignItems: 'flex-start',
                            position: 'absolute',
                        }}
                    >
                        <Image
                            style={{
                                width: 25,
                                height: 25,
                            }}
                            resizeMode="contain"
                            source={imagePath.ic_back}
                        />
                    </MyTouchableOpacity>
                    <View style={{
                        height: '100%',
                        width: '90%',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            height: 0.07 * HEIGHT,
                            width: '100%',
                            alignItems: 'center',
                            marginBottom: 50 * HEIGHT_SCALE_RATIO,
                        }}>
                            <View style={{
                                height: 65 * HEIGHT_SCALE_RATIO,
                                width: 220 * WIDTH_SCALE_RATIO,
                                // marginVertical: 50 * HEIGHT_SCALE_RATIO,
                            }}>
                                <Image
                                    resizeMode='stretch'
                                    source={imagePath.LogoOther}
                                    style={{
                                        height: '100%',
                                        width: '100%',

                                    }} />
                            </View>
                        </View>
                        <View style={{
                            height: 0.055 * HEIGHT,
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
                                    userName: text
                                })}
                                inputContainerStyle={{
                                    borderBottomWidth: 0,
                                }}
                                inputStyle={{
                                    justifyContent: 'center',
                                    fontSize: FS(12),
                                    color: ptColor.white
                                }}
                                placeholderTextColor={ptColor.gray7}
                                underlineColorAndroid="transparent"
                                placeholder='Tên người dùng'
                            // rightIcon={
                            //     <Icon
                            //         name='user'
                            //         size={24}
                            //         color={ptColor.greenSuccess}
                            //         type='feather'
                            //     />
                            // }
                            ></Input>
                        </View>
                        <View style={{
                            height: 0.055 * HEIGHT,
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
                                    color: ptColor.white,
                                    fontSize: FS(12)

                                }}
                                keyboardType="phone-pad"
                                underlineColorAndroid="transparent"
                                placeholder='Nhập số điện thoại'
                                placeholderTextColor={ptColor.gray7}
                            // rightIcon={
                            //     <Icon
                            //         name='phone'
                            //         size={24}
                            //         color={ptColor.greenSuccess}
                            //         type='feather'
                            //     />
                            // }
                            ></Input>
                        </View>
                        <View style={{
                            height: 0.055 * HEIGHT,
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
                                    color: ptColor.white,
                                    fontSize: FS(12)
                                }}
                                underlineColorAndroid="transparent"
                                placeholder='Nhập mật khẩu'
                                placeholderTextColor={ptColor.gray7}
                                secureTextEntry={!this.state.isShowPassword}
                                rightIcon={
                                    <Icon
                                        name={this.state.isShowPassword ? 'eye-off' : 'eye'}
                                        size={20}
                                        color={ptColor.textPlaceholderColor}
                                        type='feather'
                                        onPress={() => this.showPass()}
                                    />
                                }
                            ></Input>
                        </View>

                        <View style={{
                            height: 0.055 * HEIGHT,
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
                                    repassWord: text
                                })}
                                inputContainerStyle={{
                                    borderBottomWidth: 0,
                                }}
                                inputStyle={{
                                    justifyContent: 'center',
                                    color: ptColor.white,
                                    fontSize: FS(12)
                                }}
                                underlineColorAndroid="transparent"
                                placeholder='Nhập lại mật khẩu'
                                placeholderTextColor={ptColor.gray7}
                                secureTextEntry={!this.state.isShowPassword}
                                rightIcon={
                                    <Icon
                                        name={this.state.isShowPassword ? 'eye-off' : 'eye'}
                                        size={20}
                                        color={ptColor.textPlaceholderColor}
                                        type='feather'
                                        onPress={() => this.showPass()}
                                    />
                                }
                            ></Input>
                        </View>
                        <PButton title='ĐĂNG KÍ'
                            containerStyle={{
                                marginTop: 20 * HEIGHT_SCALE_RATIO,
                                borderRadius: 30 * HEIGHT_SCALE_RATIO
                            }}
                            titleStyle={{
                                fontSize: FS(10)
                            }}
                            buttonStyle={{
                                backgroundColor: ptColor.greenSuccess,
                            }}
                            onPress={() => this.handleRegister()}
                        ></PButton>
                        <Text style={[style.textCaption, {
                            color: ptColor.gray7,
                            textAlign: 'center',
                            marginVertical: 20 * HEIGHT_SCALE_RATIO,
                            fontSize: FS(12)
                        }]}>Bạn đã có có tài khoản? <Text onPress={() => this.props.navigation.goBack()} style={{
                            color: ptColor.greenSuccess,
                            fontSize: FS(12)
                        }}>Đăng nhập ngay</Text></Text>
                        <Text style={[style.textCaption, {
                            textAlign: 'center',
                            color: ptColor.gray7,
                            paddingVertical: 10,
                            fontSize: FS(10)

                        }]}>Hoặc đăng kí với</Text>
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
            </View>
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
        registerUser: (payload) => dispatch(registerUser(payload)),
        resetregisterUser: () => dispatch(resetregisterUser()),
        logOut: () => dispatch(logOut())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
