import { Router } from "express";
import { Auth } from "../middleware/auth";
import InteractionController from "./interaction.controller";

class InteractionsRoutes {
  private readonly interactionsController: InteractionController;
  public router: Router;
  constructor(injectController: InteractionController) {
    this.interactionsController = injectController;
    this.router = Router();
  }

  getRouter() {
    // Interaction router
    /**
     * @swagger
     * components:
     *  securitySchemes:
     *    BearerAuth:
     *      type: http
     *      scheme: bearer
     *      bearerFormat: JWT
     *
     *  schemas:
     *    Interaction:
     *      type: object
     *      properties: 
     *        _id: string
     *        type: string
     *        post: string
     *        comment: string
     *        createdby: string
     *      example:
     *        _id: 6369108fc9d5bd7ddcb9c832
     *        type: ANGRY
     *        post: 6369108fc9d5bd7ddcb9c836
     *        comment: null
     *        createdby: 6369108fc9d5bd7dd4b9c832
     */
    
    /**
     * @swagger
     * tags:
     *  name: Interaction
     *  description: operation of Interaction
     */
    
    /**
     * @swagger
     * /interactions:
     *  post:
     *    tags: [Interaction]
     *    summary: api for create Interaction
     *    security:
     *      BearerAuth: []
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: string
     *          example:
     *            type: LIKE
     *    responses:
     *      '201':
     *        description: success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Interaction'
     *      '401':
     *        description: not authorize
     *      '400':
     *        description: validation
     *        
     */
    
    this.router.post("/", Auth, (req, res, next) =>
      this.interactionsController.createInteraction(req, res, next)
    );
    return this.router;
  }
}

export default InteractionsRoutes;
