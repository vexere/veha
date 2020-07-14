import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as loginAction from '../actions'
import Main, { LoggedIn } from '../navigators'
import { View, Text } from 'react-native';
import Loading from '../components/Loading';

import messaging from '@react-native-firebase/messaging'
import { NavigationActions } from 'react-navigation';


// => Should be Splash Screen
class FirstDisplayScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }


  componentDidMount() {

    console.log(this.props, 123)

    const defaultAppMessaging = messaging()
    // Your token notification
    //console.log(await defaultAppMessaging.getToken())

    defaultAppMessaging.setBackgroundMessageHandler(async dataNoti => {
      //Handle in app
      return
    });

    // defaultAppMessaging.onNotificationOpenedApp(async remoteMessage => {
    //   console.log('Open app', remoteMessage);
    // });



    this.props.checkLogin().then(() => {
      const { isAuthenticated, user } = this.props;
      if (isAuthenticated && user) {
        defaultAppMessaging.getInitialNotification().then(dataNoti => {
          if (dataNoti && dataNoti.data) {
            console.log(dataNoti.data)
            // this.props.navigation(NavigationActions.navigate({ routeName: 'NotificationList' }))
            const navigateAction = NavigationActions.navigate({
              routeName: 'NotificationList'
            });
            this.props.navigation.dispatch(navigateAction);
            return
          }
        });
      }
    });
  }

  navigateMessage = () => {
    this.props.navigation.navigate('UserDetail')
  }

  render() {
    const { isAuthenticated, user } = this.props;

    if (isAuthenticated === null) {
      return (
        <Loading />
      );
    } else if (isAuthenticated && user !== null) {
      if (user === null) {
        return (
          <Loading />

        );
      }
      else {
        return (
          <LoggedIn />
        );
      }
    } else {
      return <Main />
    }
  }
}
const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state;
  return {
    isAuthenticated, user
  };
};
export default connect(mapStateToProps, loginAction)(FirstDisplayScreen);
