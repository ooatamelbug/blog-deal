import { CustomRequest } from "./../../shared/request";
import { IsAdmin } from "./../../middleware/admin";
import { Response, Router, NextFunction } from "express";
import { Auth } from "../../middleware/auth";
import AdminController from "./admin.controller";

class AdminRoutes {
  private readonly adminController: AdminController;
  public router: Router;
  constructor(injectController: AdminController) {
    this.adminController = injectController;
    this.router = Router();
  }

  getRouter() {
    // login router
    this.router.get(
      "/statistics",
      [Auth, IsAdmin],
      (req: CustomRequest, res: Response, next: NextFunction) =>
        this.adminController.statistics(req, res, next)
    );
    return this.router;
  }
}

export default AdminRoutes;
