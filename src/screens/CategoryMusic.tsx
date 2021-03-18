import React from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import PRow from '../components/PRow';
import { FS, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH_SCALE_RATIO } from '../utils/styles';
export interface CategoryMusicProps {
    navigation?: any
}

class CategoryMusic extends React.Component<CategoryMusicProps, any> {
    navigation?: any
    constructor(props) {
        super(props);

    }
    render() {
        const { navigation } = this.props
        return (
            <LinearGradient colors={['#000000', '#006633', '#009999', '#00FFCC']} style={{
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
                    ]}>Thể loại âm nhạc</Text>
                </PRow>
                <Text style={[style.textCaption, { color: ptColor.white }]}>
                    Với tôi, nghe nhạc cũng có thể là một cách tuyệt vời để giảm căng thẳng,
                    cải thiện tinh thần minh mẫn, nạp lại năng lượng cho ngày mới.
                    Tôi không thể tưởng tượng được cuộc sống của tôi sẽ nhàm chán đến thế nào nếu không có âm nhạc
                </Text>
                <PRow style={{
                    marginTop: 5 * HEIGHT_SCALE_RATIO
                }}>
                    <Icon
                        name='sun'
                        type='feather'
                        color={ptColor.white}
                    />
                    <Text style={[style.textCaption, { color: ptColor.white, marginLeft: 10 * WIDTH_SCALE_RATIO }]}>Hãy chọn 1 thể loại mà bạn thích</Text>
                </PRow>
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
}

const mapDispatchToProps = dispatch => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMusic);
