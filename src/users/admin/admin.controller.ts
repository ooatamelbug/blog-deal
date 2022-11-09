import { AuthDTO } from "../dto/auth.dto";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import UsersService from "../user/users.service";
import AdminService from "./admin.service";


class AdminController {
  private usersService: UsersService;
  private adminService: AdminService;
  constructor(injectUsersService: UsersService, injectAdminService: AdminService) {
    this.usersService = injectUsersService;
    this.adminService = injectAdminService;
  }

  public async statistics(req: Request, res: Response, next: NextFunction) {
      const result = await this.adminService.statistics();
      return res.status(result?.statusCode as number).json(result.response);
  }
}

export default AdminController;
