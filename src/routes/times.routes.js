import { Router } from "express";

import {
    createTimes,
    getTimes,
    getTimesAndJogadores,
    getTimesById,
    updateTimes,
    getTimesByModalidadeID,
    getTimesByCampeonatoID,
    getTimesBySala,
    deleteTimes
} from "../controllers/times.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const timeRouter = Router();

timeRouter.get("/", getTimes);
timeRouter.get("/jogadores", getTimesAndJogadores);
timeRouter.get("/:id", getTimesById);
timeRouter.post("/", ensureAuthenticated('organizador'), createTimes);
timeRouter.put("/:id", ensureAuthenticated('admin'), updateTimes);
timeRouter.get("/modalidade/:modalidade_id", getTimesByModalidadeID);
timeRouter.get("/campeonato/:campeonato_id", getTimesByCampeonatoID);
timeRouter.get("/sala/:sala", getTimesBySala);
timeRouter.delete("/:id", ensureAuthenticated('admin'), deleteTimes);

export default timeRouter;
