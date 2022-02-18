import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-web';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HeaderTabs(props) {
    const [local, setLocal] = useState(0);
    const [activeTab, setActiveTab] = useState("Restaurantes");
    return (
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <HeaderButton
                text="Restaurantes"
                btnColor="black"
                textColor="white"
                activeTab={activeTab}
                onClick={() => { setLocal(0) }}
                setActiveTab={setActiveTab}
            />

            <HeaderButton
                text="Pratos"
                btnColor="white"
                textColor="black"
                activeTab={activeTab}
                onPress={() => { setLocal(1) }}
                setActiveTab={setActiveTab} />
        </View>
    );
}

const HeaderButton = (props) => (
    <TouchableOpacity
        style={{
            backgroundColor: props.activeTab == props.text ? "orange" : "white",
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 30,
        }}
        onPress={() => { props.setActiveTab(props.text) }}
    >
        <Text style={{ color: props.activeTab == props.text ? "white" : "orange", fontSize: 15, fontWeight: "90" }}>{props.text}</Text>
    </TouchableOpacity>
);