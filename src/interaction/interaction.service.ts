import { Response, ReturnValue } from "./../shared/response";
import { InteractionInputDTO } from "./dto/interaction";
import Interaction, { IInteractionModel } from "./model/interaction";
import { Model } from "mongoose";

class InteractionService {
  private readonly interactionModel: Model<IInteractionModel>;
  constructor(InjectModel: Model<IInteractionModel>) {
    this.interactionModel = InjectModel;
  }

  public async createInteraction(inputDTO: InteractionInputDTO): Promise<ReturnValue> {
    let statusCode: number = 200;
    let response: Response = {};
    try {
      const newInteraction = await this.interactionModel.create({
        post: inputDTO.post || null,
        comment: inputDTO.comment || null,
        type: inputDTO.type,
        createdby: inputDTO.createdby,
      });
      const interaction = await newInteraction.save();
      statusCode = 201;
      response.data = [interaction];
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }
}

export default InteractionService;
