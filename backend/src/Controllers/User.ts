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
            PoolPostgreSQLRetorno.rowCount == 0 ||
            PoolPostgreSQLRetorno.rowCount == undefined
          ) {
            response.status(400).json({
              message: `Erro ao Salvar no PoolPostgreSQL ${JSON.stringify(
                PoolPostgreSQLRetorno
              )}`,
            });
          } else {
            response.status(200).json({
              message: "Usuario Cadastrados",
            });
          }
        })
        .catch((error) => {
          response.status(400).json({
            message: `Erro ao Salvar no PoolPostgreSQL ${JSON.stringify(
              error
            )}`,
          });
        });
    }
  } else {
    response.status(400).json({
      message: "Usuário não informados",
    });
  }
};

const ListAll = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  await PoolPostgreSQL(`SELECT * FROM public.usuario`)
    .then((result) => {
      const PoolPostgreSQLRetorno = result as QueryResult;
      if (PoolPostgreSQLRetorno.rows.length > 0) {
        const usuarios = PoolPostgreSQLRetorno.rows as unknown as Array<User>;
        response.status(200).json({
          usuarios,
        });
      } else {
        response.status(200).json({
          [`usuarios`]: [],
        });
      }
    })
    .catch((error) => {
      response.status(400).json({
        message: `Erro ao Listar no PoolPostgreSQL ${JSON.stringify(error)}`,
      });
    });
};

const EditID = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { usuarios } = request.body as { usuarios: Array<User> };

  if (usuarios != undefined && usuarios.length > 0) {
    for await (const usuario of usuarios) {
      await PoolPostgreSQL(`UPDATE public.usuario
      SET nome='${usuario.nome}', nascimento='${usuario.nascimento}', foto='${usuario.foto}'
      WHERE codigo='${usuario.codigo}';
      `)
        .then((result) => {
          const PoolPostgreSQLRetorno = result as QueryResult;
          if (
            PoolPostgreSQLRetorno.rowCount == 0 ||
            PoolPostgreSQLRetorno.rowCount == undefined
          ) {
            response.status(400).json({
              message: `Erro ao Editar no PoolPostgreSQL ${JSON.stringify(
                PoolPostgreSQLRetorno
              )}`,
            });
          } else {
            response.status(200).json({
              message: "Usuario Editado",
            });
          }
        })
        .catch((error) => {
          response.status(400).json({
            message: `Erro ao Salvar no PoolPostgreSQL ${JSON.stringify(
              error
            )}`,
          });
        });
    }
  } else {
    response.status(400).json({
      message: "Usuario não informados",
    });
  }
};

const DeleteID = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { codigo } = request.query as { codigo: string };

  if (codigo != undefined) {
    await PoolPostgreSQL(`DELETE FROM public.usuario
      WHERE codigo=${codigo}`)
      .then((result) => {
        const PoolPostgreSQLRetorno = result as QueryResult;
        if (
          PoolPostgreSQLRetorno.rowCount == 0 ||
          PoolPostgreSQLRetorno.rowCount == undefined
        ) {
          response.status(400).json({
            message: `Erro ao Deletar Usuario no PoolPostgreSQL ${JSON.stringify(
              PoolPostgreSQLRetorno
            )}`,
          });
        } else {
          response.status(200).json({
            message: "Usuario Deletado",
          });
        }
      })
      .catch((error) => {
        response.status(400).json({
          message: `Erro ao Deletar no PoolPostgreSQL ${JSON.stringify(error)}`,
        });
      });
  } else {
    response.status(400).json({
      message: "Codigo não informados",
    });
  }
};

export default {
  Cadastro: Cadastro,
  ListAll: ListAll,
  EditID: EditID,
  DeleteID: DeleteID,
};
