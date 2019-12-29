import React, { Component } from 'react';
import {
    Text, View, StyleSheet, TouchableWithoutFeedback, FlatList
} from 'react-native'
import { colors, dimensions } from '../styles'
export default class ButtonGroup extends Component {
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
                    numColumns={3} />
            </View>
        );
    }
}
class Button extends Component {
    render() {
        const { item, activeOption, onSelect } = this.props
        return (
            <TouchableWithoutFeedback onPress={onSelect} >
                <View style={[styles.btnOption, { backgroundColor: activeOption === item ? colors.lightBlue : colors.white }]}>
                    <Text style={styles.txtOption}> {parseFloat(item).toLocaleString()}  VNĐ</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin:5,
        marginTop:20
    },
    btnOption: {
        width:(dimensions.fullWidth-40)/3,
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
})