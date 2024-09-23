import { Router } from "express";

import {
    getCampeonatos,
    getCampeonatoById,
    createCampeonato,
    updateCampeonato,
    deleteCampeonato,
    getCampeonatoByTitulo,
    getDuracaoCampeonato,
} from "../controllers/campeonato.controller.js";

const campeonatoRouter = Router();

campeonatoRouter.get("/", getCampeonatos);
campeonatoRouter.get("/:id", getCampeonatoById);
campeonatoRouter.post("/", createCampeonato);
campeonatoRouter.put("/:id", updateCampeonato);
campeonatoRouter.delete("/:id", deleteCampeonato);
campeonatoRouter.get("/titulo/:titulo", getCampeonatoByTitulo);
campeonatoRouter.get("/duracao/:id", getDuracaoCampeonato);

export default campeonatoRouter;
