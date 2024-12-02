import { Router } from "express";

import {
    gerarTodosConfrontos
} from "../controllers/gerar.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const gerarRouter = Router();

gerarRouter.post("/", ensureAuthenticated('admin'), gerarTodosConfrontos);

export default gerarRouter;