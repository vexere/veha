import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet, TextInput, SafeAreaView, StatusBar, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import { colors, dimensions } from '../styles'
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
            focus: false
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
        const { tableData, userListTab, teamArr } = this.state;
        this.setState({ search: text })
        var search = new RegExp(text, 'i'); // prepare a regex object
        if (userListTab) {
            let resultByName = tableData.filter(item => search.test(item[4]));
            let resultByEmail = tableData.filter(item => search.test(item[8]));
            let result = [...new Set([...resultByName, ...resultByEmail])];
            this.setState({ searchResult: result })
        } else {
            let resultByName = teamArr.filter(item => search.test(item.name));
            console.log(resultByName)
            this.setState({ searchDepResult: resultByName })
        }

    }
    onRefresh = () => {
        this.setState({ refresh: true }, function () { this.getData() });
    }
    getUserTeam = (team) => {
        const { tableData } = this.state;
        let result = tableData
        if (team !== "All") {
            result = tableData.filter(element => element[3] === team);
        }

        this.setState({ searchResult: result, userListTab: true, userType: team })
    }
    focus = () => {
        this.setState({ focus: true }, () => this.input.focus())
    }
    render() {
        const { searchResult, tableData, search, errMessage, refresh, teamArr, userType, userListTab, searchDepResult, focus } = this.state;
        let data = tableData
        if (search === "") { //TH filter
            if (searchResult.length > 0) {
                data = searchResult
            }
        } else {
            data = searchResult
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor={colors.blue} barStyle="light-content" />
                <View style={{ backgroundColor: colors.blue }}>
                    {focus ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ focus: false }, () => Keyboard.dismiss())}>
                            <Icon name="arrow-left" size={25} color={colors.burntOrange} />

                        </TouchableOpacity>
                        <View style={styles.inputWrapper}>
                            <TextInput ref={ref => this.input = ref}
                                style={styles.searchInput} value={this.state.search} onChangeText={(text) => this.onSearch(text)} placeholder="Search" />
                            <TouchableOpacity style={styles.icon} onPress={() => this.setState({ search: '', searchResult: '' })}>
                                <Icon name={search != "" ? "x" : "search"} size={25} color={colors.burntOrange} />
                            </TouchableOpacity>
                        </View>
                    </View> :
                        <View style={{ padding: 17, justifyContent:'center',   }}>
                            <Text onPress={() => this.focus()} style={{ fontSize:15, color:colors.white, fontWeight:'700'}}>SEARCH</Text>
                            <Icon style={styles.btnSignOut} name="log-out" size={22} color={colors.burntOrange} onPress={() => this.props.signOut()} />
                        </View>
                    }
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => this.setState({ userListTab: !userListTab })} style={[styles.tab, !userListTab ? { borderBottomColor: colors.burntOrange, } : {}]}>
                        <Text style={!userListTab ? styles.activeText : {}}>Department</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ userListTab: !userListTab })} style={[styles.tab, userListTab ? { borderBottomColor: colors.burntOrange, } : {}]}>
                        <Text style={userListTab ? styles.activeText : {}}>Employee</Text>
                    </TouchableOpacity>
                </View>
                {userListTab ? <UserListScreen onRefresh={() => this.onRefresh()} refresh={refresh} search={search} errMessage={errMessage} data={data} navigation={this.props.navigation} userType={userType} teamArr={teamArr}
                    getUserTeam={this.getUserTeam}
                />
                    : <TeamListScreen errMessage={errMessage} onRefresh={() => this.onRefresh()} refresh={refresh} search={search} teamArr={teamArr} searchDepResult={searchDepResult} getUserTeam={this.getUserTeam} />}
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
        position: 'absolute',
        right: 0,
        padding: 10
    },
    inputWrapper: {
        margin: 7,
        marginLeft: 0,
        borderRadius: 10,
        borderColor: colors.blue,
        borderWidth: 1,
        backgroundColor: colors.white,
        flex: 1
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