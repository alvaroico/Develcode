import { PoolPostgreSQL } from "./connection/PostgreSQL";

const job = async () => {
  await PoolPostgreSQL(`CREATE table usuario (
    codigo serial PRIMARY KEY,
    nome varchar NOT NULL,
    nascimento date NOT NULL,
    foto varchar NOT NULL
  );`)
    .then(async (resultado) => {
      // console.log(resultado);
      console.info("Tabela no PostgreSQL criada com sucesso!");
    })
    .catch((err) => {
      console.log(err);
    });
  process.exit(1);
};
job();
