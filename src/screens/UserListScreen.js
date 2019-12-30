import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet, TextInput, SafeAreaView, FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import { colors } from '../styles'
import Loading from '../components/Loading'
import { connect } from 'react-redux';
import * as loginAction from '../actions'
const SheetID = "1i-0Tq2Bc5lzJqoizxMeBA95dgQDSkmHLXt6eWLv94Cc";
const API_KEY = "AIzaSyBgABiJC-GtyCIwKco5fodMBr6PHIaaajY";
const SheetName = "Danh%20Sách"
class UserListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            search: "",
            searchResult: [],
            errMessage: "",
            refresh: false
        };
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SheetID + '/values/' + SheetName + '!A9:M/?key=' + API_KEY;
        fetch(url,
            {
                method: 'GET',
            })
            .then(res => res.json())
            .then(resJson => {
                if (resJson.values) {
                    this.setState({ tableData: resJson.values, errMessage: "", refresh: false })
                } else {
                    this.setState({ errMessage: "Can't get data", refresh: false })
                }
            }).catch(() => this.setState({ errMessage: "Can't get data", refresh: false }))
    }
    onSearch = (text) => {
        const { tableData } = this.state;
        this.setState({ search: text })
        var search = new RegExp(text, 'i'); // prepare a regex object
        let resultByName = tableData.filter(item => search.test(item[4]));
        let resultByEmail = tableData.filter(item => search.test(item[8]));
        let result = [...new Set([...resultByName, ...resultByEmail])];
        this.setState({ searchResult: result })
    }
    onRefresh = () => {
        this.setState({ refresh: true }, function () { this.getData() });
    }
    render() {
        const { searchResult, tableData, search, errMessage, refresh } = this.state;
        let data = tableData
        if (search != "") {
            data = searchResult
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}> VXR - Contact List </Text>
                    <Icon style={styles.btnSignOut} name="log-out" size={22} color={colors.burntOrange} onPress={() => this.props.signOut()} />
                </View>
                <Text style={{ alignSelf: 'flex-end', padding: 10 }} >Hello {this.props.user.name}!</Text>
                <View style={styles.inputWrapper}>
                    <TextInput style={styles.searchInput} value={this.state.search} onChangeText={(text) => this.onSearch(text)} placeholder="Enter email or name" />
                    <TouchableOpacity style={styles.icon} onPress={() => this.setState({ search: '', searchResult: '' })}>
                        <Icon name={search != "" ? "x" : "search"} size={25} color={colors.burntOrange} />
                    </TouchableOpacity>
                </View>
                {data.length === 0 && search != "" ? <Text style={{ alignSelf: 'center', padding: 20, color: colors.red }}>"{search}" not found</Text> : null}
                {errMessage != "" ? <Text style={{ alignSelf: 'center', padding: 20, color: colors.red }}>{errMessage}</Text> : null}
                <FlatList
                    refreshing={refresh}
                    onRefresh={() => this.onRefresh()}
                    data={data}
                    renderItem={({ item }) => <TouchableOpacity style={styles.itemWrapper} onPress={() => this.props.navigation.navigate('UserDetail', { info: item })} >
                        <Icon name="user" color={colors.burntOrange} size={30} style={{ padding: 10 }} />
                        <View style={styles.detail}>
                            <Text>{item[4]}</Text>
                            <Text>{item[7]}</Text>
                            <Text>{item[8]}</Text>
                        </View>
                        <Icon name="chevron-right" color={colors.blue} size={30} style={{ position: 'absolute', right: 0 }} />
                    </TouchableOpacity>}
                    keyExtractor={(item, index) => index}
                />

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
    }
})