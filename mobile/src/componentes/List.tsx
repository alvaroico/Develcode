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
import { deletarUsuario } from "../services/api";
import { useNavigation } from "@react-navigation/native";

interface IlistData {
  item: { key: string; text: string };
}

export default function List({ usuarios }: { usuarios: User[] }) {
  const navigation = useNavigation();
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

  const deleteRow = async (rowMap: any, rowKey: string) => {
    if ((await deletarUsuario(rowKey)) === true) {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(
        (item) => item.key === parseInt(rowKey)
      );
      newData.splice(prevIndex, 1);
      setListData(newData);
    } else {
      alert("Erro ao deletar usuário");
    }
  };

  const onRowDidOpen = (rowKey: string) => {
    console.log("Arrastou para esquerda ou Direita", rowKey);
  };

  const renderItem = (data: IlistData) => (
    <TouchableHighlight
      // @ts-ignore
      onPress={() => navigation.navigate("Editar", data.item.key)}
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
    backgroundColor: "#EEE",
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
