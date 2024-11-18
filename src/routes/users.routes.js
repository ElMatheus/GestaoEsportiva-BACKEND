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

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUserById);
usersRouter.get("/nome/:nome", getUserByName);
usersRouter.post("/", createUser);

usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);
usersRouter.post("/login", loginUser);
usersRouter.post("/refresh", refresh);
usersRouter.delete("/logout/:logout", logout);

export default usersRouter;
