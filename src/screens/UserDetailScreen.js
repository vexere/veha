import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../styles'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export default class UserDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.navigation.getParam('info', null)
        };
    }

    render() {
        const { info } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.btnBack}>
                            <Icon name="address-book"   color={colors.white} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>User Info</Text>
                    </View>
                    <Icon name="arrow-left" size={25} color={colors.blue} />
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.textHead}>FullName: </Text>
                            <Text style={styles.textHead}>Phone Number: </Text>
                            <Text style={styles.textHead}>Email: </Text>
                            <Text style={styles.textHead}>Team: </Text>
                            <Text style={styles.textHead}>DOB: </Text>
                        </View>
                        <View style={{ flex: 3}}>
                            <Text style={styles.textDetail}>{info[4]}</Text>
                            <Text style={styles.textDetail}>{info[7]}</Text>
                            <Text style={styles.textDetail}>{info[8]}</Text>
                            <Text style={styles.textDetail}>{info[3]}</Text>
                            <Text style={styles.textDetail}>{info[10]}/{info[11]}</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    textHead: {
        padding: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
    textDetail: {
        padding: 5,
        fontSize: 15,
    },
    header: {
        backgroundColor: colors.blue,
        padding: 10,
        alignItems: 'center'
    },
    headerText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 18
    },
    btnBack: {
        position: 'absolute',
        left: 0,
        padding: 15
    },
})