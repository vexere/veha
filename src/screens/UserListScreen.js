import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Picker} from 'react-native';
import {colors, dimensions} from '../styles';
import UserItem from '../components/UserItem';
import {connect} from 'react-redux';
import * as loginAction from '../actions';

class UserListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      search: '',
      searchResult: [],
      errMessage: '',
      refresh: false,
      userListTab: true,
      teamArr: [],
      userType: 'All',
    };
  }

  render() {
    const {
      data,
      navigation,
      userType,
      teamArr,
      getUserTeam,
      errMessage,
      search,
      refresh,
      onRefresh,
    } = this.props;
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            marginHorizontal: 20,
            width: 150,
            borderWidth: 1,
            borderColor: colors.black,
            marginBottom: 10,
          }}>
          <Picker
            style={{height: 30}}
            selectedValue={userType}
            onValueChange={(itemValue, itemIndex) => getUserTeam(itemValue)}>
            <Picker.Item label="All" value="All" />
            {teamArr.map((item, key) => {
              return (
                <Picker.Item key={key} label={item.name} value={item.name} />
              );
            })}
          </Picker>
        </View>

        {data.length === 0 && search !== '' ? (
          <Text style={{alignSelf: 'center', padding: 20, color: colors.red}}>
            "{search}" not found
          </Text>
        ) : null}
        {errMessage !== '' ? (
          <Text style={{alignSelf: 'center', padding: 20, color: colors.red}}>
            {errMessage}
          </Text>
        ) : null}
        <FlatList
          refreshing={refresh}
          onRefresh={onRefresh}
          data={data}
          renderItem={({item}) => (
            <UserItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {isAuthenticated, user} = state;
  return {
    isAuthenticated,
    user,
  };
};
export default connect(
  mapStateToProps,
  loginAction,
)(UserListScreen);
