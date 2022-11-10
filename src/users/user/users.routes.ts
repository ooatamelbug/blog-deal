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
     * tags:
     *  name: userlogin
     *  description: operation of user
     */
    /**
     * @swagger
     * /users/login:
     *  post:
     *    tags: [userlogin]
     *    summary: retrun token
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            username: string
     *            password: string
     *          example:
     *            username: example@example.com
     *            password: example123
     *    responses:
     *      '200':
     *        description: success
     *        content:
     *          application/json:
     *            schema:
     *              token: string
     *            example:
     *              token: eynajsndmasknd88UBN987aHUH98HAUh98UH8h......... 
     *      '201':
     *        description: success
     *        content:
     *          application/json:
     *            schema:
     *              token: string
     *            example:
     *              token: eynajsndmasknd88UBN987aHUH98HAUh98UH8h.........
     *      '400':
     *        description: validation
     *        
     */
    this.router.post("/login", (req, res, next) =>
      this.usersController.login(req, res, next)
    );
    return this.router;
  }
}

export default UsersRoutes;
