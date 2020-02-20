import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet, TextInput, SafeAreaView, StatusBar, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import { colors } from '../styles'
import UserListScreen from './UserListScreen'
import TeamListScreen from './TeamListScreen'
import { connect } from 'react-redux';
import * as loginAction from '../actions'
const SheetID = "1i-0Tq2Bc5lzJqoizxMeBA95dgQDSkmHLXt6eWLv94Cc";
const API_KEY = "AIzaSyDMzmnG1bYziDhPlTZCUJZWcV0mSzpwX-c";
const SheetName = "Danh%20Sách"
class HomeScreen extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            search: "",
            searchResult: [],
            errMessage: "",
            refresh: false,
            userListTab: false,
            teamArr: [],
            userType: 'All',
            searchDepResult: [],
        };
        this.getUserTeam = this.getUserTeam.bind(this)
    }
    componentDidMount() {
        this._isMounted = true;

        this.getData()
    }
    componentWillUnmount() {
        this._isMounted = false;

        // this.getData.remove();
    }
    getData = () => {
        console.log('getData')
        const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SheetID + '/values/' + SheetName + '!A9:M/?key=' + API_KEY;

        fetch(url,
            {
                method: 'GET',
            })
            .then(res => res.json())
            .then(resJson => {
                console.log(resJson)
                if (resJson.values) {
                    console.log(resJson.values)
                    let arr = []
                    resJson.values.forEach(item => {
                        if (!arr.some(element => element.name === item[3])) {
                            const count = resJson.values.filter(element => element[3] === item[3]).length;
                            arr.push({ name: item[3], total: count })
                        }

                    })
                    this.setState({ tableData: resJson.values, errMessage: "", refresh: false, teamArr: arr })
                } else {
                    this.setState({ errMessage: "Can't get data", refresh: false })
                }
            }).catch(() => this.setState({ errMessage: "Can't get data", refresh: false }))
    }
    onSearch = (text) => {
        const { tableData, userListTab, userType } = this.state;
        this.setState({ search: text })
        var search = new RegExp(text, 'i'); // prepare a regex object
        let resultByName = tableData.filter(item => search.test(item[4]));
        let resultByEmail = tableData.filter(item => search.test(item[8]));
        let result = [...new Set([...resultByName, ...resultByEmail])];

        if (userListTab) {
            if (userType != "All") {
                result = result.filter(item => item[3] === userType);
            }
        }

        this.setState({ searchResult: result })
        // Search department
        //     let resultByName = teamArr.filter(item => search.test(item.name));
        //     console.log(resultByName)
        //     this.setState({ searchDepResult: resultByName })



    }
    onRefresh = () => {
        this.setState({ refresh: true }, function () { this.getData() });
    }
    getUserTeam = (team) => {
        const { tableData, search } = this.state;
        let result = tableData

        if (team !== "All") {
            result = tableData.filter(element => element[3] === team);
        }

        // if (team !== "All") {
        //     result = tableData.filter(element => element[3] === team);
        // }
        if (search != "") {
            var searchText = new RegExp(search, 'i'); // prepare a regex object
            let resultByName = result.filter(item => searchText.test(item[4]));
            let resultByEmail = result.filter(item => searchText.test(item[8]));
            result = [...new Set([...resultByName, ...resultByEmail])];
        }

        this.setState({ searchResult: result, userListTab: true, userType: team })
    }
    focus = () => {
        this.input.focus()
    }
    render() {
        const { searchResult, tableData, search, errMessage, refresh, teamArr, userType, userListTab, searchDepResult } = this.state;
        let data = tableData
        if (search === "") { //TH filter
            if (searchResult.length > 0) {
                data = searchResult
            }
        } else {
            data = searchResult
        }
        let countEmp = tableData.length;
        if (userListTab) {
            if (search != "") {
                countEmp = searchResult.length;
            } else {
                if (userType != "All") {
                    countEmp = data.length
                } else {
                    countEmp = tableData.length
                }
            }
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
                <View style={{ backgroundColor: colors.blue }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.inputWrapper}>
                            <TextInput ref={ref => this.input = ref}
                                style={styles.searchInput} value={this.state.search} onChangeText={(text) => this.onSearch(text)} placeholder="Search by name or email" />
                            <TouchableOpacity style={styles.icon} onPress={() => { search != "" ? this.onSearch("") : this.focus() }}>
                                <Icon name={search != "" ? "x" : "search"} size={25} color={colors.burntOrange} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => userListTab?this.setState({ userListTab: false, search: '', searchResult: [] }):null} style={[styles.tab, !userListTab ? { borderBottomColor: colors.burntOrange, } : {}]}>
                        <Text style={!userListTab ? styles.activeText : {}}>Department ({teamArr.length})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>!userListTab? this.setState({ userListTab: true, search: '', searchResult: [] }, () => this.getUserTeam('All')):null} style={[styles.tab, userListTab ? { borderBottomColor: colors.burntOrange, } : {}]}>
                        <Text style={userListTab ? styles.activeText : {}}>Employee ({countEmp})</Text>
                    </TouchableOpacity>
                </View>
                {userListTab ?
                    <UserListScreen
                        onRefresh={() => this.onRefresh()}
                        refresh={refresh}
                        search={search}
                        errMessage={errMessage}
                        data={data}
                        navigation={this.props.navigation}
                        userType={userType}
                        teamArr={teamArr}
                        getUserTeam={this.getUserTeam}
                    />
                    : <TeamListScreen
                        data={tableData}
                        errMessage={errMessage}
                        onRefresh={() => this.onRefresh()}
                        refresh={refresh}
                        search={search}
                        navigation={this.props.navigation}
                        teamArr={teamArr}
                        searchEmpResult={data}
                        searchDepResult={searchDepResult}
                        getUserTeam={this.getUserTeam} />}
            </SafeAreaView>
        );
    }
}
const mapStateToProps = (state) => {
    const { isAuthenticated, user } = state;
    return {
        isAuthenticated, user
    };
};
export default connect(mapStateToProps, loginAction)(HomeScreen);

const styles = StyleSheet.create({
    btnSignOut: {
        // position: 'absolute',
        // right: 0,
        // padding: 10
        marginHorizontal: 10
    },
    inputWrapper: {
        margin: 10,
        // marginHorizontal: 0,
        borderRadius: 10,
        borderColor: colors.blue,
        borderWidth: 1,
        backgroundColor: colors.white,
        flex: 1
    },
    searchInput: {
        padding: 5,
        marginRight: 40,
    },
    icon: {
        position: 'absolute',
        right: 0,
        padding: 5
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: colors.gray,
        borderBottomWidth: 2
    },
    activeText: { color: colors.burntOrange, fontWeight: 'bold' }
})