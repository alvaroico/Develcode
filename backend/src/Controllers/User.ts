import { Request, Response, NextFunction } from "express";
import { PoolPostgreSQL, QueryResult } from "../connection/PostgreSQL";
import { User } from "../interfaces/User";
// import { MascaraTelefoneNonoDigito } from "../tools/Ferramentas";

const Cadastro = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { usuarios } = request.body as { usuarios: Array<User> };

  if (usuarios != undefined && usuarios.length > 0) {
    for await (const usuario of usuarios) {
      await PoolPostgreSQL(`INSERT INTO public.usuario
      (nome, nascimento, foto)
      VALUES('${usuario.nome}', '${usuario.nascimento}', '${usuario.foto}')`)
        .then((result) => {
          const PoolPostgreSQLRetorno = result as QueryResult;
          if (
            PoolPostgreSQLRetorno.rowCount == 0 &&
            PoolPostgreSQLRetorno.rowCount == undefined
          ) {
            response.status(400).json({
              message: `Erro ao Salvar no PoolPostgreSQL ${PoolPostgreSQLRetorno}`,
            });
          } else {
            response.status(200).json({
              message: "Usuario Cadastrados",
            });
          }
        })
        .catch((error) => {
          response.status(400).json({
            message: `Erro ao Salvar no PoolPostgreSQL ${error}`,
          });
        });
    }
  } else {
    response.status(400).json({
      message: "Usuario não informados",
    });
  }
};

export default {
  Cadastro: Cadastro,
};
