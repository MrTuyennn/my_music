import React, { useState } from 'react'
import { View, Text, Image } from 'react-native';
import { HEIGHT_SCALE_RATIO, WIDTH, ptColor, style, WIDTH_SCALE_RATIO, FS } from '../utils/styles';
import { Icon } from 'react-native-elements'
import MyTouchableOpacity from './MyTouchableOpacity';
import { imagePath } from '../utils/imagePath';
import LinearGradient from 'react-native-linear-gradient';
import { usePlayerContext } from '../contexts/PlayerContext'
import RNTrackPlayer, { STATE_PLAYING, STATE_PAUSED } from 'react-native-track-player';
interface Props {

}

const MiniPlayer = (props: Props) => {
    const playerContext = usePlayerContext();
    const [trackObject, settrackObject] = useState({})
    const [delay, setdelay] = useState(0)

    if (playerContext.isEmpty || playerContext?.currentTrack) {
        console.log('playerContext', JSON.stringify(playerContext, null, 2))
        return (
            <LinearGradient
                colors={['#282828', '#282828', '#282828']} style={{
                    height: 60 * HEIGHT_SCALE_RATIO,
                    width: WIDTH,
                    backgroundColor: ptColor.white,
                    flexDirection: 'row',
                    padding: 20 * HEIGHT_SCALE_RATIO,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Image source={{ uri: playerContext?.currentTrack?.artwork?.uri || 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F5584525%2Fapple_apple_music_music_shubhambhatia_thevectorframe_icon&psig=AOvVaw0pXiK7z-rwtwnG6mncwwpr&ust=1615998368118000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCG7Jmdte8CFQAAAAAdAAAAABAP' }} style={{
                        height: 45 * HEIGHT_SCALE_RATIO,
                        width: 45 * WIDTH_SCALE_RATIO,
                        borderRadius: 45 * HEIGHT_SCALE_RATIO,
                        backgroundColor: ptColor.blue,
                    }}></Image>
                    <View>
                        <Text style={[style.textCaption,
                        {
                            color: ptColor.white,
                            fontSize: FS(12),
                            marginLeft: 10 * HEIGHT_SCALE_RATIO
                        }]}>{playerContext?.currentTrack?.title}</Text>
                        <Text style={[style.textSubTitle,
                        {
                            color: ptColor.white,
                            fontSize: FS(9),
                            marginLeft: 10 * HEIGHT_SCALE_RATIO
                        }]}>{playerContext?.currentTrack?.artist}</Text>
                    </View>
                </View>
                <MyTouchableOpacity onPress={() => playerContext.isPlaying ? playerContext.pause() : RNTrackPlayer.play()}>
                    <Icon
                        name={playerContext.isPlaying ? 'pause' : 'play'}
                        type='feather'
                        color={ptColor.white}
                    />
                </MyTouchableOpacity>
            </LinearGradient>
        )
    } else {
        return null
    }

}

export default MiniPlayer
