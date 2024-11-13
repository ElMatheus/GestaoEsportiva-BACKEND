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
confrontosRouter.post("/", ensureAuthenticated('organizador'), createConfronto);
confrontosRouter.put("/:id", ensureAuthenticated('organizador'), updateConfronto);
confrontosRouter.delete("/:id", ensureAuthenticated('organizador'), deleteConfronto);

export default confrontosRouter;   