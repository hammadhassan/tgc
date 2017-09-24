import React from 'react'
import { TextInput, Text, View } from 'react-native'

export const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { containerStyle, inputStyle, labelStyle } = styles
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                style={{ height: 40, width: 150 }}
            />
        </View>
    )
}

const styles = {
    inputStyle: {
        padding: 4,
        height: 40,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        width: 200,
        alignSelf: "center"
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        // height: 40,
        flex: 1,
        // flexDirection: 'row',
        // align: 'center'
        alignItems: "center",
        justifyContent: "center"
    }
}