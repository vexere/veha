import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import {colors} from '../styles';
import Icon from 'react-native-vector-icons/dist/Feather';

export default class UserDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: this.props.navigation.getParam('info', null),
    };
  }
  handleCall = phoneNumber => {
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phoneNumber}`;
    } else {
      phoneNumber = `tel:${phoneNumber}`;
    }
    Linking.canOpenURL(phoneNumber).then(supported => {
      if (!supported) {
        alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    });
  };
  handleEmail = email => {
    const link = 'mailto:' + email + '?subject=SendMail&body=Description';
    Linking.canOpenURL(link)
      .then(supported => {
        if (supported) {
          Linking.openURL(link);
        } else {
          alert('Some error happend');
        }
      })
      .catch(err => {
        alert('Some error happend');
        console.log('An error occurred', err);
      });
  };
  render() {
    const {info} = this.state;
    if (info) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={styles.btnBack}>
                <Icon name="arrow-left" size={25} color={colors.white} />
              </TouchableOpacity>
              <Text style={styles.headerText}>User Info</Text>
              <TouchableOpacity
                onPress={() => this.handleCall(info[7])}
                style={{position: 'absolute', padding: 10, right: 10}}>
                <Icon name="phone-call" color={colors.burntOrange} size={27} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                marginHorizontal: 10,
              }}>
              <View style={{flex: 2}}>
                <Text style={styles.textHead}>Department: </Text>
                <Text style={styles.textHead}>FullName: </Text>
                <Text style={styles.textHead}>Main Workplace: </Text>
                <Text style={styles.textHead}>Role: </Text>
                <Text style={styles.textHead}>Phone Number: </Text>
                <Text style={styles.textHead}>Email: </Text>
                <Text style={styles.textHead}>Personal Email: </Text>
                <Text style={styles.textHead}>DOB: </Text>
              </View>
              <View style={{flex: 3}}>
                <Text style={styles.textDetail}>{info[3]}</Text>
                <Text style={styles.textDetail}>{info[4]}</Text>
                <Text style={styles.textDetail}>{info[2]}</Text>
                <Text style={styles.textDetail}>{info[5]}</Text>
                <Text
                  onPress={() => this.handleCall(info[7])}
                  style={styles.textDetail}>
                  {info[7]}
                </Text>
                <Text
                  onPress={() => this.handleEmail(info[8])}
                  style={styles.textDetail}>
                  {info[8]}
                </Text>
                <Text
                  onPress={() => this.handleEmail(info[9])}
                  style={styles.textDetail}>
                  {info[9]}
                </Text>
                <Text style={styles.textDetail}>
                  {info[10]}/{info[11]}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return null;
    }
  }
}
const styles = StyleSheet.create({
  textHead: {
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textDetail: {
    padding: 5,
    fontSize: 15,
  },
  header: {
    backgroundColor: colors.blue,
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnBack: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
});
