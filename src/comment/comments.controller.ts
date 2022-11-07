import { CustomRequest } from './../shared/request';
import { CommentInputDTO } from "./dto/comments";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import CommentsService from "./comments.service";

class CommentController {
  private commentsService: CommentsService;
  constructor(injectService: CommentsService) {
    this.commentsService = injectService;
  }

  public async createComment(req: CustomRequest, res: Response, next: NextFunction) {
    // validation error
    let newCommentdto = new CommentInputDTO();
    newCommentdto.post = req.body.post;
    newCommentdto.body = req.body.body;
    newCommentdto.createdby = req.user;
    const errors = await validate(newCommentdto);
    if (errors.length) {
      return res.status(400).json({
        message: "error in validation",
        errors: errors,
      });
    } else {
      const result = await this.commentsService.createComment(newCommentdto);
      return res.status(result?.statusCode as number).json(result.response);
    }
  }
}

export default CommentController;
