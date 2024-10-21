import { Router } from "express";

import {
    getAllConfrontos,
    getConfrontoById,
    getConfrontosByIdPartida,
    createConfronto,
    updateConfronto,
    deleteConfronto,
} from "../controllers/confrontos.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const confrontosRouter = Router();

confrontosRouter.get("/", getAllConfrontos);
confrontosRouter.get("/:id", getConfrontoById);
confrontosRouter.get("/partida/:id", getConfrontosByIdPartida);
confrontosRouter.post("/", createConfronto);
confrontosRouter.put("/:id", updateConfronto);
confrontosRouter.delete("/:id", deleteConfronto);

export default confrontosRouter;   