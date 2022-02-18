import { View, Text, Touchable, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity } from 'react-native-web';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

function buscarDados() {
    db.transaction(tx => {
        tx.executeSql(
            "select* from user", [], (_, { rows }) => console.log(JSON.stringify(rows))
        );
    });
}

function gravar(no, em, nu, lo) {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO user (nome, numTele, email, local) values(?,?,?,?)', [no, nu, em, lo]);
    },
        console.error,
        () => console.log("Usuario cadastrado")
    );
    //buscarDados();
}
function elimina() {
    db.transaction(tx => {
        tx.executeSql("delete from user");
    },
        console.error,
        () => console.log("Dados eliminados"));
}
export default function Login() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [num, setNum] = useState("");
    const [local, setLocal] = useState("");

    useEffect(() => {
        buscarDados()
    }, []);

    return (
        <View style={{ backgroundColor: "#FFC510", padding: "30px" }}>
            <TouchableOpacity>
                <Icon name="arrow-left" size={30} color="#000" />
            </TouchableOpacity>
            <View style={{ paddingTop: "30px" }}>

                <Image source={require("../imgs/comidaCaseira.png")} style={{ width: 100, height: 100, alignSelf: "center" }} />
                <Text style={{ fontSize: 19, fontWeight: "bold", color: "#000", }}>CADASTRAMENTO</Text>

                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, }}>
                    <TextInput
                        style={{
                            height: 40,
                            width: "97%",
                            margin: 12,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 4,
                        }}
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Digite o seu nome"
                    />
                    <Icon name="male" size={25} color="#000" style={{ position: "absolute", right: 30 }} />
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, }}>
                    <TextInput
                        style={{
                            height: 40,
                            width: "97%",
                            margin: 12,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 4,
                        }}
                        value={num}
                        onChangeText={setNum}
                        keyboardType="numeric"
                        placeholder="Número de Telefone"
                    />
                    <Icon name="phone" size={25} color="#000" style={{ position: "absolute", right: 30 }} />
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, }}>
                    <TextInput
                        style={{
                            height: 40,
                            width: "97%",
                            margin: 12,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 4,
                        }}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email"
                        placeholder="Endereço eletronico"
                    />
                    <Icon name="at" size={25} color="#000" style={{ position: "absolute", right: 30 }} />
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, }}>
                    <TextInput
                        style={{
                            height: 40,
                            width: "97%",
                            margin: 12,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 4,
                        }}
                        value={local}
                        onChangeText={setLocal}
                        placeholder="Angola, Luanda, Talatona"
                    />
                    <Icon name="map" size={25} color="#000" style={{ position: "absolute", right: 30 }} />
                </View>

                <TouchableOpacity style={{ backgroundColor: "#000", padding: "10px", }} onPress={() => gravar(nome, email, num, local)}>
                    <Text style={{ color: "#FFF", alignSelf: "center", fontSize: 10, fontWeight: "bold", }}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ alignSelf: "center", marginTop: 12, }}>Kudya a solução da tua cozinha</Text>
            <View>

            </View>
        </View>
    );
}