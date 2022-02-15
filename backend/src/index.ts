import express from "express";
const app = express();
app.use(express.json());

import homeRota from "./Routes/home";
import User from "./Routes/User";
import { JWTDecode } from "./Middleware/JWTDecode";

app.use("/", homeRota);
app.use("/User", JWTDecode('Root'), User);

app.listen(8822, () => {
  console.log(`🙌😎 Servidor HTTP rodando porta: ${8822} 👌`);
});
