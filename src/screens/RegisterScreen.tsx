import PButton from '../components/PButton';
import * as React from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import { imagePath } from '../utils/imagePath';
import { HEIGHT, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
import Myspinner from '../components/MySpinner';
import { showMessage } from 'react-native-flash-message';
import { registerUser, resetregisterUser } from '../states/ducks/user/action'

export interface RegisterScreenProps {
    navigation?: any
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
        if (nextProps.userData?.userInfo?.isSuccess) {
            Myspinner.hide()
            showMessage({
                message: 'Thông báo',
                description: nextProps.userData?.userInfo?.message,
                duration: 4000,
                type: 'success',
            });
        } else if (nextProps.userData?.userInfo?.isSuccess === false) {
            Myspinner.hide()
            showMessage({
                message: 'Thông báo',
                description: nextProps.userData?.userInfo?.message,
                duration: 4000,
                type: 'danger',
            });
        } else if (nextProps.userData?.userInfo?.err) {
            Myspinner.hide()
            showMessage({
                message: 'Thông báo',
                description: 'Có lỗi xẫy ra vui lòng thử lại sau',
                duration: 4000,
                type: 'danger',
            });
            this.props.resetregisterUser()
        }
    }
    render() {
        return (
            <ImageBackground
                style={{
                    height: HEIGHT,
                    bottom: 0
                }}
                resizeMode="cover"
                source={imagePath.bg_music}
            >
                <View
                    style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: ptColor.black,
                        opacity: 0.7,

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
                            width: '80%',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                height: 0.07 * HEIGHT,
                                width: '100%',
                                alignItems: 'center',
                                marginBottom: 100
                            }}>
                                <Image source={imagePath.music}
                                    style={{
                                        height: 100 * HEIGHT_SCALE_RATIO,
                                        width: 100 * WIDTH_SCALE_RATIO,
                                        borderRadius: 20,
                                        tintColor: ptColor.greenSuccess
                                    }} />
                                <Text style={[style.textHeader, { color: ptColor.white }]}>Thế giớ âm nhạc</Text>

                            </View>

                            <View style={{
                                height: 0.07 * HEIGHT,
                                width: '100%',
                                borderRadius: 10,
                                backgroundColor: ptColor.white,
                                marginVertical: 10,
                                marginTop: 40 * HEIGHT_SCALE_RATIO
                            }}>
                                <Input
                                    style={{
                                        width: '100%',
                                        margin: 10,
                                    }}
                                    onChangeText={(text) => this.setState({
                                        userName: text
                                    })}
                                    inputContainerStyle={{
                                        borderBottomWidth: 0,
                                    }}
                                    underlineColorAndroid="transparent"
                                    placeholder='Tên người dùng'
                                    rightIcon={
                                        <Icon
                                            name='user'
                                            size={24}
                                            color={ptColor.greenSuccess}
                                            type='feather'
                                        />
                                    }
                                ></Input>
                            </View>
                            <View style={{
                                height: 0.07 * HEIGHT,
                                width: '100%',
                                borderRadius: 10,
                                backgroundColor: ptColor.white,
                                marginVertical: 10,
                            }}>
                                <Input
                                    style={{
                                        width: '100%',
                                        margin: 10,
                                    }}
                                    onChangeText={(text) => this.setState({
                                        numberPhone: text
                                    })}
                                    inputContainerStyle={{
                                        borderBottomWidth: 0,
                                    }}
                                    keyboardType="phone-pad"
                                    underlineColorAndroid="transparent"
                                    placeholder='Nhập số điện thoại'
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
                                height: 0.07 * HEIGHT,
                                width: '100%',
                                borderRadius: 10,
                                backgroundColor: ptColor.white,
                                marginVertical: 10,
                            }}>
                                <Input
                                    style={{
                                        width: '100%',
                                        margin: 10
                                    }}
                                    onChangeText={(text) => this.setState({
                                        passWord: text
                                    })}
                                    inputContainerStyle={{
                                        borderBottomWidth: 0,
                                    }}
                                    underlineColorAndroid="transparent"
                                    placeholder='Nhập mật khẩu'
                                    secureTextEntry={this.state.isShowPassword}
                                    rightIcon={
                                        <Icon
                                            name={this.state.isShowPassword ? 'eye-off' : 'eye'}
                                            size={24}
                                            color={ptColor.greenSuccess}
                                            type='feather'
                                            onPress={() => this.showPass()}
                                        />
                                    }
                                ></Input>
                            </View>

                            <View style={{
                                height: 0.07 * HEIGHT,
                                width: '100%',
                                borderRadius: 10,
                                backgroundColor: ptColor.white,
                                marginVertical: 10,
                                marginBottom: 20
                            }}>
                                <Input
                                    style={{
                                        width: '100%',
                                        margin: 10
                                    }}
                                    onChangeText={(text) => this.setState({
                                        repassWord: text
                                    })}
                                    inputContainerStyle={{
                                        borderBottomWidth: 0,
                                    }}
                                    underlineColorAndroid="transparent"
                                    placeholder='Nhập lại mật khẩu'
                                    secureTextEntry={this.state.isShowPassword}
                                    rightIcon={
                                        <Icon
                                            name={this.state.isShowPassword ? 'eye-off' : 'eye'}
                                            size={24}
                                            color={ptColor.greenSuccess}
                                            type='feather'
                                            onPress={() => this.showPass()}
                                        />
                                    }
                                ></Input>
                            </View>
                            <PButton title='ĐĂNG KÍ'
                                buttonStyle={{
                                    backgroundColor: ptColor.greenSuccess,
                                }}
                                onPress={() => this.handleRegister()}
                            ></PButton>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
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
        resetregisterUser: () => dispatch(resetregisterUser())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
