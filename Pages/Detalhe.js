import { View, Text, Touchable, Image, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native-web';
import BottomTab from '../Pages/BottomTab';
import HeaderTabs from '../Pages/HeaderTabs';
import SearchBar from '../Pages/SearchBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Detalhe({ route }) {
    //{route.params.nome}


    const [cardapio, setcardapio] = useState([])


    useEffect(() => {
        var xmlhttp = new XMLHttpRequest();
        let url = ("http://localhost/Kudya/buscarcardapio.php?id=" + route.params.id)
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4) {
                setcardapio(JSON.parse(xmlhttp.responseText));
            }
        }

    }, []);


    const Banner = () => {

        return (
            <View style={{ backgroundColor: "#FFF", padding: '10px' }}>

                <FlatList
                    keyExtractor={(item) => item.nomePRato}
                    data={cardapio}
                    renderItem={({ item }) => (
                        <ScrollView style={{ marginBottom: '36px' }}>
                            <TouchableOpacity
                                onPress={() => route.params.navegacao.navigate('DetalheComida', {
                                    nome: item.nomePRato,
                                    imagem: item.imagem,
                                    ingrediente: item.ingrediente,
                                    preparo: item.preparo,
                                    id: item.idPrato,
                                    preco: item.preco,
                                    nomeResta: route.params.nome,
                                    navegacao: route.params.navegacao,
                                })}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: "50%" }}>
                                        <Image source={{ uri: 'http://localhost/Kudya/comida/' + item.imagem }} style={{ height: '100px', Weight: '100px', borderRadius: '10px' }}></Image>
                                    </View>
                                    <View style={{ width: "50%", marginLeft: '6px' }}>
                                        <Text style={{ fontWeight: "bold", color: "#F36909" }}>{item.nomePRato}</Text>
                                        <Text style={{ fontFamily: "pristina" }}>{item.ingrediente}</Text>
                                        <Text >{item.preco} kz</Text>
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
                <Image source={{ uri: 'http://localhost/Kudya/images/' + route.params.imagem }} style={{ height: '100px', Weight: '100px', borderRadius: '10px' }}></Image>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "#F37309", marginRight: '10px', fontFamily: "pristina", fontSize: 26, fontWeight: "bold" }}>{route.params.nome}</Text>
                <Text >{route.params.localizacao}</Text>
            </View>
            <Banner />

            <BottomTab />
        </View>
    )
}