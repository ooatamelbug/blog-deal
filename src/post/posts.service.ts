import { Response, ReturnValue } from "./../shared/response";
import { PostInputDTO } from "./dto/posts.dto";
import Post, { IPostModel } from "./model/posts";
import { Model } from "mongoose";

class PostsService {
  private readonly postModel: Model<IPostModel>;
  constructor(InjectModel: Model<IPostModel>) {
    this.postModel = InjectModel;
  }

  public async createPost(inputDTO: PostInputDTO): Promise<ReturnValue> {
    let statusCode: number = 200;
    let response: Response = {};
    try {
      const newPost = await this.postModel.create({
        title: inputDTO.title,
        body: inputDTO.body,
        createdby: inputDTO.createdby,
        status: "PENDING",
      });
      const post = await newPost.save();
      statusCode = 201;
      response.data = [post];
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }
}

export default PostsService;
