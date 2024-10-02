import { Router } from "express";

import {
    getAllConfrontos,
    getConfrontoById,
    getConfrontosByIdPartida,
    createConfronto
} from "../controllers/confrontos.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const confrontosRouter = Router();

confrontosRouter.get("/", getAllConfrontos);
confrontosRouter.get("/:id", getConfrontoById);
confrontosRouter.get("/partida/:id", getConfrontosByIdPartida);
confrontosRouter.post("/", createConfronto);

export default confrontosRouter;   