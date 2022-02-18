import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function BottomTab({ props }) {

    const Icons = (props) => (
        <TouchableOpacity>
            <View>
                <Icon name={props.icon} size={25} color="#000"
                    style={{
                        marginBottom: 3,
                        alignSelf: "center",
                    }} />
                <Text>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ flexDirection: "row", margin: 10, marginHorizontal: 30, justifyContent: "space-between" }}>
            <Icons icon="home" text='Home' link="home" />
            <Icons icon="search" text='Pesquisa' link="home" />
            <Icons icon="shopping-bag" text='Historico' link="History" />
            <Icons icon="user" text='Perfil' link="Profile" />
        </View>
    )
}

