/**
 * @author Luận Nguyễn Hữu
 * @email huuluan0606@gmail.com
 */

import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { DeviceStorage } from '../../utils'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { connect } from 'react-redux';
import * as loginAction from '../../actions/'
import { DimensionScreen, PlatformDevice } from '../../utils';

import { DrawerActions } from 'react-navigation-drawer'

class CustomDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {
          key: 'Booking',
          title: 'Các đặt phòng',
          icon: 'calendar'
        },
        {
          key: 'Promote',
          title: 'Ưu đãi',
          icon: 'tago'
        },
        {
          key: 'List',
          title: 'Danh sách',
          icon: 'hourglass'
        },
        {
          key: 'Vehicle',
          title: 'Thuê xe',
          icon: 'shake'
        },
        {
          key: 'MyRevies',
          title: 'My reviews',
          icon: 'select1'
        },
        {
          key: 'VacationPost',
          title: 'Đăng chỗ nghỉ',
          icon: 'bulb1'
        },
        {
          key: 'YourCoupons',
          title: 'Các mã coupon của bạn',
          icon: 'rest'
        },
        {
          key: 'GiftTag',
          title: 'Thẻ quà tặng',
          icon: 'flag'
        },
      ],
      userInfo: {},
      default: [
        {
          key: 'Settings',
          title: 'Cài đặt',
          isNavigate: true
        },
        {
          key: 'CustomerService',
          title: 'Hỗ trợ Dịch vụ Khách hàng',
          isNavigate: true
        },
        {
          key: 'Share',
          title: 'Chia sẽ',
          isNavigate: true
        },
        {
          key: 'Feedback',
          title: 'Phản hồi về ứng dụng',
          isNavigate: true
        },
        {
          key: 'SignOut',
          title: 'Đăng xuất',
          isNavigate: false
        },
      ]
    };
  }

  async componentDidMount() {
    var deviceStorage = new DeviceStorage();
    var userGoogle = JSON.parse(await deviceStorage.getStorage('user'))
    this.setState({
      userInfo: userGoogle.user
    })
  }

  componentDidUpdate = async (prevProps, prevState) => {
  };


  navigateToScreen = async (item) => {

    if (item.key === 'SignOut') {
      this.props.signOut()
      var deviceStorage = new DeviceStorage();
      deviceStorage.dropStorage('user');
      this.props.navigation.dispatch(DrawerActions.closeDrawer())
      const navigateAction = NavigationActions.navigate({
        routeName: 'Login'
      });
      this.props.navigation.dispatch(navigateAction);
      return;
    }
    return
  }

  renderMenu = () => {
    return (
      <View style={styles.contextMenu}>
        {
          this.state.menus.map((item, index) => (
            <TouchableOpacity key={item.key} style={styles.renderMenuItem} onPress={() => this.navigateToScreen(item)}>
              <Icon name={item.icon} size={23} />
              <View style={{ paddingHorizontal: 10, paddingLeft: 25 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 13 }}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  renderDefaultMenu = () => {
    return (
      <View >
        {
          this.state.default.map((item, index) => (
            <TouchableOpacity key={item.key} style={styles.renderMenuItemDefault} onPress={() => this.navigateToScreen(item)}>
              <View style={{ paddingHorizontal: 10, }}>
                <Text style={{ fontWeight: 'bold', fontSize: 13 }}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  navigateUserInfo = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'UserInfo'
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <ScrollView style={styles.container} >
        <TouchableOpacity style={styles.contextAvatar} onPress={() => this.navigateUserInfo()}>
          <Image style={styles.avatar} source={{ uri: this.state.userInfo.photo ? this.state.userInfo.photo : 'https://cdn.itviec.com/employers/vexere/logo/social/YTT9LyngjJZ5H4edptJcSgJk/vexere-logo.png' }} />
          <View style={styles.contextName}>
            <Text style={styles.name}>{this.state.userInfo.name}</Text>
            <Text style={styles.rank}>{'Geneius Cấp 1'}</Text>
          </View>
        </TouchableOpacity>
        {this.renderMenu()}
        {this.renderDefaultMenu()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: PlatformDevice.isIphoneX()
      ? DimensionScreen.scale(30)
      : Platform.OS === 'android'
        ? DimensionScreen.scale(20)
        : DimensionScreen.scale(15),
  },
  contextAvatar: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderBottomColor: 'gray',
    flexWrap: 'wrap'
  },
  contextName: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'gray'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  rank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue'
  },
  contextMenu: {
    borderBottomWidth: 0.7,
    borderBottomColor: 'gray',
  },
  renderMenuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  renderMenuItemDefault: {
    paddingVertical: 10,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})

export default connect(null, loginAction)(CustomDrawer);
