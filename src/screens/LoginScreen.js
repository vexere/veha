import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
GoogleSignin.configure({
    offlineAccess: false,
    webClientId: '934737958209-84gp6j44u7qnsi7t2pmgkg5tc0gac8qe.apps.googleusercontent.com'
});
export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        };
    }
    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            this.setState({ userInfo });
        } catch (error) {
            console.log(error)
            console.log(error.code)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    render() {
        return (
            <View>
                <Text> LoginScreen </Text>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={()=>this.signIn()}
                    disabled={this.state.isSigninInProgress} />
            </View>
        );
    }
}
