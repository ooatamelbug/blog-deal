import { Router } from "express";
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
    this.router.get("/statistics", (req, res, next) =>
      this.adminController.statistics(req, res, next)
    );
    return this.router;
  }
}

export default AdminRoutes;
