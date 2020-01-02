import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/dist/Feather';
import { colors, dimensions } from '../styles'
import UserItem from '../components/UserItem'
export default class TeamListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { teamArr, getUserTeam, search, refresh, onRefresh, errMessage, navigation, searchEmpResult } = this.props;
        return (
            <View style={{ flex: 1 }}>
                {searchEmpResult.length === 0 && search != "" ? <Text style={styles.errMessage}>"{search}" not found</Text> : null}
                {errMessage != "" ? <Text style={styles.errMessage}>{errMessage}</Text> : null}
                {search != "" ?
                    <FlatList
                        refreshing={refresh}
                        onRefresh={onRefresh}
                        data={searchEmpResult}
                        renderItem={({ item }) =>
                            <UserItem item={item} navigation={navigation} />
                        }
                        keyExtractor={(item, index) => index.toString()}
                        key={"searchResult"}
                    /> :
                    <FlatList style={{ margin: 10 }}
                        key={"tempData"}
                        refreshing={refresh}
                        onRefresh={onRefresh}
                        data={teamArr}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => getUserTeam(item.name)}
                                style={styles.teamWrapper}
                            >
                                <Icon name="users" color={colors.blue} size={30} />
                                <Text style={{}}>Total: {item.total}</Text>
                                <View style={styles.txtWrapper}>
                                    <Text style={{ color: colors.white }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    />}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    teamWrapper: {
        backgroundColor: colors.white,
        width: (dimensions.fullWidth - 60) / 2,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 20,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.blue,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    txtWrapper: {
        // position: 'absolute',
        // bottom: 0, 
        backgroundColor: colors.blue,
        width: (dimensions.fullWidth - 60) / 2,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    errMessage: {
        alignSelf: 'center',
        padding: 20,
        color: colors.red
    }
})