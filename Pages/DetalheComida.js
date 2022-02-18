import { View, Text, Touchable, Image, SafeAreaView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native-web';
import BottomTab from '../Pages/BottomTab';
import HeaderTabs from '../Pages/HeaderTabs';
import SearchBar from '../Pages/SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

function criarTabelaPedidos() {
    db.transaction(tx => {
        tx.executeSql("create table if not exists pedido(nomePrato TEXT, preco TEXT, estado TEXT, Restaurante TEXT);");
    },
        console.error,
        () => { }
    );
}
function criarTabelaIngrendientes() {
    db.transaction(tx => {
        tx.executeSql("create table if not exists ingrediente(ListaIngre TEXT, nomePrato TEXT, estado TEXT, Restaurante TEXT);");
    },
        console.error,
        () => { }
    );
}
function salvarIngrendiente(lista, nomePrato, resta) {
    console.log("NTREI");
    var init = "Espera"
    db.transaction(tx => {
        tx.executeSql('INSERT INTO ingrediente (ListaIngre, nomePrato, estado, Restaurante) values(?,?,?,?)', [lista, nomePrato, init, resta]);
    },
        console.error,
        () => alert("Pedido Feito")
    );
    //buscarDados();
}
function salvarPedido(nomePrato, preco, Resta) {
    var init = "Espera"
    db.transaction(tx => {
        tx.executeSql('INSERT INTO pedido (nomePrato, preco,estado, Restaurante) values(?,?,?,?)', [nomePrato, preco, init, Resta]);
    },
        console.error,
        () => alert("Pedido Feito")
    );
    //buscarDados();
}

export default function DetalheComida({ route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [ingrediente, setIngredientes] = useState(route.params.ingrediente.split(","));

    useEffect(() => {
        criarTabelaPedidos();
        criarTabelaIngrendientes();
    }, []);
    const MostraModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true} visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible); }}>
                <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.8)", }}>

                    <Image source={{ uri: 'http://localhost/Kudya/comida/' + route.params.imagem }} style={{ height: '100px', Weight: '100px', borderRadius: '10px' }}></Image>

                    <Text style={{ justifyContent: "center", textAlign: "center", color: "#F37309", fontWeight: "bold", fontSize: 18, fontFamily: "arial", }}>Preço {route.params.preco} kz</Text>

                    <TouchableOpacity style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, marginHorizontal: 7, marginVertical: 22, }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            salvarPedido(route.params.nome, route.params.preco, route.params.nomeResta);
                        }}>
                        <Text style={{ color: "#000", fontSize: 18, fontFamily: "arial", textAlign: "center", }}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, marginHorizontal: 7, marginVertical: 22, }}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{ color: "#000", fontSize: 18, fontFamily: "arial", textAlign: "center", }}>Cancelar</Text>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 340 }}> </Text>
                </View>
            </Modal>
        );
    }
    const ComprarIngrendiente = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true} visible={modalVisible2}
                onRequestClose={() => { setModalVisible(!modalVisible2); }}>
                <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.8)", }}>
                    <MostraIcone />
                    <Text style={{ marginTop: 201 }}> </Text>
                    <TouchableOpacity style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, marginHorizontal: 7, marginVertical: 3 }}
                        onPress={() => {
                            salvarIngrendiente(route.params.ingrediente, route.params.nome, route.params.nomeResta);
                            setModalVisible2(!modalVisible2);
                        }}>
                        <Text style={{ color: "#000", fontSize: 18, fontFamily: "arial", textAlign: "center", }}>Mandar Vir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10, marginHorizontal: 7, marginVertical: 2 }}
                        onPress={() => { setModalVisible2(!modalVisible2); }}>
                        <Text style={{ color: "#000", fontSize: 18, fontFamily: "arial", textAlign: "center", }}>Cancelar</Text>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 240 }}> </Text>
                </View>
            </Modal>
        );
    }
    const MostraIcone = () => {

        return (
            <View style={{ marginTop: 5, backgroundColor: "#fff", paddingVertical: 10, paddingLeft: 20, }}>
                <Text style={{ fontWeight: "bold", fontFamily: "pristina", fontSize: 14 }}>Lista dos Ingrendientez</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {ingrediente.map((item, index) => (
                        <View key={index} style={{ alignItems: "center", marginRight: 30 }}>
                            <TouchableOpacity>
                                <Image source={{ uri: 'http://localhost/Kudya/igredientes/' + item.trim() + '.png' }} style={{ height: '32px', width: '32px', alignSelf: "center" }} />
                                <Text style={{ fontSize: 13, fontWeight: "900", alignSelf: "center" }}>{item}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={{ padding: '7px', backgroundColor: "#fff" }}>
            <TouchableOpacity onPress={() => route.params.navegacao.goBack()}>
                <Icon name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>

            <View style={{ backgroundColor: "white", padding: 15 }}>
                <HeaderTabs />
                <SearchBar />
            </View>

            <View>
                <Image source={{ uri: 'http://localhost/Kudya/comida/' + route.params.imagem }} style={{ height: '100px', Weight: '100px', borderRadius: '10px' }}></Image>
            </View>
            <View style={{}}>
                <Text style={{ textAlign: "center", color: "#F37309", marginRight: '10px', fontFamily: "pristina", fontSize: 26, fontWeight: "bold", alignSelf: "center", justifyContent: "center" }}>{route.params.nome}</Text>
                <Text style={{ justifyContent: "center", textAlign: "right" }}>{route.params.preco} kz</Text>
            </View>
            <View style={{ flexDirection: "row", margin: '7px', }}>
                <Text style={{ justifyContent: "center", textAlign: "left" }}>{route.params.preparo}</Text>
            </View>

            <TouchableOpacity style={{ backgroundColor: "#FFCE36", padding: 10, borderRadius: 10, marginHorizontal: 7, marginVertical: 22, }}
                onPress={() => setModalVisible(true)}>
                <Text style={{ color: "#000", fontSize: 18, fontFamily: "arial", textAlign: "center", }}>Comprar Comida</Text>
            </TouchableOpacity>

            <MostraIcone />

            <TouchableOpacity style={{ backgroundColor: "#FFCE36", padding: 10, borderRadius: 10, marginHorizontal: 7, marginVertical: 22, }}
                onPress={() => setModalVisible2(true)}>
                <Text style={{ color: "#000", fontSize: 18, fontFamily: "arial", textAlign: "center", }}>Comprar Ingrendientes</Text>
            </TouchableOpacity>

            <MostraModal />
            <ComprarIngrendiente />

            <BottomTab />
        </View>
    )
}