import React, { useState } from "react";
import propTypes from "prop-types";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { User } from "../interfaces/User";
import api from "../services/api";

interface IlistData {
  item: { key: string; text: string };
}

const cadastrarUsuario = async (usuarios: User) => {
  try {
    var data = JSON.stringify({
      usuarios: [
        {
          nome: "Alvaro",
          nascimento: "1992-09-21",
          foto: "https://avatars.githubusercontent.com/u/59286021?v=4",
        },
      ],
    });
    await api
      .get("/User/Cadastro", {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjQ0OTUwMzQ1MDAwLCJleHBpcmFjYW8iOjE2NzY0ODYyNjQwMDAsImNsaWVudGUiOiJSb290In0.aSO5pCfxGK2AaUMbw0VuYQtZDe8qsfESgPmntUOzFlM",
          "Content-Type": "application/json",
        },
        data: data,
      })
      .then((response) => {
        console.log(response.data.usuarios);
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
          codigo: 5,
          nome: "Alvaro Edit 3",
          nascimento: "1992-09-21",
          foto: "https://avatars.githubusercontent.com/u/59286021?v=4",
        },
      ],
    });
    await api
      .get("/User/EditID", {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjQ0OTUwMzQ1MDAwLCJleHBpcmFjYW8iOjE2NzY0ODYyNjQwMDAsImNsaWVudGUiOiJSb290In0.aSO5pCfxGK2AaUMbw0VuYQtZDe8qsfESgPmntUOzFlM",
          "Content-Type": "application/json",
        },
        data: data,
      })
      .then((response) => {
        console.log(response.data.usuarios);
      })
      .catch((error) => {
        console.log("response ERRO", error);
      });
  } catch (err) {
    console.warn(err);
  }
};

const deletarUsuario = async (key: string) => {
  try {
    await api
      .get("/User/DeleteID?codigo=5", {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjQ0OTUwMzQ1MDAwLCJleHBpcmFjYW8iOjE2NzY0ODYyNjQwMDAsImNsaWVudGUiOiJSb290In0.aSO5pCfxGK2AaUMbw0VuYQtZDe8qsfESgPmntUOzFlM",
        },
      })
      .then((response) => {
        console.log(response.data.usuarios);
      })
      .catch((error) => {
        console.log("response ERRO", error);
      });
  } catch (err) {
    console.warn(err);
  }
};

export default function List({ usuarios }: { usuarios: User[] }) {
  const [listData, setListData] = useState(
    usuarios.map((user) => {
      return { key: user.codigo, text: `${user.nome}` };
    })
  );

  const closeRow = (rowMap: any, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: string) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(
      (item) => item.key === parseInt(rowKey)
    );
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey: string) => {
    console.log("Arrastou para esquerda > Direita", rowKey);
  };

  const renderItem = (data: IlistData) => (
    <TouchableHighlight
      onPress={() => console.log("Clicou no item", data.item.key)}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View>
        <Text>{data.item.text}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data: IlistData, rowMap: any) => (
    <View style={styles.rowBack}>
      <Text>Clicar para Editar</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Fecha</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </View>
  );
}

// List.propTypes = { usuarios: propTypes.array };

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
