import { Router } from "express";
import { Auth } from "../middleware/auth";
import CommentController from "./comments.controller";

class CommentsRoutes {
  private readonly commentsController: CommentController;
  public router: Router;
  constructor(injectController: CommentController) {
    this.commentsController = injectController;
    this.router = Router();
  }

  getRouter() {
    // comments router
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
     *    Comment:
     *      type: object
     *      properties: 
     *        _id: string
     *        body: string
     *        createdby: string
     *      example:
     *        _id: 6369108fc9d5bd7ddcb9c834
     *        body: comment for post
     *        createdby: 6369108fc9d5bd7dd4b9c832
     */
    // router
    /**
     * @swagger
     * tags:
     *  name: Comment
     *  description: operation of Comment
     */
    /**
     * @swagger
     * /comments:
     *  post:
     *    tags: [Comment]
     *    summary: api for create Comment
     *    security:
     *      BearerAuth: []
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            body: string
     *          example:
     *            body: Comment body
     *    responses:
     *      '201':
     *        description: success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Comment'
     *      '401':
     *        description: not authorize
     *      '400':
     *        description: validation
     *        
     */
    
    this.router.post("/", Auth, (req, res, next) =>
      this.commentsController.createComment(req, res, next)
    );
    return this.router;
  }
}

export default CommentsRoutes;
