/**
 * @author Luận Nguyễn Hữu
 * @email huuluan0606@gmail.com
 */
import {
  GoogleSignin,
  statusCodes
} from '@react-native-community/google-signin';
import {
  NavigationActions
} from 'react-navigation';

GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  offlineAccess: false,
});

import {
  DeviceStorage
} from '../utils'

export function signIn() {
  return async (dispatch) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      let deviceStorage = new DeviceStorage();
      deviceStorage.setStorage('user', userInfo);

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
      } else {
        dispatch(receiveLogout());
      }

    } catch (error) {
      dispatch(receiveLogout());
      console.log(error)
    }
  }
}

export function receiveLogout() {
  return {
    type: 'SIGN_OUT'
  }
}

export function signInSuccess(user) {
  return {
    type: 'SIGN_IN_SUCCESS',
    user: user
  }
}