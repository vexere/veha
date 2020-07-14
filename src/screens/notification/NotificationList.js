/**
 * @author Luận Nguyễn Hữu
 * @email huuluan0606@gmail.com
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

import MainHeaderComponent from '../../components/headers/main-header.component'

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  colors,
} from '../../styles'
import { DimensionScreen } from '../../utils';

import { NotificationItem } from './components/NotificationItem'

import firestore from '@react-native-firebase/firestore';
import { DeviceStorage } from '../../utils'
import { dataNotification } from '../../data'

import * as actionCommon from '../../actions'


class NotificationList extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      userGoogle: {},
      refreshing: false,
      data: [
        {
          "notificationId": "1",
          "content": "<!DOCTYPE html><html><body><p> This paragraph contains a lot of lines in the source code, but the browser ignores it. </p><p>This paragraphcontains a lot of spacesin the source code,but the browser ignores it.</p><p>The number of lines in a paragraph depends on the size of the browser window. If you resize the browser window, the number of lines in this paragraph will change.</p></body></html>",
          "title": "Khuyến mãi 1",
          "description": "Nhân dịp sinh nhật VeXeRe lần 7, tặng bạn nhiều phần quà hấp dẫn trong tháng 7 này. Hàng nghìn coupon 17k – 27k – 37k đang chờ bạn. Giúp bạn lựa chọn vé xe phù hợp nhất cho mùa hè cùng gia đình, bạn bè, người ấy.",
          "isRead": false
        },
        {
          "notificationId": "2",
          "content": "<!DOCTYPE html><html><body><p> This paragraph contains a lot of lines in the source code, but the browser ignores it. </p><p>This paragraphcontains a lot of spacesin the source code,but the browser ignores it.</p><p>The number of lines in a paragraph depends on the size of the browser window. If you resize the browser window, the number of lines in this paragraph will change.</p></body></html>",
          "title": "Khuyến mãi 2",
          "description": "Nhân dịp sinh nhật VeXeRe lần 7, tặng bạn nhiều phần quà hấp dẫn trong tháng 7 này. Hàng nghìn coupon 17k – 27k – 37k đang chờ bạn. Giúp bạn lựa chọn vé xe phù hợp nhất cho mùa hè cùng gia đình, bạn bè, người ấy.",
          "isRead": false
        },
        {
          "notificationId": "3",
          "content": "<!DOCTYPE html><html><body><p> This paragraph contains a lot of lines in the source code, but the browser ignores it. </p><p>This paragraphcontains a lot of spacesin the source code,but the browser ignores it.</p><p>The number of lines in a paragraph depends on the size of the browser window. If you resize the browser window, the number of lines in this paragraph will change.</p></body></html>",
          "title": "Khuyến mãi 3",
          "description": "Nhân dịp sinh nhật VeXeRe lần 7, tặng bạn nhiều phần quà hấp dẫn trong tháng 7 này. Hàng nghìn coupon 17k – 27k – 37k đang chờ bạn. Giúp bạn lựa chọn vé xe phù hợp nhất cho mùa hè cùng gia đình, bạn bè, người ấy.",
          "isRead": false
        },
        {
          "notificationId": "4",
          "content": "<!DOCTYPE html><html><body><p> This paragraph contains a lot of lines in the source code, but the browser ignores it. </p><p>This paragraphcontains a lot of spacesin the source code,but the browser ignores it.</p><p>The number of lines in a paragraph depends on the size of the browser window. If you resize the browser window, the number of lines in this paragraph will change.</p></body></html>",
          "title": "Khuyến mãi 4",
          "description": "Nhân dịp sinh nhật VeXeRe lần 7, tặng bạn nhiều phần quà hấp dẫn trong tháng 7 này. Hàng nghìn coupon 17k – 27k – 37k đang chờ bạn. Giúp bạn lựa chọn vé xe phù hợp nhất cho mùa hè cùng gia đình, bạn bè, người ấy.",
          "isRead": false
        }
      ]
    })


    this.onEndReachedCalledDuringMomentum = false;
  }

  async componentDidMount() {

    var deviceStorage = new DeviceStorage();
    var userGoogle = JSON.parse(await deviceStorage.getStorage('user'))
    this.setState({
      userGoogle: userGoogle
    }, () => {
      this.handleSaveDataNoti()
      this.handleFirebase()
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleSaveDataNoti = async () => {

    this.state.data.map((itemData, indexData) => {
      var snapshot = firestore().collection('Users').doc(this.state.userGoogle.user.id).collection(itemData.notificationId).doc(itemData.notificationId).get()
      // if (!snapshot.exists) {
      //   firestore().collection('Users').doc(userGoogle.user.id).collection(itemData.notificationId).doc(itemData.notificationId).set(itemData)
      // }
    })

  }

  handleFirebase = async () => {
    this.state.data.map(async (item, indexState) => {
      const snapshot = await firestore().collection('Users').doc(this.state.userGoogle.user.id).collection(item.notificationId).get()
      snapshot.docs.map((item, index) => {
        if (item.exists) {
          this.state.data[indexState] = item.data();
          this.setState({
            data: this.state.data
          }, () => {
            this.state.data.map((dataIndex) => {
              console.log(dataIndex, 'data noti')
              this.props.reloadNotification({
                isReload: true,
                item: dataIndex
              });
            })
          })
        }
      })
    })

  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate('Home')
    return true
  }

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.setState({
          refreshing: false,
        });
      },
    );
  };

  onEndReached = () => {
    this.onEndReachedCalledDuringMomentum = false;
    this.onEndReachedCalledDuringMomentum = true;
  };

  handleNavigateNotificationDetail = async (item, indexData) => {
    item.isRead = true;
    this.state.data[indexData].isRead = true

    this.props.reloadNotification({
      isReload: true,
      item: item
    });

    this.setState({
      data: this.state.data
    }, () => {
      var snapshot = firestore().collection('Users').doc(this.state.userGoogle.user.id).collection(item.notificationId).doc(item.notificationId).get()
      if (!snapshot.exists) {
        firestore().collection('Users').doc(this.state.userGoogle.user.id).collection(item.notificationId).doc(item.notificationId).set(item)
      }
      this.props.navigation.navigate('NotificationDetail', {
        param: item
      })
    })
    return true
  }

  renderNotificationList = () => {
    return (
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => index.toString()}
        data={this.state.data}
        bounces={true}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={this.onEndReached}
        ListFooterComponent={this.renderFooter}

        renderItem={({ item, index }) => {
          return (
            <NotificationItem key={index.toString()} index={index} handleNavigateNotificationDetail={this.handleNavigateNotificationDetail} item={item} />
          )
        }}
      >

      </FlatList>
    )
  }

  renderFooter = () => {
    return <View style={styles.footer} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <MainHeaderComponent isHiddenRightButton={true} onPressLeftButton={() => this.handleBackButton()} title={'Danh sách thông báo'} leftButtonSource={<Icon name="keyboard-backspace" size={25} color={colors.white} />} />
        <View style={styles.subContainer}>
          {this.renderNotificationList()}
        </View>
      </View>
    );
  }


}
const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state;
  return {
    isAuthenticated, user
  };
};
export default connect(mapStateToProps, actionCommon)(NotificationList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9'
  },
  subContainer: {
    flex: 1
  },
  footer: {
    height: DimensionScreen.scale(50)
  },
})