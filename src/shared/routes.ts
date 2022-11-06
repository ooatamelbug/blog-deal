import { Application } from "express";
import UsersRoutes from "../users/users.routes";
import UsersController from "../users/users.controller";
import UsersService from "../users/users.service";
import User from "../users/model/user";

export const appRouter = (app: Application) => {
  // user router
  const sercice = new UsersService(User);
  const controller = new UsersController(sercice);
  const routes = new UsersRoutes(controller);
  app.use("/users", routes.getRouter());
};
