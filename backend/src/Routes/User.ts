import express from "express";
const router = express.Router();
import User from "../Controllers/User";

router.get("/", function (req, res) {
  res.send("Rota User");
});

router.post("/Cadastro", User.Cadastro);

export default router;
