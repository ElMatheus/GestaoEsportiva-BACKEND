import { Router } from "express";


import {
  getUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  refresh,
  logout,
} from "../controllers/users.controller.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const usersRouter = Router();

usersRouter.get("/", ensureAuthenticated, getUsers);
usersRouter.get("/:id", ensureAuthenticated, getUserById);
usersRouter.get("/nome/:nome", getUserByName);
usersRouter.post("/", createUser);

usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);
usersRouter.post("/login", loginUser);
usersRouter.post("/refresh", refresh);
usersRouter.post("/logout", logout);

export default usersRouter;
