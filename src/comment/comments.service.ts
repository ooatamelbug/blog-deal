import { IPostModel } from "./../post/model/posts";
import { Response, ReturnValue } from "./../shared/response";
import { CommentInputDTO } from "./dto/comments";
import Comment, { ICommentModel } from "./model/comments";
import { Model } from "mongoose";

class CommentsService {
  private readonly commentModel: Model<ICommentModel>;
  private readonly postModel: Model<IPostModel>;
  constructor(
    InjectModel: Model<ICommentModel>,
    InjectPostModel: Model<IPostModel>
  ) {
    this.commentModel = InjectModel;
    this.postModel = InjectPostModel;
  }

  public async createComment(inputDTO: CommentInputDTO): Promise<ReturnValue> {
    let statusCode: number = 200;
    let response: Response = {};
    try {
      // console.log(inputDTO);
      const post = await this.postModel.findOne({ _id: inputDTO.post, status: "APPROVED" });
      if (!post) {
        statusCode = 404;
        response.message = " error in get post";
        response.errors = ["not found post"];
      } else {
        const newComment = await this.commentModel.create({
          post: inputDTO.post,
          body: inputDTO.body,
          createdby: inputDTO.createdby,
        });
        const comment = await newComment.save();
        statusCode = 201;
        response.data = [comment];
      }
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }

  public async getCommentsStatic(): Promise<ReturnValue> {
    let statusCode: number = 200;
    let response: Response = {};
    try {
      const comentCount = await this.commentModel.aggregate([
        {
          $group: {
            _id: "null",
            count: {
              $sum: 1,
            },
          },
        },
      ]);
      response.data = comentCount;
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }
}

export default CommentsService;
