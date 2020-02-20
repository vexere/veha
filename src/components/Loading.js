import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { colors } from '../styles'

const Loading = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            <ActivityIndicator size="large" color={colors.blue} />
        </View>
    )
}

export default Loading;