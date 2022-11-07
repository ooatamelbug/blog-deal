import { Router } from "express";
import { Auth } from "../middleware/auth";
import PostsController from "./posts.controller";

class PostsRoutes {
  private readonly postsController: PostsController;
  public router: Router;
  constructor(injectUsersController: PostsController) {
    this.postsController = injectUsersController;
    this.router = Router();
  }

  getRouter() {
    // login router
    this.router.post("/", Auth, (req, res, next) =>
      this.postsController.createPost(req, res, next)
    );
    return this.router;
  }
}

export default PostsRoutes;
