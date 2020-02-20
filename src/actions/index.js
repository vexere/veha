import { GoogleSignin } from '@react-native-community/google-signin';
import Configs from 'react-native-config'

GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: Configs.WEB_CLIENT_ID,
    offlineAccess: false,
});

export const signIn = () => {
    return async (dispatch) => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            dispatch(signInSuccess(userInfo.user));
        } catch (error) {
            console.log(error)
            console.log(error.code)
            dispatch(receiveLogout());
        }
    }
}
export const signOut = () => {
    return async (dispatch) => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            dispatch(receiveLogout());
        } catch (exception) {
            console.log(exception)
        }
    }
}
export const checkLogin = () => {
    return async (dispatch) => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            if (userInfo) {
                dispatch(signInSuccess(userInfo.user));
            }else{
                dispatch(receiveLogout());
            }
        } catch (error) {
            dispatch(receiveLogout());
            console.log(error)
        }
    }
}

const receiveLogout = () => {
    return {
        type: 'SIGN_OUT'
    }
}
const signInSuccess = user => {
    return {
        type: 'SIGN_IN_SUCCESS',
        user: user
    }
}