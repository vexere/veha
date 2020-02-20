import React, {Component} from 'react';
import {Text, SafeAreaView, Image, StatusBar} from 'react-native';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import * as action from '../actions';
import {colors} from '../styles';
import {connect} from 'react-redux';

class LoginScreen extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: colors.white,
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
        <Image source={require('../images/logo.png')} />
        <Text style={{padding: 20}}> Login with Google to continue </Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this.props.signIn()}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  action,
)(LoginScreen);
