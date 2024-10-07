import { Router } from "express";

import {
    createPartida,
    getPartidaById,
    getPartidas,
    updatePartida,
    deletePartida
} from "../controllers/partida.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const confrontosRouter = Router();

confrontosRouter.post("/", createPartida);
confrontosRouter.get("/", getPartidas);
confrontosRouter.get("/:id", getPartidaById);
confrontosRouter.put("/:id", updatePartida);
confrontosRouter.delete("/:id", deletePartida);

export default confrontosRouter;   