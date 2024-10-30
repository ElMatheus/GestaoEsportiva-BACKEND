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
timeRouter.post("/", createTimes);
timeRouter.put("/:id", updateTimes);
timeRouter.get("/modalidade/:modalidade_id", getTimesByModalidadeID);
timeRouter.get("/campeonato/:campeonato_id", getTimesByCampeonatoID);
timeRouter.get("/sala/:sala", getTimesBySala);  
timeRouter.delete("/:id", deleteTimes);

export default timeRouter;
