import axios, { Axios, AxiosError, AxiosRequestHeaders } from "axios";
import { User } from "../interfaces/User";

export const api = axios.create({
  baseURL: "http://172.27.65.171:8822",
});

export const searchApi = async () => {
  try {
    return await api
      .get("/User/ListAll", {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjQ0OTUwMzQ1MDAwLCJleHBpcmFjYW8iOjE2NzY0ODYyNjQwMDAsImNsaWVudGUiOiJSb290In0.aSO5pCfxGK2AaUMbw0VuYQtZDe8qsfESgPmntUOzFlM",
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjQ0OTUwMzQ1MDAwLCJleHBpcmFjYW8iOjE2NzY0ODYyNjQwMDAsImNsaWVudGUiOiJSb290In0.aSO5pCfxGK2AaUMbw0VuYQtZDe8qsfESgPmntUOzFlM",
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

export const listID = async (codigoParams: string) => {
  return await api.get(`/User/ListID?codigo=${codigoParams}`, {
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmlhY2FvIjoxNjQ0OTUwMzQ1MDAwLCJleHBpcmFjYW8iOjE2NzY0ODYyNjQwMDAsImNsaWVudGUiOiJSb290In0.aSO5pCfxGK2AaUMbw0VuYQtZDe8qsfESgPmntUOzFlM",
    },
  });
};
