import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

let { width, height } = Dimensions.get('window');
const highDimension = width > height ? width : height;
const lowDimension = width > height ? height : width;

if (DeviceInfo.isTablet()) {
  width = highDimension;
  height = lowDimension;
} else {
  width = lowDimension;
  height = highDimension;
}

const guidelineBaseWidth = DeviceInfo.isTablet() ? 1024 : 375;
const guidelineBaseHeight = DeviceInfo.isTablet() ? 768 : 667;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const DimensionScreen = {
  scale,
  verticalScale,
  moderateScale,
  height,
  width,
};

export default DimensionScreen;
