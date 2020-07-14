/**
 * @author Luận Nguyễn Hữu
 * @email huuluan0606@gmail.com
 */

import {
  Dimensions,
  Platform
} from 'react-native';
import DeviceInfo from 'react-native-device-info';


const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
  );
};

const isTablet = () => {
  return DeviceInfo.isTablet();
};

const getPlatform = () => {
  return Platform.OS;
};

const PlatformDevice = {
  isIphoneX,
  isTablet,
  getPlatform,
};

export default PlatformDevice;