import { CustomRequest } from "./../shared/request";
import { IsAdmin } from "./../middleware/admin";
import { Response, Router, NextFunction } from "express";
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

    this.router.patch(
      "/:id",
      [Auth, IsAdmin],
      (req: CustomRequest, res: Response, next: NextFunction) =>
        this.postsController.changePostsStatus(req, res, next)
    );

    return this.router;
  }
}

export default PostsRoutes;
