import { Request, Response, NextFunction } from "express";
import { User } from "../interfaces/User";
// import { MascaraTelefoneNonoDigito } from "../tools/Ferramentas";

const Cadastro = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { usuarios } = request.body as { usuarios: Array<User> };

  if (usuarios != undefined && usuarios.length > 0) {
    response.status(200).json({
      message: "Usuario Cadastrados",
    });
  } else {
    response.status(400).json({
      message: "Usuario não informados",
    });
  }
};

export default {
  Cadastro: Cadastro,
};
