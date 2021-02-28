import { showMessage } from 'react-native-flash-message';
import ModalAlert from './ModalAlert';
import { ImageSourcePropType } from 'react-native';

export const myAlert = (
  title?: string,
  detail?: string,
  button1: string = 'Đóng',
  onPress1?: () => void | undefined,
  button2: string = '',
  onPress2?: () => void | undefined,
  image?: ImageSourcePropType,
  url?: string,
) => {
  setTimeout(() => {
    ModalAlert.show(
      title,
      detail,
      button1,
      onPress1,
      button2,
      onPress2,
      image,
      url,
    );
  }, 300);
};
export const myMessageFailConnect = (code = '') => {
  // if (global.appState !== 'background' || global.appState !== 'inactive') {
  showMessage({
    message: 'connect_sever_fail',
    description: 'Code: ' + code,
    duration: 4000,
    type: 'danger',
  });
};
