import { Router } from "express";
import usersRouter from "./users.routes.js";
import campeonatosRouter from "./campeonatos.routes.js";
import modalidadesRouter from "./modalidades.routes.js";
import timeRouter from "./times.routes.js"
import jogadorRouter from "./jogador.routes.js"
import confrontosRouter from "./confrontos.routes.js"
import partidasRouter from "./partidas.routes.js"
import gerarRouter from "./gerar.routes.js"
import feedbackRouter from "./feedback.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Servidor rodando perfeitamente!" });
});

router.use("/users", usersRouter);
router.use("/campeonatos", campeonatosRouter);
router.use("/partidas", partidasRouter);
router.use("/confrontos", confrontosRouter);
router.use("/modalidades", modalidadesRouter);
router.use("/times", timeRouter);
router.use("/jogadores", jogadorRouter);
router.use ("/gerar", gerarRouter);
router.use("/feedback", feedbackRouter);


export { router };
