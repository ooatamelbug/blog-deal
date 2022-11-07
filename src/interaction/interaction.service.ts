import { IPostModel } from "./../post/model/posts";
import { ICommentModel } from "./../comment/model/comments";
import { Response, ReturnValue } from "./../shared/response";
import { InteractionInputDTO } from "./dto/interaction";
import Interaction, { IInteractionModel } from "./model/interaction";
import { Model } from "mongoose";

class InteractionService {
  private readonly interactionModel: Model<IInteractionModel>;
  private readonly commentModel: Model<ICommentModel>;
  private readonly postModel: Model<IPostModel>;

  constructor(
    InjectModel: Model<IInteractionModel>,
    InjectCModel: Model<ICommentModel>,
    InjectPModel: Model<IPostModel>
  ) {
    this.interactionModel = InjectModel;
    this.commentModel = InjectCModel;
    this.postModel = InjectPModel;
  }

  public async createInteraction(
    inputDTO: InteractionInputDTO
  ): Promise<ReturnValue> {
    let statusCode: number = 200;
    let response: Response = {};
    try {
      if (inputDTO.post) {
        const post = await this.postModel.findOne({ _id: inputDTO.post });
        if (!post) {
          statusCode = 404;
          response.message = " error in get post";
          response.errors = ["not found post"];
        } else {
          const newInteraction = await this.interactionModel.create({
            post: inputDTO.post || null,
            comment: inputDTO.comment || null,
            type: inputDTO.type,
            createdby: inputDTO.createdby,
          });
          const interaction = await newInteraction.save();
          statusCode = 201;
          response.data = [interaction];
        }
      } else {
        const comment = await this.commentModel.findOne({ _id: inputDTO.comment });
        if (!comment) {
          statusCode = 404;
          response.message = " error in get comment";
          response.errors = ["not found comment"];
        } else {
          const newInteraction = await this.interactionModel.create({
            post: inputDTO.post || null,
            comment: inputDTO.comment || null,
            type: inputDTO.type,
            createdby: inputDTO.createdby,
          });
          const interaction = await newInteraction.save();
          statusCode = 201;
          response.data = [interaction];
        }
      }
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }
}

export default InteractionService;
