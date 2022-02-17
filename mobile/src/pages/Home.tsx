import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { searchApi } from "../services/api";
import { User } from "../interfaces/User";

import List from "../componentes/List";

export default function Home() {
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState<User[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      // alert("Screen was focused");
      const consultaInicial = async () => {
        try {
          setUsuarios((await searchApi()) as User[]);
        } catch (err) {
          console.warn(err);
        }
      };

      consultaInicial();
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
      {usuarios?.length > 0 ? (
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
