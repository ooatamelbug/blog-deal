import { CustomRequest } from "./../shared/request";
import { IsAdmin } from "./../middleware/admin";
import { Response, Router, NextFunction } from "express";
import { Auth } from "../middleware/auth";
import PostsController from "./posts.controller";

class PostsRoutes {
  private readonly postsController: PostsController;
  public router: Router;
  constructor(injectController: PostsController) {
    this.postsController = injectController;
    this.router = Router();
  }

  getRouter() {
    // post router
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
     *    GetPost:
     *      type: object
     *      properties: 
     *        data: array
     *        total: integer
     *        page: integer
     *        limit: integer
     *        totalPages: integer
     *        hasNextPage: boolean
     *        hasPrevPage: boolean
     *      example:
     *        data: [{ _id: 'jhs7uju....', title: 'post', body: 'post body' }]
     *        total: 10
     *        page: 1
     *        limit: 10
     *        hasNextPage: true
     *        hasPrevPage: false
     *        totalPages: 100
     * 
     *    Post:
     *      type: object
     *      properties:
     *        title: string
     *        _id: string
     *        body: string
     *        createdby: string
     *        createdAt: string
     *        updatedAt: string
     *      required:
     *        - title
     *        - body
     *      example:
     *        title:  post in this blog
     *        body:  this is body of post
     *        createdby: 6369108fc9d5bd7ddcb9c832
     *        createdAt: 2022-11-09T09:38:31.598+00:00
     *        updatedAt: 2022-11-09T09:38:31.598+00:00
     *        _id: 6369108fc9d5bd7ddcb9c830
     */

    /**
     * @swagger
     * tags:
     *  name: Post
     *  description: operation for posts
     */

    /**
     * @swagger
     * /posts:
     *  post:
     *    tags: [Post]
     *    summary: api for create new post
     *    security:
     *      BearerAuth: []
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            title: string
     *            body: string
     *          example:
     *            title: post in this blog
     *            body: this is body of post
     *    responses:
     *      '201':
     *        description: success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Post'
     *      '401':
     *        description: not authorize
     *      '400':
     *        description: validation
     *
     */

    this.router.post("/", Auth, (req, res, next) =>
      this.postsController.createPost(req, res, next)
    );

    /**
     * @swagger
     * /posts:
     *  get:
     *    tags: [Post]
     *    summary: list all posts
     *    security:
     *      BearerAuth: []
     *    responses:
     *      '200':
     *        description: success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/GetPost'
     *      '401':
     *        description: not authorize
     *
     */

    this.router.get("/", Auth, (req, res, next) =>
      this.postsController.getPosts(req, res, next)
    );

    // status router
    /**
     * @swagger
     * /posts/:id:
     *  patch:
     *    tags: [Post]
     *    summary: change status of post
     *    parameters:
     *      id: string
     *    security:
     *      BearerAuth: []
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            status: string
     *          example:
     *            status: REJECTED
     *    responses:
     *      '200':
     *        description: success
     *        content:
     *          application/json:
     *            schema:
     *              data: object
     *              properties:
     *                updated: boolean
     *            example:
     *              data: { updated: true }
     *      '401':
     *         description: not authorize
     *      '400':
     *        description: validation
     *
     */

    this.router.patch(
      "/:id",
      [Auth, IsAdmin],
      (req: CustomRequest, res: Response, next: NextFunction) =>
        this.postsController.changePostsStatus(req, res, next)
    );

    return this.router;
  }
}

export default PostsRoutes;
