/**
 * @author Luận Nguyễn Hữu
 * @email huuluan0606@gmail.com
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import MainHeaderComponent from '../../components/headers/main-header.component'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
  colors,
} from '../../styles';

class NotificationDetail extends Component {

  constructor(props) {
    super(props)

    this.state = ({
      param: this.props.navigation.getParam('param') ? this.props.navigation.getParam('param') : null
    })
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.navigate('NotificationList')
    return true
  }

  render() {
    return (
      <View style={styles.container}>
        <MainHeaderComponent isHiddenRightButton={true} onPressLeftButton={() => this.handleBackButton()} title={this.state.param.title ? this.state.param.title : 'Chi tiết thông báo'} leftButtonSource={<Icon name="keyboard-backspace" size={25} color={colors.white} />} />
        <WebView
          originWhitelist={['*']}
          source={{ html: this.state.param.content }}
        />
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
export default connect(mapStateToProps, null)(NotificationDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9E9'
  },
})