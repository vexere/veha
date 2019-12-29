/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import UserListScreen from './src/screens/UserListScreen'
import LoginScreen from './src/screens/LoginScreen'
import Main from './src/navigators'
import { Provider } from 'react-redux'
import store from './src/stores'
export default class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      //   <Main />
      // </Provider>
      <Main />
    );
  }
}
