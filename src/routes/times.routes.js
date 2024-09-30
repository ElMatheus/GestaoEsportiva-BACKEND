import { Router } from "express";

import {
    createTimes,
    getTimes,
    getTimesById,
    updateTimes,
    getTimesByModalidadeID,
    getTimesBySala,
    deleteTimes
} from "../controllers/times.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const timeRouter = Router();

timeRouter.get("/", getTimes);
timeRouter.get("/:id", ensureAuthenticated, getTimesById);
timeRouter.post("/", createTimes);
timeRouter.put("/:id", updateTimes);
timeRouter.get("/modalidade/:modalidade_id", getTimesByModalidadeID);
timeRouter.get("/sala/:sala", getTimesBySala);
timeRouter.delete("/:id", deleteTimes);

export default timeRouter;
