import React, { Component } from 'react';
import { Text, SafeAreaView, Image, StatusBar, BackHandler, Alert } from 'react-native';
import { GoogleSigninButton, } from '@react-native-community/google-signin';
import { colors } from '../styles'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';


import * as loginAction from '../actions'

class LoginScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.props.signOut()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => this.props.navigation.navigate('Login'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;
  }

  handleSignIn = () => {
    this.props.signIn().then(() => {
      const { isAuthenticated, user } = this.props;
      var navigateAction = null;
      if (isAuthenticated && user) {
        navigateAction = NavigationActions.navigate({
          routeName: 'Main'
        });
        this.props.navigation.dispatch(navigateAction);
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.white, alignContent: 'center', alignItems: 'center' }}>
        <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
        <Image source={require('../images/logo.png')} />
        <Text style={{ padding: 20 }}> Login with Google to continue </Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this.handleSignIn()} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state;
  return {
    isAuthenticated, user
  };
};
export default connect(mapStateToProps, loginAction)(LoginScreen);