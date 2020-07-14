import * as React from 'react';
import { Image, Platform, StyleSheet, TouchableOpacity, View, StatusBar, Text } from 'react-native';
import { DimensionScreen, PlatformDevice } from '../../utils';
import { colors } from '../../styles'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { DeviceStorage } from '../../utils'

const sizeWithScale = DimensionScreen.scale(60) + (PlatformDevice.isIphoneX() || Platform.OS === 'android' ? DimensionScreen.scale(20) : DimensionScreen.scale(10));

export default class MainHeaderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      userGoogle: {},
    })
  }

  async componentDidMount() {

    var deviceStorage = new DeviceStorage();
    var userGoogle = JSON.parse(await deviceStorage.getStorage('user'))
    this.setState({
      userGoogle: userGoogle
    })
  }

  render() {
    const {
      containerStyle,
      isShowBottomBorder,
      statusBarStyle,

      title,
      titleStyle,

      isHiddenLeftButton,
      leftButtonImageStyle,
      leftButtonSource,
      onPressLeftButton,

      isHiddenRightButton,
      rightButtonImageStyle,
      rightButtonSource,
      onPressRightButton,
      countNoti
    } = this.props;

    return (
      <View style={[styles.containerStyle, containerStyle, isShowBottomBorder ? styles.bottomShadow : null]}>
        <StatusBar
          barStyle={statusBarStyle === 'light-content' ? 'light-content' : 'dark-content'}
          translucent
          backgroundColor="transparent"
        />
        <TouchableOpacity onPress={() => onPressLeftButton()}>
          {
            leftButtonSource ? leftButtonSource : <Icon name="menu" size={25} color={colors.white} />
          }
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {
            title ? (
              <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                <Text style={{ fontSize: 22, color: colors.white }}>{title}</Text>
              </View>
            ) : (
                <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 22, color: colors.white }}>Booking</Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 22, color: colors.blue }}>.com</Text>
                </View>
              )
          }
          {
            isHiddenRightButton ? (rightButtonSource ? rightButtonSource : null) : (
              <View style={{ flexDirection: 'row' }}>
                <Icon name="message" size={22} color={colors.white} style={styles.paddingIcon} />
                <TouchableOpacity style={styles.paddingIcon} onPress={() => onPressRightButton('NotificationList')}>
                  {
                    countNoti && countNoti > 0 ? (
                      <View style={styles.badge}>
                        <Text style={{ fontSize: 10 }}>{countNoti ? countNoti : 0}</Text>
                      </View>
                    ) : null
                  }
                  <Icon name="bell" size={21} color={colors.white} />
                </TouchableOpacity>
                <Icon name="dots-vertical" size={20} color={colors.white} />
              </View>
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    height: sizeWithScale,
    paddingTop: PlatformDevice.isIphoneX()
      ? DimensionScreen.scale(30)
      : Platform.OS === 'android'
        ? DimensionScreen.scale(20)
        : DimensionScreen.scale(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: colors.mainBlue,
    paddingHorizontal: 5
  },
  paddingIcon: {
    paddingHorizontal: 15
  },
  badge: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: colors.mainBlue,
    backgroundColor: colors.white,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    right: 8,
    top: -5,
    zIndex: 10000
  }
});