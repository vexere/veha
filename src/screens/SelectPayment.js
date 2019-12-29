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
import PaymentMethods from '../components/PaymentMethod';
import * as Action from '../actions';
import { connect } from 'react-redux'
import { methodArr } from '../utils/Text';


class SelectPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: null
        }
    }
    handeSetMethod = (value) => {
        this.setState({ method: value })
        this.props.saveMethod(value)
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header navigation={this.props.navigation} />
                <Text>{this.props.phoneNumber}</Text>
                <Text>{this.props.cardValue}</Text>
                <PaymentMethods value={methodArr} onChange={(method) => {
                        // this.setState({ method: method })
                        this.props.saveMethod(method)
                    }} />
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Confirm')} style={styles.buttonPayWrapper}>
                    <Text style={styles.buttonText}>Pay</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
class PaymentMethod extends Component {
    render() {
        const { methodName, onSelect } = this.props
        return (
            <TouchableOpacity onPress={onSelect}>
                <View style={styles.methodItem}>
                    <View style={styles.circleCheckWrapper}>
                        <View style={styles.circleCheck} />
                    </View>
                    <Text style={styles.methodText} >{methodName}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
function mapStateToProps(state) {
    const { phoneNumber, cardValue } = state;
    return {
        phoneNumber, cardValue
    };
}

export default connect(mapStateToProps, Action)(SelectPayment);

const styles = StyleSheet.create({
    methodItem: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    methodText: {
        paddingLeft: 10,
        fontSize: 18
    },
    circleCheckWrapper: {
        width: 14, height: 14,
        backgroundColor: colors.lightBlue,
        borderRadius: 7, justifyContent: 'center'
    },
    circleCheck: {
        width: 7, height: 7,
        backgroundColor: colors.blue,
        borderRadius: 4,
        alignSelf: 'center'
    },
    circleUnCheck: {
        width: 7, height: 7,
        backgroundColor: colors.gray,
        borderRadius: 4,
        alignSelf: 'center'
    },
    buttonPayWrapper: {
        backgroundColor: colors.blue,
        padding: 10,
        margin: 5,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold'
    }
})