import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '786177498507-js69bv21uitfgvnc6ba5l9p7gm15i6tg.apps.googleusercontent.com',
    offlineAccess: false,
});
export function signIn() {
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
export function signOut() {
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
export function checkLogin() {
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
function receiveLogout() {
    return {
        type: 'SIGN_OUT'
    }
}
function signInSuccess(user) {
    return {
        type: 'SIGN_IN_SUCCESS',
        user: user
    }
}