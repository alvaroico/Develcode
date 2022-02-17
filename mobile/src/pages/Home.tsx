import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import api from "../services/api";
import { User } from "../interfaces/User";

import List from "../componentes/List";

export default function Home() {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState<User[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      // alert("Screen was focused");
      const searchApi = async () => {
        try {
          await api
            .get("/User/ListAll", {
              headers: {
                authorization:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjQ0OTUwMzQ1MDAwLCJleHBpcmFjYW8iOjE2NzY0ODYyNjQwMDAsImNsaWVudGUiOiJSb290In0.aSO5pCfxGK2AaUMbw0VuYQtZDe8qsfESgPmntUOzFlM",
              },
            })
            .then((response) => {
              // console.log("response", response);
              setUsuarios(response.data.usuarios);
            })
            .catch((error) => {
              console.log("response ERRO", error);
            });
        } catch (err) {
          console.warn(err);
        }
      };

      searchApi();
      return () => {
        // alert("Screen was unfocused");
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>{"Usuarios"}</Text>
      </View>
      {usuarios.length > 0 ? (
        <List usuarios={usuarios} />
      ) : (
        <Text>{"Nenhum usuário cadastrado"}</Text>
      )}
      <Button
        title="Novo Usuário"
        // @ts-ignore"
        onPress={() => navigation.navigate("Editar")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    flexWrap: "wrap",
  },
  switch: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 2,
    paddingVertical: 10,
    width: Dimensions.get("window").width / 3,
  },
});
