import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function ConsomeResta() {
    const [resta, setResta] = useState([]);
    useEffect(() => {
        var xmlhttp = new XMLHttpRequest();
        let url = ("https://raw.githubusercontent.com/Budy-Dev/teste/main/fastfood.json")
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4) {
                setResta(JSON.parse(xmlhttp.responseText));
            }
        }
    }, []);

    return (
        <Text>{resta}</Text>
    )
}

