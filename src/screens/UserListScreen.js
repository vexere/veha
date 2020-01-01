import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet, TextInput, SafeAreaView, FlatList, Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import { colors, dimensions } from '../styles'
import UserItem from '../components/UserItem'
import { connect } from 'react-redux';
import * as loginAction from '../actions'
const SheetID = "1i-0Tq2Bc5lzJqoizxMeBA95dgQDSkmHLXt6eWLv94Cc";
const API_KEY = "AIzaSyDMzmnG1bYziDhPlTZCUJZWcV0mSzpwX-c";
const SheetName = "Danh%20Sách"
class UserListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            search: "",
            searchResult: [],
            errMessage: "",
            refresh: false,
            userListTab: true,
            teamArr: [],
            userType: 'All'
        };
    }

    render() {
        const { data, navigation, userType, teamArr, getUserTeam, errMessage, search, refresh, onRefresh } = this.props
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 20, width: 150, borderWidth: 1, borderColor: colors.black, marginBottom: 10 }}>
                    <Picker
                        style={{ height: 30 }}
                        selectedValue={userType}
                        onValueChange={(itemValue, itemIndex) => getUserTeam(itemValue)}
                    >
                        <Picker.Item label="All" value="All" />
                        {teamArr.map((item, key) => { return <Picker.Item key={key} label={item.name} value={item.name} /> })}
                    </Picker>
                </View>

                {data.length === 0 && search != "" ? <Text style={{ alignSelf: 'center', padding: 20, color: colors.red }}>"{search}" not found</Text> : null}
                {errMessage != "" ? <Text style={{ alignSelf: 'center', padding: 20, color: colors.red }}>{errMessage}</Text> : null}
                <FlatList
                    refreshing={refresh}
                    onRefresh={onRefresh}
                    data={data}
                    renderItem={({ item }) =>
                        <UserItem item={item} navigation={navigation} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    const { isAuthenticated, user } = state;
    return {
        isAuthenticated, user
    };
};
export default connect(mapStateToProps, loginAction)(UserListScreen);

const styles = StyleSheet.create({
    headerWrapper: {
        backgroundColor: colors.blue,
        padding: 10
    },
    headerText: {
        fontSize: 20,
        alignSelf: 'center',
        color: colors.white
    },
    btnSignOut: {
        position: 'absolute',
        right: 0,
        padding: 10
    },
    inputWrapper: {
        margin: 10,
        borderRadius: 10,
        borderColor: colors.blue,
        borderWidth: 1
    },
    searchInput: {
        padding: 5,
        marginRight: 40
    },
    icon: {
        position: 'absolute',
        right: 0,
        padding: 5
    },
    itemWrapper: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.white,
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    detail: {
        flex: 1,
        marginRight: 20,
        paddingLeft: 10
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: colors.gray,
        borderBottomWidth: 2
    },
    teamWrapper: {
        backgroundColor: colors.white,
        width: (dimensions.fullWidth - 60) / 2,
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.blue,
        borderRadius: 15
    }
})