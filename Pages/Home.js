import { View, Text, Touchable, Image, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native-web';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomTab from '../Pages/BottomTab';
import HeaderTabs from '../Pages/HeaderTabs';
import SearchBar from '../Pages/SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export default function Home({ navigation }) {

    const [restaurante, setrestaurante] = useState([])
    const [info, setInfo] = useState("");
    const [pedido, setPedido] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        var xmlhttp = new XMLHttpRequest();
        let url = ("http://localhost/Kudya/consumacomida.php?nome=" + info)
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4) {
                setrestaurante(JSON.parse(xmlhttp.responseText));
            }
        }
        db.transaction(tx => {
            tx.executeSql(
                "select* from pedido", [], (_, { rows }) => setPedido(JSON.stringify(rows))
            );
        });
        db.transaction(tx => {
            tx.executeSql(
                "select* from user", [], (_, { rows }) => setUser(JSON.stringify(rows))
            );
        });

    }, []);


    const Banner = () => {

        return (
            <View style={{ backgroundColor: "#FFF", padding: '10px' }}>

                <FlatList
                    keyExtractor={(item) => item.nomeRes}
                    data={restaurante}
                    renderItem={({ item }) => (
                        <ScrollView style={{ marginBottom: '36px' }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Detalhe', {
                                    nome: item.nomeRes,
                                    imagem: item.imagem,
                                    localizacao: item.Localizacao,
                                    id: item.idRestaurente,
                                    email: item.Email,
                                    navegacao: navigation,
                                })}

                            >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "50%" }}>
                                        <Image source={{ uri: 'http://localhost/Kudya/images/' + item.imagem }} style={{ height: '100px', Weight: '100px', borderRadius: '10px' }}></Image>
                                    </View>
                                    <View style={{ width: "50%", marginLeft: '6px' }}>
                                        <Text style={{ fontWeight: "bold", color: "#F36909" }}>{item.nomeRes}</Text>

                                        <Text style={{ fontFamily: "pristina" }}>{item.Localizacao}</Text>
                                        <Text >{item.Email}</Text>
                                        <Text style={{ color: "#F3D309" }}>⭐⭐⭐⭐⭐</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                />

            </View>
        );
    }

    const Icons = (props) => (
        <TouchableOpacity onPress={() => navigation.navigate(props.link, {
            dados: pedido,
            dados2: user,
            navegacao: navigation,
            //navegacao: navigation,
            //link: "ORORO",
        })}>
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

    const BottomButton = () => {
        return (
            <View style={{ flexDirection: "row", margin: 10, marginHorizontal: 30, justifyContent: "space-between" }}>
                <Icons icon="home" text='Home' link="home" />
                <Icons icon="search" text='Pesquisa' link="Home" />
                <Icons icon="shopping-bag" text='Historico' link="Historico" />
                <Icons icon="user" text='Perfil' link="Profile" />
            </View>
        )
    }



    return (
        <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <HeaderTabs />
                <View>
                    <TextInput
                        placeholder="Ingredientes"
                        style={{
                            backgroundColor: "#eee",
                            fontWeight: "700",
                            marginTop: 7,
                            padding: 10,
                            backgroundColor: "#eee",
                            borderRadius: 50,
                            flexDirection: "row",
                            marginRight: 10,
                        }}
                        value={info}
                        onChangeText={setInfo}
                    />
                </View>
            </View>
            <Banner />
            <BottomButton />
        </SafeAreaView>
    );

}
