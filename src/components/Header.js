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

export default class Header extends Component {
    render() {
        let goBack=true;
        if (this.props.goBack||this.props.goBack===false) {
            goBack=false;
        }
        return (
            <View style={styles.container}>
                {goBack ?
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.btnBack}>
                        <Icon name="arrow-left" size={25} color={colors.white} />
                    </TouchableOpacity> : null}

                <Text style={styles.headerText}>{this.props.headerText ? this.props.headerText : " E-Wallet"} </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.blue,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnBack: {
        position: 'absolute',
        left: 0,
        padding: 15
    },
    headerText: {
        color: colors.white,
        fontSize: 15
    }
})