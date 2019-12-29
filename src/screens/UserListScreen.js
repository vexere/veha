import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet, TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { colors } from '../styles'

const SheetID = "1i-0Tq2Bc5lzJqoizxMeBA95dgQDSkmHLXt6eWLv94Cc";
const API_KEY = "AIzaSyDGZh57w33r9Gppui_6krQB-J5r0kazaXs";
const SheetName = "Danh%20Sách"
export default class UserListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            search: "",
            searchResult: []
        };
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        const url = 'https://sheets.googleapis.com/v4/spreadsheets/' + SheetID + '/values/' + SheetName + '!A9:M/?key=' + API_KEY;
        console.log(url)
        fetch(url,
            {
                method: 'GET',
            })
            .then(res => res.json())
            .then(resJson => {
                this.setState({ tableData: resJson.values })
            })
    }
    onSearch = (text) => {
        const { tableData } = this.state;
        this.setState({ search: text })
        var search = new RegExp(text, 'i'); // prepare a regex object
        let result = tableData.filter(item => search.test(item[4]));
        let result2 = tableData.filter(item => search.test(item[8]));
        // let primes = result.concat(result2);
        let primes = [...new Set([...result, ...result2])];
        console.log(primes);
        this.setState({ searchResult: primes })


    }
    render() {
        const { searchResult, tableData, search } = this.state;
        let data = tableData
        if (searchResult.length > 0) {
            data = searchResult
        }
        return (
            <View>
                <Text style={styles.headerText}> VXR - Contact List </Text>
                <View>
                    <TextInput value={this.state.search} onChangeText={(text) => this.onSearch(text)} placeholder="search" />
                    <Icon name="search" size={25} color={colors.blue} />
                </View>
                <View style={{ margin: 5 }}>
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'yellow'
                    }}>
                        <View style={[styles.rowCust, { width: 30 }]}>
                            <Text>No.</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Full Name</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Phone Number</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Vexere Email</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>Team.</Text>
                        </View>
                        <View style={[styles.rowCust, { width: 50 }]}>
                            <Text>DOB</Text>
                        </View>
                    </View>
                    {searchResult.length === 0 && search != "" ? <Text style={{alignSelf:'center'}}>no result</Text> :
                        data.map((item, key) => {
                            return (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('UserDetail', { info: item })} key={key} style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.rowCust, { width: 30 }]} size={16}>{item[0]}</Text>
                                    <Text style={styles.row} size={16}>{item[4]}</Text>
                                    <Text style={styles.row} size={16}>{item[7]}</Text>
                                    <Text style={styles.row} size={16}>{item[8]}</Text>
                                    <Text style={styles.row} size={16}>{item[3]}</Text>
                                    <Text style={[styles.rowCust, { width: 50 }]} size={16}>{item[10]}-{item[11]}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        alignSelf: 'center'
    },
    row: {
        flex: 1,
        borderColor: 'black',
        borderWidth: 1 / 2,
        padding: 2,
        justifyContent: 'center'
    },
    rowCust: {
        // width: 30,
        borderColor: 'black',
        borderWidth: 1 / 2,
        padding: 2,
        alignContent: 'center',
        justifyContent: 'center'
    }
})