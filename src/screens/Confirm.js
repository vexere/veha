import React, { Component } from 'react'
import {
    View, Text, SafeAreaView,
    TextInput, TouchableOpacity,
    Platform, Modal, FlatList,
    Image, TouchableWithoutFeedback,
    Alert, StyleSheet
} from 'react-native'
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { colors, dimensions } from '../styles';
import Icon from 'react-native-vector-icons/dist/Feather';
import Header from '../components/Header';
import * as action from '../actions';
import { connect } from 'react-redux'

class Confirm extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <Header navigation={this.props.navigation} headerText="Confirm information" />
                <View style={styles.inforWrapper}>
                    <Text style={styles.title}>Payment method</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.white, marginVertical: 5, paddingVertical: 10 }}>
                        <Text style={styles.textDetail}>{this.props.paymentMethod}</Text>
                        <Text onPress={() => null} style={[styles.textDetail, { color: colors.blue }]}>Change</Text>
                    </View>
                    <Text style={styles.title}>Transaction details</Text>
                    <View style={{ backgroundColor: colors.white, flexDirection: 'row' }}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.textDetail}>Phone Number </Text>
                            <Text style={styles.textDetail}>Total </Text>
                            <Text style={styles.textDetail}>Total amount</Text>
                        </View>
                        <View style={{ flex: 3, }}>
                            <Text style={styles.textDetail}>{this.props.phoneNumber}</Text>
                            <Text style={styles.textDetail}>{this.props.cardValue} VND</Text>
                            <Text style={styles.textDetail}>{this.props.cardValue} VND</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.btnPay}>
                    <Text style={styles.btnPayText}>Confirm</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
function mapStateToProps(state) {
    const { phoneNumber, cardValue, paymentMethod } = state;
    return {
        phoneNumber, paymentMethod, cardValue
    };
}
export default connect(mapStateToProps, action)(Confirm);
const styles = StyleSheet.create({
    btnPay: {
        backgroundColor: colors.redOrange,
        padding: 10,
        margin: 10,
        alignItems: 'center'
    },
    btnPayText: {
        color: colors.white
    },
    inforWrapper: {
        flex: 1,
        margin: 5,
        // justifyContent:'space-between'
    },
    title: {
        fontSize: 18,
        padding: 5
    },
    textDetail: {
        padding: 10
    }
})