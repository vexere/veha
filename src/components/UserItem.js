import React from 'react';
import {
    View, Text, TouchableOpacity,
    StyleSheet, Platform, Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import { colors } from '../styles'

const UserItem = ({ item, navigation }) => {
    const handleCall = phoneNumber => {
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phoneNumber}`;
        }
        else {
            phoneNumber = `tel:${phoneNumber}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
    }

    return (
        <View style={styles.itemWrapper} >
            <TouchableOpacity style={styles.detail} onPress={() => navigation.navigate('UserDetail', { info: item })}>
                <Text style={styles.textLarge}>{item[3]}</Text>
                <Text>{item[4]}</Text>
                <Text ><Icon name="phone" color={colors.blue} size={15} />  {item[7]}</Text>
                <Text><Icon name="mail" color={colors.blue} size={15} />  {item[8]}</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { info: item })}> */}
            <TouchableOpacity onPress={() => handleCall(item[7])} style={{ flex: 1, alignItems: 'center', }}>
                <Icon name="phone-call" color={colors.blue} size={30} />
            </TouchableOpacity>
        </View>
    );
}

export default UserItem;

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
        borderLeftColor: colors.blue,
        borderLeftWidth: 2,
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
        flex: 4,
        // backgroundColor: colors.red
        // marginRight: 20,
        paddingLeft: 20,
    },
    textLarge: {
        color: colors.blue,
        fontSize: 17,
        fontWeight: 'bold'
    },
    teamWrapper: {
        position: 'absolute', top: -10, left: 5, backgroundColor: colors.blue,
        borderRadius: 12,
        padding: 2,
        paddingHorizontal: 10,
        zIndex: 1
    }
})