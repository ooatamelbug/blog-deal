import { Response, ReturnValue } from "./../shared/response";
import { CommentInputDTO } from "./dto/comments";
import Comment, { ICommentModel } from "./model/comments";
import { Model } from "mongoose";

class CommentsService {
  private readonly commentModel: Model<ICommentModel>;
  constructor(InjectModel: Model<ICommentModel>) {
    this.commentModel = InjectModel;
  }

  public async createComment(inputDTO: CommentInputDTO): Promise<ReturnValue> {
    let statusCode: number = 200;
    let response: Response = {};
    try {
      const newComment = await this.commentModel.create({
        post: inputDTO.post,
        body: inputDTO.body,
        createdby: inputDTO.createdby,
      });
      const comment = await newComment.save();
      statusCode = 201;
      response.data = [comment];
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }
}

export default CommentsService;
