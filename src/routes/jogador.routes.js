import { Router } from "express";

import {
    createJogador,
    getJogadores,
    getJogadorById,
    updateJogador,
    getJogadorByTimeID,
    getJogadorBySala
} from "../controllers/jogador.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const jogadorRouter = Router();

jogadorRouter.get("/", getJogadores);
jogadorRouter.get("/:id", getJogadorById);
jogadorRouter.get("/time/:time_id", getJogadorByTimeID);
jogadorRouter.get("/sala/:sala", getJogadorBySala);
jogadorRouter.post("/", ensureAuthenticated, createJogador);
jogadorRouter.put("/:id", ensureAuthenticated, updateJogador);

export default jogadorRouter;
