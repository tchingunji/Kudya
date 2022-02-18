import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native-web';

export default function controller(props) {

    const [restaurante, setrestaurante] = useState([])

    useEffect(() => {
        var xmlhttp = new XMLHttpRequest();
        let url = ("https://raw.githubusercontent.com/Budy-Dev/teste/main/fastfood.json")
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4) {
                setrestaurante(JSON.parse(xmlhttp.responseText));
            }
        }

    }, []);



    const Banner = () => {

        return (
            <View style={{ backgroundColor: "#FFF", padding: '10px' }}>

                <FlatList
                    keyExtractor={(item) => item.nome}
                    data={restaurante}
                    renderItem={({ item }) => (
                        <ScrollView style={{ marginBottom: '36px' }}>
                            <TouchableOpacity>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "50%" }}>
                                    </View>
                                    <View style={{ width: "50%", marginLeft: '6px' }}>
                                        <Text style={{ fontWeight: "bold", color: "#F36909" }}>{item.nome}</Text>

                                        <Text style={{ fontFamily: "pristina" }}>{item.Localizacao}</Text>
                                        <Text >{item.distancia}</Text>
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

    const SalvaBd = () => {
        return (
            <Text>Salvo</Text>
        )
    }
    const EliResta = () => {
        return (
            <Text>Eliminar</Text>
        )
    }
    if (props.id == "1") {
        return (
            <Banner />
        )
    } else if (props.id == "2") {
        <SalvaBd />
    }
}