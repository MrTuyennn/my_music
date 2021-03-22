import { Dimensions, PixelRatio, Platform } from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
// Use iPhone6 as base size which is 375 x 667
const baseWidth = 398;
const baseHeight = 736;

///screen scale
export const WIDTH_SCALE_RATIO = WIDTH / baseWidth;
export const HEIGHT_SCALE_RATIO = HEIGHT / baseHeight;
export const PAGING_LIMIT = 5;

export const headerHeight = 26 * HEIGHT_SCALE_RATIO;
export const iconSize = 24 * WIDTH_SCALE_RATIO;
export const heightBottomBar = 69 * HEIGHT_SCALE_RATIO;
export const textInputHeight = 36 * HEIGHT_SCALE_RATIO;
export const fontSize =
  PixelRatio.get() <= 1.5
    ? 14
    : PixelRatio.get() > 1.5 && PixelRatio.get() < 3
      ? 15
      : 16;
//font scale
const scale = Math.min(WIDTH_SCALE_RATIO, HEIGHT_SCALE_RATIO);
export const FS = (size = fontSize) => Math.ceil(size * scale);

export const fixIcon = (isText = false) => {
  return isText
    ? { marginBottom: IS_IOS ? -3 * WIDTH_SCALE_RATIO : -3 * WIDTH_SCALE_RATIO }
    : {
      marginBottom: IS_IOS ? -3 * WIDTH_SCALE_RATIO : -1 * WIDTH_SCALE_RATIO,
    };
};

export const ptColor = {
  greenSuccess: '#3BB54A',
  blue: '#0A8FD8',
  blue2: '#D7E9F9',
  blue3: '#022B45',
  bgRed: '#F44336',
  bgGreen: '#E0F8E2',
  textRed: '#F44336',
  textGray: '#4D4D4D',
  yellow: '#F2C94C',
  origin: '#FF5100',
  stroke: '#D6DFE3',
  gray6: '#F2F2F2',
  gray2: '#DCDCDC',
  gray3: '#B8B8B8',
  gray5:'#474545',
  appColor: '#0A8FD8',
  appColor2: '#FFE2D1',
  textColor: '#032E42',
  textPlaceholderColor: '#aaaaaa',
  textSubColor: '#828282',
  borderColor: '#B9C0C260',
  borderColor2: '#aaaaaa',
  black: '#000000',
  white: '#ffffff',
  noWhite: '#f5f5f5',
  transparent: 'transparent',
  greyTab: '#b2b2b2',
  colorTabar:'#282828',
  lineGradientBlue: ['#F44336', '#F44336'],
};

export const ptFont = {
  REGULAR: 'Nunito-Regular',
  MEDIUM: 'Nunito-SemiBold',
  BOLD: 'Nunito-Bold',
  BLACK: 'Nunito-Black',
};

export const ptText = {
  H0: {
    fontSize: FS(fontSize) + 12,
    fontFamily: ptFont.MEDIUM,
  },
  H1: {
    fontSize: FS(fontSize) + 8,
    fontFamily: ptFont.MEDIUM,
  },
  H2: {
    fontSize: FS(fontSize) + 6,
    fontFamily: ptFont.MEDIUM,
  },
  H3: {
    fontSize: FS(fontSize) + 4,
    fontFamily: ptFont.MEDIUM,
  },
  H4: {
    fontSize: FS(fontSize) + 2,
    fontFamily: ptFont.MEDIUM,
  },
  BODY1: {
    fontSize: FS(fontSize) + 0,
    fontFamily: ptFont.REGULAR,
  },
  BODY2: {
    fontSize: FS(fontSize) - 2,
    fontFamily: ptFont.REGULAR,
  },
  SMALL1: {
    fontSize: FS(fontSize) - 3,
    fontFamily: ptFont.REGULAR,
  },
  SMALL2: {
    fontSize: FS(fontSize) - 5,
    fontFamily: ptFont.MEDIUM,
  },
  BUTTON: {
    fontSize: FS(fontSize) - 2,
    fontFamily: ptFont.MEDIUM,
  },
};

export const ptShadow = {
  BLUR0: {
    ...Platform.select({
      android: {
        // backgroundColor: 'white',
        // elevation: 3 * WIDTH_SCALE_RATIO,
        // margin: 3 * WIDTH_SCALE_RATIO,
      },
      ios: {
        // backgroundColor: 'white',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowRadius: 3 * WIDTH_SCALE_RATIO,
        // shadowOpacity: 0.16 * WIDTH_SCALE_RATIO,
        // margin: 3 * WIDTH_SCALE_RATIO,
      },
    }),
  },
  BLUR10: {
    ...Platform.select({
      android: {
        // backgroundColor: 'white',
        // elevation: 4 * WIDTH_SCALE_RATIO,
        // margin: 4 * WIDTH_SCALE_RATIO,
      },
      ios: {
        // backgroundColor: 'white',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowRadius: 4 * WIDTH_SCALE_RATIO,
        // shadowOpacity: 0.16 * WIDTH_SCALE_RATIO,
        // margin: 4 * WIDTH_SCALE_RATIO,
      },
    }),
  },
  BLUR20: {
    ...Platform.select({
      android: {
        // backgroundColor: 'white',
        // elevation: 5 * WIDTH_SCALE_RATIO,
        // margin: 5 * WIDTH_SCALE_RATIO,
      },
      ios: {
        // backgroundColor: 'white',
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowRadius: 5 * WIDTH_SCALE_RATIO,
        // shadowOpacity: 0.16 * WIDTH_SCALE_RATIO,
        // margin: 5 * WIDTH_SCALE_RATIO,
      },
    }),
  },
};

export const ptButton = {
  FILL: {
    // ...ptShadow.BLUR0,
    height: 48 * HEIGHT_SCALE_RATIO,
    borderRadius: 4 * HEIGHT_SCALE_RATIO,
    backgroundColor: ptColor.appColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  FILL_DISABLED: {
    // ...ptShadow.BLUR0,
    height: 48 * HEIGHT_SCALE_RATIO,
    borderRadius: 4 * HEIGHT_SCALE_RATIO,
    backgroundColor: ptColor.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  OUTLINE: {
    // ...ptShadow.BLUR0,
    borderWidth: 1 * HEIGHT_SCALE_RATIO,
    borderColor: ptColor.appColor2,
    height: 46 * HEIGHT_SCALE_RATIO,
    borderRadius: 4 * HEIGHT_SCALE_RATIO,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  OUTLINE_DISABLED: {
    // ...ptShadow.BLUR0,
    borderWidth: 1,
    borderColor: ptColor.borderColor,
    height: 48 * HEIGHT_SCALE_RATIO,
    borderRadius: 4 * HEIGHT_SCALE_RATIO,
    backgroundColor: ptColor.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  OUTLINE_WHITE: {
    // ...ptShadow.BLUR0,
    borderWidth: 1,
    borderColor: '#ffffff',
    height: 48 * HEIGHT_SCALE_RATIO,
    borderRadius: 4 * HEIGHT_SCALE_RATIO,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  CIRCLE: {
    width: 48 * HEIGHT_SCALE_RATIO,
    height: 48 * HEIGHT_SCALE_RATIO,
    borderRadius: 24 * WIDTH_SCALE_RATIO,
    backgroundColor: ptColor.appColor2,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export const style = {
  textMaxSize: {
    fontSize: FS(fontSize) + 24,
    fontFamily: ptFont.REGULAR,
    color: ptColor.textColor,
  },
  text: {
    ...ptText.BODY1,
    color: ptColor.textColor,
  },
  text2: {
    ...ptText.BODY2,
    color: ptColor.textColor,
  },
  textHeader: {
    ...ptText.H0,
    fontFamily: ptFont.BOLD,
    color: ptColor.textColor,
    paddingBottom: 10
  },
  textTitle: {
    ...ptText.H3,
    color: ptColor.textColor,
    fontFamily: ptFont.BOLD,
  },
  textTitle2: {
    ...ptText.H4,
    color: ptColor.textColor,
    fontFamily: ptFont.BOLD,
  },
  textTitle3: {
    ...ptText.H3,
    color: ptColor.textColor,
  },
  textSubTitle: {
    ...ptText.BODY1,
    color: ptColor.textSubColor,
  },
  textCaption: {
    ...ptText.SMALL1,
    fontFamily: ptFont.MEDIUM,
    color: ptColor.textSubColor,
  },
  textError: {
    ...ptText.SMALL1,
    fontFamily: ptFont.MEDIUM,
    backgroundColor: ptColor.bgRed,
    padding: 16,
    color: ptColor.textRed,
    marginBottom: 16,
  },
  textInput: {
    ...ptText.H4,
    color: ptColor.textColor,
  },
  textButton: {
    ...ptText.H4,
    color: ptColor.white,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: ptFont.BOLD,
  },
  textButtonWhite: {
    ...ptText.H4,
    color: ptColor.appColor,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: ptFont.BOLD,
  },
  textButton2: {
    ...ptText.H4,
    color: ptColor.white,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: ptFont.REGULAR,
  },
  textButtonOutLine: {
    ...ptText.H4,
    color: ptColor.textColor,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: ptFont.MEDIUM,
  },
  textButtonOutLine2: {
    ...ptText.H4,
    color: ptColor.textColor,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: ptFont.REGULAR,
  },
  textShadow: {
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10 * WIDTH_SCALE_RATIO,
  },
  textShadow2: {
    textShadowColor: '#00000060',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5 * WIDTH_SCALE_RATIO,
  },
  //header
  titleHeader: {
    ...ptText.H3,
    color: ptColor.appColor,
    textAlign: 'center',
  },
  // khi text bị null thì hiện cái vạch màu
  textNull: {
    ...ptText.BODY1,
    color: ptColor.stroke,
    height: ptText.BODY1.fontSize,
    width: '90%',
  },
  textNull2: {
    ...ptText.H3,
    color: ptColor.stroke,
    height: ptText.H3.fontSize,
    width: '30%',
  },
  border: {
    borderWidth: 1.5,
    borderColor: ptColor.borderColor,
    borderRadius: 8 * WIDTH_SCALE_RATIO,
  },
  borderImage: {
    borderWidth: 0.5 * WIDTH_SCALE_RATIO,
    borderColor: ptColor.borderColor,
    borderRadius: 4 * WIDTH_SCALE_RATIO,
  },
  //Button
  button: {
    ...ptButton.FILL,
    paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
    paddingVertical: 4 * HEIGHT_SCALE_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonWhite: {
    ...ptButton.FILL,
    backgroundColor: 'white',
    paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
    paddingVertical: 4 * HEIGHT_SCALE_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonOutline: {
    ...ptButton.OUTLINE,
    paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
    paddingVertical: 4 * HEIGHT_SCALE_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonOutlineWhite: {
    ...ptButton.OUTLINE_WHITE,
    paddingHorizontal: 8 * WIDTH_SCALE_RATIO,
    paddingVertical: 4 * HEIGHT_SCALE_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonIcon: {
    ...ptShadow.BLUR0,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    borderRadius: 2 * WIDTH_SCALE_RATIO,
    padding: 5 * WIDTH_SCALE_RATIO,
    alignSelf: 'baseline',
  },
  input: {
    ...ptText.BODY1,
    color: ptColor.textColor,
    flex: 1,
    borderBottomWidth: 0,
    height: textInputHeight,
    // marginVertical: 6 * HEIGHT_SCALE_RATIO,
    paddingHorizontal: 20 * WIDTH_SCALE_RATIO,
  },
  inputArena: {
    ...ptText.BODY1,
    color: ptColor.textSubColor,
    borderWidth: 1,
    borderColor: ptColor.borderColor2,
    borderRadius: 2 * WIDTH_SCALE_RATIO,
    padding: 16 * WIDTH_SCALE_RATIO,
  },
  icon: {
    fontSize: FS(iconSize),
    color: ptColor.appColor,
  },
  btnRightStyle: {
    backgroundColor: '#00000050',
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: ptText.H2.fontSize * 1.8,
    height: ptText.H2.fontSize * 1.8,
    borderRadius: ptText.H2.fontSize * 1.8,
    marginRight: 8 * WIDTH_SCALE_RATIO,
  },
  iconSectionImage: {
    height: 24 * WIDTH_SCALE_RATIO,
    width: 24 * WIDTH_SCALE_RATIO,
    tintColor: ptColor.borderColor2,
  },

  //shadow
  shadow: {
    ...ptShadow.BLUR0,
  },
  shadow2: {
    borderColor: ptColor.borderColor,
    borderWidth: WIDTH_SCALE_RATIO,
    ...ptShadow.BLUR0,
  },

  header: {
    zIndex: 9999,
    borderTopWidth: 0,
    height: headerHeight,
    width: WIDTH,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  //modal
  textModal: {
    ...ptText.H3,
    color: ptColor.textColor,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  content: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: 16 * WIDTH_SCALE_RATIO,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  paddingBottomTabbar: {
    paddingBottom: heightBottomBar + 20 * HEIGHT_SCALE_RATIO,
  },
  ///divider
  divider: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: ptColor.borderColor,
    marginTop: -1,
    marginLeft: -1,
    marginRight: -1,
  },

  boxshadownItem: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxshadownItem2: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },

  // itemAdvance
  itemAdvance: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: ptColor.gray2,
    marginVertical: 10
  },

  // textAdvance 
  textAdvance: {
    color: ptColor.gray3,
    fontSize: FS(16)
  },

  //boxshadowAdvance
  boxshashowAdvance: {
    position: 'absolute',
    bottom: 0, width: '100%',
    backgroundColor: ptColor.white,
    borderTopWidth: 1, borderColor: ptColor.gray3,
    flexDirection: 'column',
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 10, },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  }

};
