import { Router } from "express";

import {
    createPartida,
    getPartidaById,
    getPartidas,
    updatePartida
} from "../controllers/partida.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const confrontosRouter = Router();

confrontosRouter.post("/", createPartida);
confrontosRouter.get("/", getPartidas);
confrontosRouter.get("/:id", getPartidaById);
confrontosRouter.put("/:id", updatePartida);

export default confrontosRouter;   