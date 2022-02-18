import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-web'

export default function Search() {
    return (
        <View>
            <TextInput
                placeholder="Pesquisa Restaurante"
                style={{ padding: '10px', backgroundColor: "#eee" }}
            />
        </View>
    )
}