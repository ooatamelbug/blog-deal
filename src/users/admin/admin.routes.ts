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
    // statistics router
    /**
     * @swagger
     * tags:
     *  name: Admin
     *  description: operation for admin
     */
    /**
     * @swagger
     * /admin/statistics:
     *  get:
     *    tags: [Admin]
     *    summary: retrun statistics of different collections
     *    responses:
     *      '200':
     *        description: success
     *        content:
     *          application/json:
     *            schema:
     *              total_comments: integer
     *              total_interaction_posts: integer
     *              total_interaction_comments: integer
     *              total_posts: integer
     *              total_approved_post: integer
     *              total_pending_post: integer
     *              total_rejected_post: integer
     *            example:
     *              total_comments: 5
     *              total_interaction_posts: 2
     *              total_interaction_comments: 3
     *              total_posts: 10
     *              total_approved_post: 4
     *              total_pending_post: 2
     *              total_rejected_post: 4
     *      '401':
     *        description: not authorize
     */
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
