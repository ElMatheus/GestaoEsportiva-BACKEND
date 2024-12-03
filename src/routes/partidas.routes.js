import { Router } from "express";

import {
    createPartida,
    getPartidaById,
    getPartidaAndConfrontos,
    getPartidaAndConfrontosBymodalidade,
    getPartidas,
    updatePartida,
    deletePartida
} from "../controllers/partida.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const confrontosRouter = Router();

confrontosRouter.post("/", createPartida);
confrontosRouter.get("/", getPartidas);
confrontosRouter.get("/confrontos", ensureAuthenticated('organizador'), getPartidaAndConfrontos);
confrontosRouter.get("/confrontos/:modalidade_id", getPartidaAndConfrontosBymodalidade);
confrontosRouter.get("/:id", ensureAuthenticated('organizador'), getPartidaById);
confrontosRouter.put("/:id", ensureAuthenticated('organizador'), updatePartida);
confrontosRouter.delete("/:id", ensureAuthenticated('admin'), deletePartida);

export default confrontosRouter;   