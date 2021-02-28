import {
  HEIGHT,
  HEIGHT_SCALE_RATIO,
  ptColor,
  style,
  WIDTH,
  WIDTH_SCALE_RATIO,
} from '../utils/styles';
import React from 'react';
import { Text, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import PTouchableOpacity from './PTouchableOpacity';
import PRow from './PRow';
import WebView from 'react-native-webview';

export default class ModalAlert extends React.PureComponent {
  static instance = null;

  static show = (
    title,
    detail,
    button1,
    onPress1,
    button2,
    onPress2,
    image,
    url,
  ) => {
    if (ModalAlert.instance) {
      ModalAlert.instance.setState({
        visible: true,
        title,
        detail,
        button1,
        onPress1,
        button2,
        onPress2,
        image,
        url,
      });
    }
  };
  static hide = (onDone = () => {}) => {
    if (ModalAlert.instance) {
      ModalAlert.instance.setState({ visible: false }, () => {
        setTimeout(() => {
          onDone();
        }, 310);
      });
    }
  };
  constructor(props) {
    super(props);
    ModalAlert.instance = this;

    this.state = {
      visible: false,
      title: '',
      detail: '',
      button1: '',
      onPress1: null,
      button2: '',
      onPress2: null,
      image: null,
      url: null,
    };
  }
  onPressButton1 = () => {
    ModalAlert.hide(this.state.onPress1);
  };
  onPressButton2 = () => {
    ModalAlert.hide(this.state.onPress2);
  };
  UNSAFE_componentWillMount() {
    ModalAlert.hide();
  }
  render() {
    const {
      title,
      detail,
      button1,
      onPress1,
      button2,
      onPress2,
      image,
      url,
    } = this.state;
    console.log(url);
    return (
      <Modal
        deviceWidth={WIDTH}
        deviceHeight={HEIGHT}
        animationIn="fadeInUp"
        animationInTiming={300}
        animationOutTiming={300}
        swipeDirection={undefined}
        isVisible={ModalAlert?.instance?.state?.visible || false}
        onRequestClose={() => ModalAlert.hide()}
        //onBackdropPress={() => ModalAlert.hide()}
        onSwipeComplete={() => ModalAlert.hide()}
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <View
          style={{
            maxWidth: WIDTH * 0.9,
            backgroundColor: 'white',
            padding: 24 * WIDTH_SCALE_RATIO,
            paddingBottom: 0,
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 8,
          }}
        >
          {!!title && (
            <Text style={[style.textTitle, { textTransform: 'uppercase' }]}>
              {title || 'Thông báo'}
            </Text>
          )}
          {image && (
            <Image
              source={image}
              style={{
                marginVertical: 20 * HEIGHT_SCALE_RATIO,
                maxWidth: 300 * WIDTH_SCALE_RATIO,
                maxHeight: 300 * HEIGHT_SCALE_RATIO,
              }}
              resizeMode="contain"
            />
          )}
          {url && (
            <View style={{ height: HEIGHT / 3, zIndex: 50000 }}>
              <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                style={{
                  marginTop: -50,
                  //marginVertical: 20 * HEIGHT_SCALE_RATIO,
                  width: WIDTH * 0.9,
                  height: HEIGHT / 3,
                  maxHeight: HEIGHT / 2,
                  zIndex: 50001,
                  //maxWidth: WIDTH * 0.9,
                }}
                //ref={(ref) => (this.webview = ref)}
                source={{ uri: url }}
                //onNavigationStateChange={this.handleWebViewNavigationStateChange}
              />
            </View>
          )}
          {!!detail && (
            <Text
              style={[
                style.text,
                {
                  paddingVertical: 32 * HEIGHT_SCALE_RATIO,
                  paddingTop: image ? 0 : 28 * HEIGHT_SCALE_RATIO,
                },
              ]}
            >
              {detail || 'Tính năng đang được cập nhật và phát triển!'}
            </Text>
          )}
          <View
            style={{
              height: 0.5,
              width: WIDTH * 0.9 - 24 * WIDTH_SCALE_RATIO,
              backgroundColor: ptColor.borderColor2,
              opacity: 0.5,
            }}
          />
          <PRow
            style={{
              width: WIDTH * 0.9 - 24 * WIDTH_SCALE_RATIO,
              justifyContent: 'center',
              alignItems: 'center',
              height: 60 * HEIGHT_SCALE_RATIO,
            }}
          >
            <PTouchableOpacity
              onPress={this.onPressButton1}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 60 * HEIGHT_SCALE_RATIO,
              }}
            >
              <Text
                style={[
                  style.textButton,
                  {
                    textTransform: 'none',
                    color: button2 ? ptColor.textSubColor : ptColor.appColor,
                  },
                ]}
              >
                {button1 || 'Đồng ý'}
              </Text>
            </PTouchableOpacity>
            {button2 ? (
              <View
                style={{
                  width: 0.5,
                  height: 60 * HEIGHT_SCALE_RATIO,
                  backgroundColor: ptColor.borderColor2,
                  opacity: 0.5,
                }}
              />
            ) : null}
            {button2 ? (
              <PTouchableOpacity
                onPress={this.onPressButton2}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 60 * HEIGHT_SCALE_RATIO,
                }}
              >
                <Text
                  style={[
                    style.textButton,
                    { textTransform: 'none', color: ptColor.appColor },
                  ]}
                >
                  {button2 || 'Đồng ý'}
                </Text>
              </PTouchableOpacity>
            ) : null}
          </PRow>
        </View>
      </Modal>
    );
  }
}
