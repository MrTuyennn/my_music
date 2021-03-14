import React from 'react';
import { ProgressComponent } from 'react-native-track-player';
import Slider from '@react-native-community/slider';

import { PlayerContext } from '../contexts/PlayerContext';
import { Text, View } from 'react-native';
import { ptColor } from '../utils/styles';

function buildTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  if (hours > 0) {
    return `${hours}:${minutesStr}:${secondsStr}`;
  }

  return `${minutesStr}:${secondsStr}`;
}

class ProgressSlider extends ProgressComponent {
  static contextType = PlayerContext;

  get totalTime(): string {
    return buildTime(this.state.duration - this.state.position);
  }

  get currentTime(): string {
    return buildTime(this.state.position);
  }

  render() {
    return (
      <>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={this.state.duration}
          value={this.state.position}
          onSlidingComplete={(value) => {
            this.context.goTo(value);
          }}
          thumbTintColor={ptColor.white}
          minimumTrackTintColor={ptColor.white}
          maximumTrackTintColor={`${ptColor.white}30`}
          
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{color:ptColor.white}}>{this.currentTime}</Text>
          <Text style={{color:ptColor.white}}>- {this.totalTime}</Text>
        </View>
      </>
    );
  }
}

export default ProgressSlider;
