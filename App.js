import React, { useState, useEffect } from 'react';
import * as SQLite from "expo-sqlite";
import Teste from "./Pages/Teste.js";

const db = SQLite.openDatabase("db.db");


function criarTabela() {
  db.transaction(tx => {
    tx.executeSql("create table if not exists user(nome TEXT, numTele TEXT, email TEXT, local TEXT);");
  },
    console.error,
    () => { }
  );
}

function elimina() {
  db.transaction(tx => {
    tx.executeSql("delete from user");
  },
    console.error,
    () => console.log("Dados eliminados"));
}

export default function App() {

  const screenOptions = { headerShown: false, };
  const [qtd, setQtd] = useState([]);

  useEffect(() => {
    criarTabela();

    db.transaction(tx => {
      tx.executeSql(
        "select* from user", [], (_, { rows }) => {
          if (rows.length == 0) {
            setQtd(rows.length)
          }
          else {
            setQtd(rows.length)
          }
        }
      );
    });

  }, []);

  return (
    <Teste id={qtd} />
  )
}