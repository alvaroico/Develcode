import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import api from "../services/api";
import { User } from "../interfaces/User";

export default function Home() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [recargaUsuarios, setRecargaUsuarios] = useState<boolean>(false);

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
    }, [recargaUsuarios])
  );

  console.log("usuarios", usuarios);

  return (
    <View style={styles.container}>
      <Text>Pagina Inicial 2</Text>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
