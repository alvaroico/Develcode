import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  Button,
  Platform,
} from "react-native";
import api from "../services/api";
import { User } from "../interfaces/User";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Editar() {
  const [usuarios, setUsuarios] = useState<User>();
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState(new Date(Date.now()));
  const [foto, setFoto] = useState("");

  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || nascimento;
    setShow(Platform.OS === "ios");
    setNascimento(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const cadastrarUsuario = async (usuarios: User) => {
    try {
      var data = JSON.stringify({
        usuarios: [
          {
            nome: usuarios.nome,
            nascimento:
              usuarios.nascimento.getFullYear().toString() +
              "-" +
              (parseInt((nascimento.getMonth() + 1).toString()) < 10
                ? "0" + (nascimento.getMonth() + 1).toString()
                : (nascimento.getMonth() + 1).toString()) +
              "-" +
              (parseInt(nascimento.getDate().toString()) < 10
                ? "0" + nascimento.getDate().toString()
                : nascimento.getDate().toString() + "/"),
            foto: usuarios.foto,
          },
        ],
      });
      await api
        .post("/User/Cadastro", data, {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjQ0OTUwMzQ1MDAwLCJleHBpcmFjYW8iOjE2NzY0ODYyNjQwMDAsImNsaWVudGUiOiJSb290In0.aSO5pCfxGK2AaUMbw0VuYQtZDe8qsfESgPmntUOzFlM",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log(response.data);
          alert(response.data.message);
        })
        .catch((error) => {
          console.log("response ERRO", error);
        });
    } catch (err) {
      console.warn(err);
    }
  };

  const editarUsuario = async (usuarios: User) => {
    try {
      var data = JSON.stringify({
        usuarios: [
          {
            codigo: usuarios.codigo,
            nome: usuarios.nome,
            nascimento:
              usuarios.nascimento.getFullYear().toString() +
              "-" +
              (parseInt((nascimento.getMonth() + 1).toString()) < 10
                ? "0" + (nascimento.getMonth() + 1).toString()
                : (nascimento.getMonth() + 1).toString()) +
              "-" +
              (parseInt(nascimento.getDate().toString()) < 10
                ? "0" + nascimento.getDate().toString()
                : nascimento.getDate().toString() + "/"),
            foto: usuarios.foto,
          },
        ],
      });
      await api
        .put("/User/EditID", data, {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjQ0OTUwMzQ1MDAwLCJleHBpcmFjYW8iOjE2NzY0ODYyNjQwMDAsImNsaWVudGUiOiJSb290In0.aSO5pCfxGK2AaUMbw0VuYQtZDe8qsfESgPmntUOzFlM",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log(response.data);
          alert(response.data.message);
        })
        .catch((error) => {
          console.log("response ERRO", error);
        });
    } catch (err) {
      console.warn(err);
    }
  };

  const botaoSalvar = async () => {
    const novoUsuario: User = {
      codigo: usuarios?.codigo ? usuarios.codigo : 0,
      nome: nome,
      nascimento: nascimento,
      foto: foto,
    };

    if (novoUsuario.foto !== "" && novoUsuario.nome !== "") {
      if (novoUsuario.codigo === 0) {
        await cadastrarUsuario(novoUsuario);
      } else {
        await editarUsuario(novoUsuario);
      }
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>{"Novo"}</Text>
      </View>
      {usuarios?.codigo ? <Text>Codigo Usuario: {usuarios.codigo}</Text> : null}
      <Text>Nome</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Nome do Usuario"
        onChangeText={(newUsuarios) => setNome(newUsuarios)}
        defaultValue={nome}
      />
      <Text>Data de Nascimento</Text>

      <Button
        onPress={showDatepicker}
        title={
          (parseInt(nascimento.getDate().toString()) < 10
            ? "0" + nascimento.getDate().toString() + "/"
            : nascimento.getDate().toString() + "/") +
          (parseInt((nascimento.getMonth() + 1).toString()) < 10
            ? "0" + (nascimento.getMonth() + 1).toString() + "/"
            : (nascimento.getMonth() + 1).toString() + "/") +
          nascimento.getFullYear().toString()
        }
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={nascimento}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Text>Foto URL</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="URL de uma foto do Usuario"
        onChangeText={(newFoto) => setFoto(newFoto)}
        defaultValue={foto}
      />
      <Image
        style={styles.tinyLogo}
        source={{
          uri: foto ? foto : "https://www.gravatar.com/avatar/",
        }}
      />
      <Text></Text>
      <Button onPress={botaoSalvar} title="Salvar" />
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
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  button: {
    borderRadius: 10,
  },
});
