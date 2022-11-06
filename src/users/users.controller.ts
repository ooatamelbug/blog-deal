import { Request, Response, NextFunction } from "express";
import UsersService from "./users.service";

class UsersController {
  private usersService: UsersService;
  constructor(injectUsersService: UsersService) {
    this.usersService = injectUsersService;
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const result = await this.usersService.loginUser(req.body);
    return res.status(result?.statusCode as number).json(result.response);
  }
}

export default UsersController;
