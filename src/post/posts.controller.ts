import { CustomRequest } from './../shared/request';
import { PostInputDTO, ShowedPostParamDTO, StatusPostDTO } from "./dto/posts.dto";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import PostsService from "./posts.service";

class PostsController {
  private postsService: PostsService;
  constructor(injectService: PostsService) {
    this.postsService = injectService;
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
  
  public async getPosts(req: CustomRequest, res: Response, next: NextFunction) {
    // validation error
    let param = new ShowedPostParamDTO();
    param.pagenate = Number(req.query?.page);
    param.order = <string>req.query?.order;
    param.limit = Number(req.query?.limit);
    param.role = req.role;
    const errors = await validate(param);
    if (errors.length) {
      return res.status(400).json({
        message: "error in validation",
        errors: errors,
      });
    } else {
      const result = await this.postsService.getPosts(param);
      return res.status(result?.statusCode as number).json(result.response);
    }
  }

  public async changePostsStatus(req: CustomRequest, res: Response, next: NextFunction) {
    // validation error
    let status = new StatusPostDTO();
    status.id = (req.params?.id);
    status.status = <string>req.body?.status;
    const errors = await validate(status);
    if (errors.length) {
      return res.status(400).json({
        message: "error in validation",
        errors: errors,
      });
    } else {
      const result = await this.postsService.changePostsStatus(status);
      return res.status(result?.statusCode as number).json(result.response);
    }
  }
}

export default PostsController;
