import PButton from '../components/PButton';
import * as React from 'react';
import { Text, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import PRow from '../components/PRow';
import { FS, HEIGHT, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
import { showMessage } from 'react-native-flash-message';
import { changePassword } from '../states/ducks/user/action'
import MySpinner from '../components/MySpinner';
import { myAlert } from '../components/MyAlert';
import { logOut, resetChangePassword } from '../states/ducks/user/action'

export interface ChangePassWordProps {
    navigation?: any
    changePassword?: any
    logOut?: any
    resetChangePassword?: any
}

class ChangePassWord extends React.Component<ChangePassWordProps, any> {
    navigation?: any
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            passWordOld: '',
            passWordNew: '',
            repassWordNew: ''

        }
    }
    showPass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    changePasswordNew = () => {
        const { passWordOld, passWordNew, repassWordNew } = this.state
        if (passWordOld === '') {
            showMessage({
                message: 'Thông báo',
                description: 'Vui lòng nhập mật khẩu hiện tại',
                duration: 4000,
                type: 'danger',
            });
        } else if (passWordNew === '') {
            showMessage({
                message: 'Thông báo',
                description: 'Vui lòng nhập mật khẩu mới',
                duration: 4000,
                type: 'danger',
            });
        } else if (repassWordNew === '') {
            showMessage({
                message: 'Thông báo',
                description: 'Vui lòng nhập lại mật khẩu mới',
                duration: 4000,
                type: 'danger',
            });
        } else if (passWordOld.length < 6 || passWordNew.length < 6 || repassWordNew.length < 6) {
            showMessage({
                message: 'Thông báo',
                description: 'Mật khẩu phải trên 6 kí tự',
                duration: 4000,
                type: 'danger',
            });
        } else if (passWordNew !== repassWordNew) {
            showMessage({
                message: 'Thông báo',
                description: 'Mật khẩu mới không trùng khớp',
                duration: 4000,
                type: 'danger',
            });
        } else {
            MySpinner.show()
            this.props.changePassword({
                oldPassword: passWordOld,
                newPassword: passWordNew,
                confirmPassword: repassWordNew
            })
        }
    }

    componentDidMount() {
        this.props.resetChangePassword()
    }

    UNSAFE_componentWillUpdate(nextProps) {
        console.log('nextProps.user', nextProps.user)
        if (nextProps.user?.changePassWord?.isSuccess === true) {
            MySpinner.hide()
            showMessage({
                message: 'Thông báo',
                description: 'Thay đổi mật khẩu thành công',
                duration: 500,
                type: 'success',
            });
            setTimeout(() => {
                myAlert(
                    'Thông báo',
                    'Bạn có muốn duy trì đăng nhập hay không ?',
                    'Đăng xuất',
                    () => {
                        this.props.resetChangePassword()
                        this.props.logOut()
                    },
                    'Duy trì đăng nhập',
                    () => {
                        this.props.navigation.goBack()
                        this.props.resetChangePassword()
                    }
                )
            }, 1000)
        } else if (nextProps.user?.changePassWord?.isSuccess === false) {
            MySpinner.hide()
            myAlert(
                'Thông báo',
                nextProps.user?.changePassWord?.message,
                'Đóng',
                () => this.props.resetChangePassword()
            )

        }
    }
    render() {
        return (
            <LinearGradient colors={[ptColor.black, ptColor.black, ptColor.black, ptColor.black]} style={{
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
                        onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name='chevron-left'
                            type='feather'
                            color={ptColor.white}
                            size={30}
                        />
                    </MyTouchableOpacity>
                    <Text style={[style.textCaption,
                    {
                        color: ptColor.white,
                        fontSize: FS(18),
                        textAlign: 'center',
                        marginLeft: 20 * WIDTH_SCALE_RATIO
                    }
                    ]}>Thay đổi mật khẩu</Text>
                </PRow>
                <Text style={[style.textCaption, {
                    color: ptColor.white,
                    fontStyle: 'italic',
                    marginTop: 20 * HEIGHT_SCALE_RATIO,
                    marginBottom: 10 * HEIGHT_SCALE_RATIO
                }]}>* Vui lòng điền đúng thông tin</Text>
                {/* <View style={{
                    flex: 1,
                    flexDirection: 'column'
                }}> */}
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
                            passWordOld: text
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
                        placeholder='Mật khẩu hiện tại'
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
                            passWordNew: text
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
                        placeholder='Mật khẩu mới'
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
                            repassWordNew: text
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
                        placeholder='Nhập lại mật khẩu mới'
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
                <PButton title='THAY ĐỔI MẬT KHẨU'
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
                    onPress={() => this.changePasswordNew()}
                ></PButton>
                {/* </View> */}
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => {
    console.log('-------->', JSON.stringify(state.user, null, 2))
    return {
        user: state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        changePassword: payload => dispatch(changePassword(payload)),
        logOut: () => dispatch((logOut())),
        resetChangePassword: () => dispatch(resetChangePassword())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassWord);
