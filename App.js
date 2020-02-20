/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import FirstDisplayScreen from './src/screens/FirstDisplayScreen';
import {Provider} from 'react-redux';
import store from './src/stores';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <FirstDisplayScreen />
      </Provider>
    );
  }
}
