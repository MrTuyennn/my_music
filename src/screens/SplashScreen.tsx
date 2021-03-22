import React, { useEffect } from "react";
import { Image, ImageBackground, Text, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import { ROUTE_KEY } from '../utils/contains';
import { imagePath } from '../utils/imagePath';
import { HEIGHT, HEIGHT_SCALE_RATIO, ptColor, style, WIDTH, WIDTH_SCALE_RATIO } from '../utils/styles';
// import Myloading from '../components/MySpinner';



const SplashScreen = ({ navigation }) => {
    // Myloading.show()
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace(ROUTE_KEY.MainNavigator)
        }, 3000);
        return () => clearTimeout(timer)
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: ptColor.black }}>

            <View style={{
                height: HEIGHT,
                width: WIDTH,
                opacity: 0.8,
                backgroundColor: ptColor.black,
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Image source={imagePath.Logo}
                    style={{
                        height: 164 * HEIGHT_SCALE_RATIO,
                        width: 180 * WIDTH_SCALE_RATIO,
                        // borderRadius: 20,
                        tintColor: ptColor.greenSuccess,
                        marginTop: 100 * HEIGHT_SCALE_RATIO
                    }} />
                <Text style={[style.textHeader, { color: ptColor.white, marginTop: 30 * HEIGHT_SCALE_RATIO }]}>Thế giới âm nhạc</Text>

                <BarIndicator count={6} color={ptColor.greenSuccess} size={50} animationDuration={1000} />
            </View>
        </View>

    );
};

export default SplashScreen;
