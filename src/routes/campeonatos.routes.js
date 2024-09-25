import { Router } from "express";

import {
    getCampeonatos,
    getCampeonatoById,
    getCampeonatoByTitulo,
    createCampeonato,
    updateCampeonato,
    deleteCampeonato,
    getDurationCampeonato
} from "../controllers/campeonatos.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const campeonatosRouter = Router();

campeonatosRouter.get("/", getCampeonatos);
campeonatosRouter.get("/:id", getCampeonatoById);
campeonatosRouter.get("/titulo/:titulo", getCampeonatoByTitulo);
campeonatosRouter.post("/", createCampeonato);
campeonatosRouter.put("/:id", updateCampeonato);
campeonatosRouter.delete("/:id", deleteCampeonato);
campeonatosRouter.get("/duration/:id", getDurationCampeonato);

export default campeonatosRouter;   