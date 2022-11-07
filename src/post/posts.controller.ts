import { CustomRequest } from './../shared/request';
import { PostInputDTO } from "./dto/posts.dto";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import PostsService from "./posts.service";
import { JwtPayload } from "jsonwebtoken";

class PostsController {
  private postsService: PostsService;
  constructor(injectUsersService: PostsService) {
    this.postsService = injectUsersService;
  }

  public async createPost(req: CustomRequest, res: Response, next: NextFunction) {
    // validation error
    let newpostdto = new PostInputDTO();
    newpostdto.title = req.body.title;
    newpostdto.body = req.body.body;
    newpostdto.createdby = req.user;
    const errors = await validate(newpostdto);
    if (errors.length) {
      return res.status(400).json({
        message: "error in validation",
        errors: errors,
      });
    } else {
      const result = await this.postsService.createPost(newpostdto);
      return res.status(result?.statusCode as number).json(result.response);
    }
  }
}

export default PostsController;
