import { Router } from "express";

import {
    createTime,
    getTimes,
    getTimeById,
    updateTime,
    getTimesByModalidadeID,
    getTimesBySala,
    deleteTime
} from "../controllers/time.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const timeRouter = Router();

timeRouter.get("/", getTimes);
timeRouter.get("/:id", ensureAuthenticated, getTimeById);
timeRouter.post("/", createTime);
timeRouter.put("/:id", updateTime);
timeRouter.get("/modalidade/:modalidade_id", getTimesByModalidadeID);
timeRouter.get("/sala/:sala", getTimesBySala);
timeRouter.delete("/:id", deleteTime);
