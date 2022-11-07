import { AuthDTO } from "./dto/auth.dto";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import UsersService from "./users.service";

class UsersController {
  private usersService: UsersService;
  constructor(injectUsersService: UsersService) {
    this.usersService = injectUsersService;
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    // validation error
    let newlogindto = new AuthDTO();
    newlogindto.username = req.body.username;
    newlogindto.password = req.body.password;
    const errors = await validate(newlogindto);
    if (errors.length) {
      return res.status(400).json({
        message: "error in validation",
        errors: errors,
      });
    } else {
      const result = await this.usersService.loginUser(req.body);
      return res.status(result?.statusCode as number).json(result.response);
    }
  }
}

export default UsersController;
