import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import * as action from '../actions'
import { colors } from '../styles'
import { connect } from 'react-redux';
class LoginScreen extends Component {
    // signIn = async () => {
    //     this.props.signIn();
    // };
    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.white, alignContent: 'center', alignItems: 'center' }}>
                <Image source={require('../images/logo.png')} />
                <Text style={{ padding: 20 }}> Login with Google to continue </Text>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => this.props.signIn()} />
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
    };
};
export default connect(mapStateToProps, action)(LoginScreen);