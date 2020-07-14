import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  colors,
} from '../styles'
import {
  connect
} from 'react-redux';
import * as loginAction from '../actions'

import {
  DeviceStorage
} from '../utils'
import { NavigationActions } from 'react-navigation';
import MainHeaderComponent from '../components/headers/main-header.component'

class UserInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    var deviceStorage = new DeviceStorage();
    var userGoogle = JSON.parse(await deviceStorage.getStorage('user'))
    this.setState({
      userInfo: userGoogle.user
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate('Home')
    return true
  }

  renderContextInfo = () => {
    return (
      <View style={styles.contextAvatar}>
        <Image style={styles.avatar} source={{ uri: this.state.userInfo.photo ? this.state.userInfo.photo : 'https://cdn.itviec.com/employers/vexere/logo/social/YTT9LyngjJZ5H4edptJcSgJk/vexere-logo.png' }} />
        <Text style={[styles.name, styles.text]}>{this.state.userInfo.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={{ color: colors.mainBlue, ...styles.name }}>{'Genius Cấp 1'}</Text>
          <Text>{' '}</Text>
          <Text style={{ fontSize: 16 }}>{'từ Tháng 9 2018'}</Text>
        </View>
      </View>
    )
  }

  renderContextEdit = () => {
    return (
      <TouchableOpacity style={styles.contextItem}>
        <Icon name="file-document-edit-outline" size={25} color={colors.black} />
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', paddingLeft: 15, alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 16 }}>{'Chỉnh sửa hồ sơ'}</Text>
          </View>
          <Icon name="chevron-right" size={35} color={colors.black} />
        </View>
      </TouchableOpacity>
    )
  }

  handleSignOut = () => {
    this.props.signOut()
    const navigateAction = NavigationActions.navigate({
      routeName: 'Login'
    });
    this.props.navigation.dispatch(navigateAction);
  }

  renderContextSignOut = () => {
    return (
      <TouchableOpacity
        onPress={() => this.handleSignOut()}
        style={styles.contextItem}>
        <Icon name="logout" size={25} color={colors.black} />
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', paddingLeft: 15, alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 16 }}>{'Đăng xuất'}</Text>
          </View>
          <Icon name="chevron-right" size={35} color={colors.black} />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <MainHeaderComponent isHiddenRightButton={true} onPressLeftButton={() => this.props.navigation.goBack()} title={'Trang thông tin'} leftButtonSource={<Icon name="keyboard-backspace" size={25} color={colors.white} />} />
        {this.renderContextInfo()}
        {this.renderContextEdit()}
        {this.renderContextSignOut()}
      </ScrollView>
    )
  }

}


const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state;
  return {
    isAuthenticated, user
  };
};
export default connect(mapStateToProps, loginAction)(UserInfoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9'
  },
  contextAvatar: {
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.mainBlue
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    paddingVertical: 10
  },
  contextItem: {
    height: 60,
    backgroundColor: colors.white,
    borderBottomColor: colors.gray,
    borderTopColor: colors.gray,
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    marginTop: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center'
  }
})