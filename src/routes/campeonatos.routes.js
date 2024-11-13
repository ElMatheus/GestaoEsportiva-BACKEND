import { Router } from "express";

import {
    getCampeonatos,
    getCampeonatoById,
    getCampeonatoByTitulo,
    createCampeonato,
    updateCampeonato,
    deleteCampeonato,
    getDurationCampeonato,
    getCampeonatoByDate
} from "../controllers/campeonatos.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const campeonatosRouter = Router();

campeonatosRouter.get("/", getCampeonatos);
campeonatosRouter.get("/:id", getCampeonatoById);
campeonatosRouter.get("/titulo/:titulo", getCampeonatoByTitulo);
campeonatosRouter.get("/date/:date", getCampeonatoByDate);
campeonatosRouter.post("/", ensureAuthenticated('admin'), createCampeonato);
campeonatosRouter.put("/:id", updateCampeonato('admin'));
campeonatosRouter.delete("/:id", deleteCampeonato);
campeonatosRouter.get("/duration/:id", getDurationCampeonato);

export default campeonatosRouter;   