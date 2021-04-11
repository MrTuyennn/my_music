/**
 * @format
 */

import { AppRegistry, LogBox, YellowBox} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './App';
import { name as appName } from './app.json';
console.disableYellowBox = true;
YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
    'Require cycle:',
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() =>
    require('./src/services/trackPlayerServices'),
);
