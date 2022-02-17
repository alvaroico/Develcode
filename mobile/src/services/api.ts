import axios, { AxiosError } from "axios";
import { User } from "../interfaces/User";

const baseURL_ENV = "http://172.18.52.93:8822"
const authorizationL_ENV = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjQ0OTUwMzQ1MDAwLCJleHBpcmFjYW8iOjE2NzY0ODYyNjQwMDAsImNsaWVudGUiOiJSb290In0.aSO5pCfxGK2AaUMbw0VuYQtZDe8qsfESgPmntUOzFlM"

export const api = axios.create({
  baseURL: baseURL_ENV,
});

export const searchApi = async () => {
  try {
    return await api
      .get("/User/ListAll", {
        headers: {
          authorization:
            authorizationL_ENV,
        },
      })
      .then((response) => {
        // console.log("response", response);
        return response.data.usuarios as [User];
      })
      .catch((error: AxiosError) => {
        console.log("response ERRO", error);
      });
  } catch (err) {
    console.warn(err);
  }
};

export const deletarUsuario = async (key: string) => {
  try {
    return await api
      .delete(`/User/DeleteID?codigo=${key}`, {
        headers: {
          authorization:
            authorizationL_ENV,
        },
      })
      .then((response) => {
        alert(response.data.message);
        return true;
      })
      .catch((error) => {
        console.log("response ERRO", error);
        return false;
      });
  } catch (err) {
    console.warn(err);
  }
};

export const cadastrarUsuario = async (usuarios: User) => {
  try {
    var data = JSON.stringify({
      usuarios: [
        {
          nome: usuarios.nome,
          nascimento:
            usuarios.nascimento.getFullYear().toString() +
            "-" +
            (parseInt((usuarios.nascimento.getMonth() + 1).toString()) < 10
              ? "0" + (usuarios.nascimento.getMonth() + 1).toString()
              : (usuarios.nascimento.getMonth() + 1).toString()) +
            "-" +
            (parseInt(usuarios.nascimento.getDate().toString()) < 10
              ? "0" + usuarios.nascimento.getDate().toString()
              : usuarios.nascimento.getDate().toString() + "/"),
          foto: usuarios.foto,
        },
      ],
    });
    return await api
      .post("/User/Cadastro", data, {
        headers: {
          authorization:
            authorizationL_ENV,
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

export const editarUsuario = async (usuarios: User) => {
  try {
    var data = JSON.stringify({
      usuarios: [
        {
          codigo: usuarios.codigo,
          nome: usuarios.nome,
          nascimento:
            usuarios.nascimento.getFullYear().toString() +
            "-" +
            (parseInt((usuarios.nascimento.getMonth() + 1).toString()) < 10
              ? "0" + (usuarios.nascimento.getMonth() + 1).toString()
              : (usuarios.nascimento.getMonth() + 1).toString()) +
            "-" +
            (parseInt(usuarios.nascimento.getDate().toString()) < 10
              ? "0" + usuarios.nascimento.getDate().toString()
              : usuarios.nascimento.getDate().toString() + "/"),
          foto: usuarios.foto,
        },
      ],
    });
    await api
      .put("/User/EditID", data, {
        headers: {
          authorization:
            authorizationL_ENV,
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

export const listID = async (codigoParams: string) => {
  return await api.get(`/User/ListID?codigo=${codigoParams}`, {
    headers: {
      authorization:
        authorizationL_ENV,
    },
  });
};
