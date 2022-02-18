import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-web'

export default function BottomTab() {
    return (
        <View style={{ flexDirection: "row", backgroundColor: "#000", padding: '7px' }}>

            <View style={{ marginRight: '40px' }}>
                <TouchableOpacity>
                    <Text style={{ color: "#FFF" }}>Restaurante</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginRight: '30px' }}>
                <TouchableOpacity>
                    <Text style={{ color: "#FFF" }}>Deal</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginRight: '10px' }}>
                <TouchableOpacity>
                    <Text style={{ color: "#FFF" }}>Cart</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}