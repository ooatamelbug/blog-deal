import { Application } from "express";
import UsersRoutes from "../users/users.routes";
import UsersController from "../users/users.controller";
import UsersService from "../users/users.service";

import PostsRoutes from "../post/posts.routes";
import PostsController from "../post/posts.controller";
import PostsService from "../post/posts.service";

import CommentsRoutes from "../comment/comments.routes";
import CommentsController from "../comment/comments.controller";
import CommentsService from "../comment/comments.service";

import User from "../users/model/user";
import Post from "../post/model/posts";
import Comment from "../comment/model/comments";

export const appRouter = (app: Application) => {
  // user router
  const serciceUser = new UsersService(User);
  const controllerUser = new UsersController(serciceUser);
  const routesUser = new UsersRoutes(controllerUser);
  app.use("/users", routesUser.getRouter());

  // post router
  const sercicePost = new PostsService(Post);
  const controllerPost = new PostsController(sercicePost);
  const routesPost = new PostsRoutes(controllerPost);
  app.use("/posts", routesPost.getRouter());
  

  // post router
  const serciceComment = new CommentsService(Comment);
  const controllerComment = new CommentsController(serciceComment);
  const routesComment = new CommentsRoutes(controllerComment);
  app.use("/comments", routesComment.getRouter());
};
