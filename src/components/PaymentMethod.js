import React, { Component } from 'react';
import {
    Text, View, StyleSheet, TouchableWithoutFeedback, FlatList
} from 'react-native'
import { colors, dimensions } from '../styles'

export default class PaymentMethod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeOption: this.props.defaultOption
        };
    }
    updateActiveOption = (activeOption) => {
        this.setState({
            activeOption,
        });
    };


    render() {
        const { value } = this.props
        return (
            <View style={styles.container}>
                <FlatList data={value}
                    renderItem={({ item }) => <Button activeOption={this.state.activeOption} item={item}
                        onSelect={() => {
                            this.props.onChange(item);
                            this.updateActiveOption(item)
                        }}
                    />}
                    keyExtractor={(item, key) => key}
                    numColumns={1} />
            </View>
        );
    }
}
class Button extends Component {
    render() {
        const { item, activeOption, onSelect } = this.props
        return (
            <TouchableWithoutFeedback onPress={onSelect} >
                <View style={styles.methodItem}>
                    <View style={styles.circleCheckWrapper}>
                        <View style={activeOption === item ? styles.circleCheck : styles.circleUnCheck} />
                    </View>
                    <Text style={styles.methodText} >{item}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
        marginTop: 20
    },
    btnOption: {
        width: (dimensions.fullWidth - 40) / 3,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        margin: 5
    },
    txtOption: {
        fontSize: 12
    },
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
    methodText: {
        paddingLeft: 10,
        fontSize: 18
    },
})