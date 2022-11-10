import { Router } from "express";
import UsersController from "./users.controller";

class UsersRoutes {
  private readonly usersController: UsersController;
  public router: Router;
  constructor(injectUsersController: UsersController) {
    this.usersController = injectUsersController;
    this.router = Router();
  }

  getRouter() {
    // login router
    /**
     * @swagger
     * /users/login:
     *  post:
     *    summary: retrun token
     */
    this.router.post("/login", (req, res, next) =>
      this.usersController.login(req, res, next)
    );
    return this.router;
  }
}

export default UsersRoutes;
