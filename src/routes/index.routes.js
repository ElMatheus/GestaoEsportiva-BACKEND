import { Router } from "express";
import usersRouter from "./users.routes.js";
import campeonatosRouter from "./campeonatos.routes.js";
import modalidadesRouter from "./modalidades.routes.js";
import timeRouter from "./times.routes.js"
import jogadorRouter from "./jogador.routes.js"

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Servidor rodando perfeitamente!" });
});

router.use("/users", usersRouter);
router.use("/campeonatos", campeonatosRouter);
router.use("/modalidades", modalidadesRouter);
router.use("/times", timeRouter);
router.use("/jogadores", jogadorRouter);


export { router };
