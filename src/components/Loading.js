import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../styles';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
  },
});
