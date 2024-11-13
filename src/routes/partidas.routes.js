import { Router } from "express";

import {
    createPartida,
    getPartidaById,
    getPartidaAndConfrontos,
    getPartidas,
    updatePartida,
    deletePartida
} from "../controllers/partida.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const confrontosRouter = Router();

confrontosRouter.post("/", createPartida);
confrontosRouter.get("/", getPartidas);
confrontosRouter.get("/confrontos", getPartidaAndConfrontos);
confrontosRouter.get("/:id", getPartidaById);
confrontosRouter.put("/:id", ensureAuthenticated, updatePartida);
confrontosRouter.delete("/:id", deletePartida);

export default confrontosRouter;   