import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { colors } from '../../../styles'


export class NotificationItem extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    const { item, handleNavigateNotificationDetail, index } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => handleNavigateNotificationDetail(item, index)}>
        <Icon name="notifications-active" size={25} color={colors.mainBlue} ></Icon>
        <View style={styles.subContainer}>
          <Text style={item.isRead ? styles.titleRead : styles.titleUnread}>{item.title}</Text>
          <Text style={item.isRead ? styles.titleRead : null}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingLeft: 10
  },
  subContainer: {
    flex: 1,
    borderBottomWidth: 0.6,
    borderBottomColor: 'gray',
    paddingBottom: 10,
    marginLeft: 10
  },
  titleRead: {
    color: colors.gray,
  },
  titleUnread: {
    color: colors.mainBlue,
    fontWeight: 'bold',
    fontSize: 16
  }
})