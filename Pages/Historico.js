import { View, Text, Touchable, Image, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native-web';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export default function Historico({ route }) {

    const [pedidos, setPedidos] = useState(route.params.dados);

    function buscarDados() {
        db.transaction(tx => {
            tx.executeSql(
                "select* from pedido", [], (_, { rows }) => {
                    setPedidos(rows);
                }
            );
        });
    }

    useEffect(() => {
        buscarDados();
    }, []);

    const Banner = () => {
        return (
            <View style={{ padding: '10px', backgroundColor: '#fff' }}>

                <FlatList
                    keyExtractor={(item) => item.preco}
                    data={pedidos}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ flexDirection: "row", marginBottom: 6, border: ' ', }} >
                            <View style={{ flexDirection: "row", alignItems: "center", borderBottomColor: "1px solid #F00" }}>
                                <Text style={{ fontWeight: "bold", margin: 8 }}>{item.nomePrato}</Text>
                                <Text style={{ fontWeight: "bold", margin: 8 }}>{item.preco}</Text>
                                <Text style={{ fontWeight: "bold", margin: 8 }}>{item.estado}</Text>
                                <Text style={{ fontWeight: "bold", margin: 8 }}>{item.restaurante}</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: "#00F", textDecorationLine: "underline" }}>State</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                    )}
                />

            </View>
        );
    }
    return (
        <View style={{ backgroundColor: "#fff", padding: '24px' }}>
            <TouchableOpacity onPress={() => route.params.navegacao.goBack()} style={{ marginBottom: '11px' }}>
                <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ alignSelf: "center", fontSize: 16, fontWeight: "bold" }}>Histórico</Text>
            </View>
            <Banner />
        </View>
    )
}
