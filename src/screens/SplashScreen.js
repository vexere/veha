import React, { Component } from 'react'
import { View, ActivityIndicator, Text, Alert, BackHandler } from 'react-native'
import { colors } from '../styles'
import { connect } from 'react-redux';
import * as loginAction from '../actions'
import { NavigationActions } from 'react-navigation';
import messaging from '@react-native-firebase/messaging'

class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {

    const defaultAppMessaging = messaging()
    console.log(await defaultAppMessaging.getToken())

    setTimeout(() => {

      const { isAuthenticated, user } = this.props;
      const defaultAppMessaging = messaging();
      var navigateAction = null;

      defaultAppMessaging.getInitialNotification().then(dataNoti => {
        this.props.checkLogin().then(() => {
          if (dataNoti && dataNoti.data && isAuthenticated && user) {
            this.props.navigation.navigate('NotificationDetail', {
              param: dataNoti.data
            })
          } else {
            if (isAuthenticated && user) {
              navigateAction = NavigationActions.navigate({
                routeName: 'Main'
              });
              this.props.navigation.dispatch(navigateAction);
            } else {
              navigateAction = NavigationActions.navigate({
                routeName: 'Login'
              });
              this.props.navigation.dispatch(navigateAction);
            }
          }
        })
      });




    }, 1000)
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
        <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>SplashScreen</Text>
      </View>
    )
  }
}



const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state;
  return {
    isAuthenticated, user
  };
};
export default connect(mapStateToProps, loginAction)(SplashScreen);
