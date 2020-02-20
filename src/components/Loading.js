import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors} from '../styles';

export default class Loading extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          // alignItems: 'center',
          // alignSelf: 'center',
        }}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }
}
