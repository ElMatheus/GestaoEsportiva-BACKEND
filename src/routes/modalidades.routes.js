import { Router } from "express";

import {
    getModalidades,
    getModalidadeById,
    createModalidade,
    updateModalidade,
    deleteModalidade
} from "../controllers/modalidades.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const modalidadesRouter = Router();

modalidadesRouter.get("/", getModalidades);
modalidadesRouter.get("/:id", getModalidadeById);
modalidadesRouter.get("/nome/:nome", getModalidadeByNome);
modalidadesRouter.get("/campeonato/:campeonato_id", getModalidadeByCampeonatoId);
modalidadesRouter.get("/duration/tipo/:tipo", getDurationModalidadeByTipo); 
modalidadesRouter.post("/", ensureAuthenticated, createModalidade);
modalidadesRouter.put("/:id", ensureAuthenticated, updateModalidade);
modalidadesRouter.delete("/:id", ensureAuthenticated, deleteModalidade);


export default modalidadesRouter;
