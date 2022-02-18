import { View, Text } from 'react-native';
import React from 'react';
import Home from "../Pages/Home";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../Pages/Login";
import Detalhe from '../Pages/Detalhe';
import DetalheComida from '../Pages/DetalheComida';
import BottomTab from '../Pages/BottomTab';
import Historico from '../Pages/Historico';
import Pratos from '../Pages/HomeSegunda';
import Profile from '../Pages/Profile';

const Stack = createNativeStackNavigator();

export default function Teste(props) {
    const screenOptions = { headerShown: false, };
    if (props.id == 0) {
        return (<Login />);
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
                    <Stack.Screen name='Home' component={Home} />
                    <Stack.Screen name='Detalhe' component={Detalhe} />
                    <Stack.Screen name='DetalheComida' component={DetalheComida} />
                    <Stack.Screen name='BottomTab' component={BottomTab} />
                    <Stack.Screen name='Historico' component={Historico} />
                    <Stack.Screen name='Pratos' component={Pratos} />
                    <Stack.Screen name='Restaurantes' component={Home} />
                    <Stack.Screen name='Profile' component={Profile} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
