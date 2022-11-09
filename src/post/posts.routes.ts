import { Router } from "express";
import { Auth } from "../middleware/auth";
import PostsController from "./posts.controller";

class PostsRoutes {
  private readonly postsController: PostsController;
  public router: Router;
  constructor(injectController: PostsController) {
    this.postsController = injectController;
    this.router = Router();
  }

  getRouter() {
    // login router
    this.router.post("/", Auth, (req, res, next) =>
      this.postsController.createPost(req, res, next)
    );

    this.router.get("/", Auth, (req, res, next) =>
      this.postsController.getPosts(req, res, next)
    );

    return this.router;
  }
}

export default PostsRoutes;
