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
jogadorRouter.get("/:id", ensureAuthenticated, getJogadorById);
jogadorRouter.get("/time/:time_id", getJogadorByTimeID);
jogadorRouter.get("/sala/:sala", getJogadorBySala);
jogadorRouter.post("/", createJogador);
jogadorRouter.put("/:id", updateJogador);
