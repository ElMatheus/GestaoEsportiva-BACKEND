import { Router } from "express";

import {
    gerarTodosConfrontos
} from "../controllers/gerar.controller.js";

const gerarRouter = Router();

gerarRouter.get("/", gerarTodosConfrontos);

export default gerarRouter;