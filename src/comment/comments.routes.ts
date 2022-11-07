import { Router } from "express";
import { Auth } from "../middleware/auth";
import CommentController from "./comments.controller";

class CommentsRoutes {
  private readonly commentsController: CommentController;
  public router: Router;
  constructor(injectController: CommentController) {
    this.commentsController = injectController;
    this.router = Router();
  }

  getRouter() {
    // comments router
    this.router.post("/", Auth, (req, res, next) =>
      this.commentsController.createComment(req, res, next)
    );
    return this.router;
  }
}

export default CommentsRoutes;
