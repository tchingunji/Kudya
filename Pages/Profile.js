import { View, Text, Touchable, Image, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native-web';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from "expo-sqlite";
import foto from "../assets/user.png";

const db = SQLite.openDatabase("db.db");

export default function Profile({ route }) {

    const [user, setuser] = useState(route.params.dados2);

    function buscarDados() {
        db.transaction(tx => {
            tx.executeSql(
                "select* from user", [], (_, { rows }) => {
                    setuser(rows);
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
                    keyExtractor={(item) => item.nome}
                    data={user}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ marginBottom: 6, border: ' ', }} >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ fontWeight: "bold", margin: 8 }}>{item.nome}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ margin: 8 }}>{item.numTele}</Text>
                                <Text style={{ margin: 8 }}>{item.email}</Text>
                            </View>
                            <View>
                                <Text style={{ margin: 8 }}>{item.local}</Text>
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={foto} style={{ width: '100px', height: '100px', alignSelf: "center" }} />
            </View>
            <Banner />
        </View>
    )
}
