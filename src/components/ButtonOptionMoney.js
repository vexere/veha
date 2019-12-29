import React, { Component } from 'react'
import {
    View, Text, SafeAreaView,
    TextInput, TouchableOpacity,
    Platform, Modal, FlatList,
    Image, TouchableWithoutFeedback,
    Alert, StyleSheet
} from 'react-native'
import { colors, dimensions } from '../styles';
import Icon from 'react-native-vector-icons/dist/Feather';

export default class ButtonOptionMoney extends Component {
    render() {
        const { value } = this.props
        return (
            <TouchableOpacity style={styles.buttonWrapper}>
                <Text>{value} VND</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonWrapper: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 5,
        padding:10,
        margin:5
    }
})