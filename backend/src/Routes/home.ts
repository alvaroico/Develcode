import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

router.get(
  "/",
  function (request: Request, response: Response, next: NextFunction) {
    response.send("Rota Home");
  }
);

export default router;
