import MyTouchableOpacity from '../components/MyTouchableOpacity';
import PRow from '../components/PRow';
import * as React from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
export interface BroswerProps {
    route?: any,
    navigation?: any
}

export default class BroswerComponent extends React.Component<BroswerProps, any> {
    route?: any
    navigation?: any
    constructor(props: BroswerProps) {
        super(props);

    }

    public render() {
        const navigation = this.props.navigation
        return (
            <LinearGradient
                colors={['#000000', '#000000', '#000000', '#000000']} style={{
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
                    <Text style={[style.textCaption,
                    {
                        color: ptColor.white,
                        fontSize: FS(18),
                        textAlign: 'center',
                        marginLeft: 20 * WIDTH_SCALE_RATIO
                    }
                    ]}>{this.props.route?.params?.title}</Text>
                </PRow>
                <WebView
                    source={{ uri: this.props.route?.params?.url }}
                    style={{ marginTop: 20 }}
                />
            </LinearGradient>
        );
    }
}
