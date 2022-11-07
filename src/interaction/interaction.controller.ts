import { CustomRequest } from './../shared/request';
import { InteractionInputDTO } from "./dto/interaction";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import InteractionService from "./interaction.service";

class InteractionController {
  private interactionService: InteractionService;
  constructor(injectService: InteractionService) {
    this.interactionService = injectService;
  }

  public async createInteraction(req: CustomRequest, res: Response, next: NextFunction) {
    // validation error
    let newInteractiondto = new InteractionInputDTO();
    newInteractiondto.post = req.body.post;
    newInteractiondto.comment = req.body.comment;
    newInteractiondto.type = req.body.type;
    newInteractiondto.createdby = req.user;
    const errors = await validate(newInteractiondto);
    if (errors.length) {
      return res.status(400).json({
        message: "error in validation",
        errors: errors,
      });
    } else {
      const result = await this.interactionService.createInteraction(newInteractiondto);
      return res.status(result?.statusCode as number).json(result.response);
    }
  }
}

export default InteractionController;
